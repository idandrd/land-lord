import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";

admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
export const addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  await sendEmail(original);
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const snapshot = await admin
    .database()
    .ref("/messages")
    .push({ original });
  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.redirect(303, snapshot.ref.toString());
});

export const dailyMail = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async context => {
    const date = new Date();
    const weekDay = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ][date.getDay()];
    await sendEmail(weekDay);
  });

async function sendEmail(title: string) {
  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  const sendGridApiKey = functions.config().sendgrid.key;
  sgMail.setApiKey(sendGridApiKey);
  const tasks = await getTasks();
  const msg = {
    to: "idandrd@gmail.com",
    from: "LandLord@landlord.com",
    subject: `${title} LandLord Daily Tasks`,
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>You have some tasks you need to do today!</strong>${getTasksHtml(
      tasks
    )}`
  };
  await sgMail.send(msg);
}

async function getTasks(): Promise<BaseTask[]> {
  const allTasks: BaseTask[] = [];
  const snapshot = await admin
    .firestore()
    .collection("dev")
    .doc("root")
    .collection("cases")
    .doc("amir123")
    .collection("tasks")
    .get();
  snapshot.forEach(doc => allTasks.push(doc.data() as BaseTask));
  const filteredTasks = allTasks.filter(
    task => isToday(new Date(task.deadline)) && task.status === "active"
  );
  return filteredTasks;
}

function getTasksHtml(tasks: BaseTask[]): string {
  const htmlTasks = tasks.map(task => {
    const title = `<h2>${getTaskTitle(task)}</h2>`;
    const deadline = `<p><strong>Date: </strong>${task.deadline}</p>`;
    return title + deadline;
  });
  return `<div>${htmlTasks.join("")}</div>`;
}

function isToday(someDate: Date) {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
}

function getTaskTitle(task: BaseTask): string {
  switch (task.taskType) {
    case "depositCheck":
      return "להפקיד צ'ק";
    case "outOfChecks":
      return "הצ'קים עומדים להיגמר! צריך לבקש חדשים";
    case "endOfContract":
      return "החוזה יסתיים בעוד 3 חודשים";
  }
}

interface BaseTask {
  contractId: string;
  taskType: "depositCheck" | "outOfChecks" | "endOfContract";
  deadline: string;
  status: "active" | "done" | "snoozed" | "deleted";
}
