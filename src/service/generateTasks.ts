import { BaseContract, Task, CheckBundle } from "../types";

export function generateTasks(contract: BaseContract): Task[] {
  const depositCheckTasks = generateDepositCheckTasks(contract);
  return [...depositCheckTasks];
}

function generateDepositCheckTasks(contract: BaseContract): Task[] {
  const tasks = contract.checkBundles.map(checkBundle =>
    parseCheckBundle(checkBundle, "contract.id")
  );
  return [].concat(...tasks);
}

function parseCheckBundle(
  checkBundle: CheckBundle,
  contractId: string
): Task[] {
  const tasks: Task[] = [];
  for (
    let i = 0;
    i < checkBundle.amountOfChecks;
    i += checkBundle.checkForHowManyMonths
  ) {
    const deadLineDate = new Date(checkBundle.dateOfFirstCheck);
    deadLineDate.setMonth(deadLineDate.getMonth() + i);
    const deadline = dateToString(deadLineDate);
    const task: Task = {
      contractId,
      deadline,
      taskType: "depositCheck",
      status: "active"
    };
    tasks.push(task);
  }
  return tasks;
}

const dateToString = (date: Date) => date.toISOString().split("T")[0];
