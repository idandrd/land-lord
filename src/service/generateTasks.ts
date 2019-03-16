import { Contract, BaseTask, CheckBundle } from "../types";

export function generateTasks(contract: Contract): BaseTask[] {
  const depositCheckTasks = generateDepositCheckTasks(contract);
  return [...depositCheckTasks];
}

function generateDepositCheckTasks(contract: Contract): BaseTask[] {
  const tasks = contract.checkBundles.map(checkBundle =>
    parseCheckBundle(checkBundle, contract.id)
  );
  return [].concat(...tasks);
}

function parseCheckBundle(
  checkBundle: CheckBundle,
  contractId: string
): BaseTask[] {
  const tasks: BaseTask[] = [];
  for (
    let i = 0;
    i < checkBundle.amountOfChecks;
    i += checkBundle.checkForHowManyMonths
  ) {
    const deadLineDate = new Date(checkBundle.dateOfFirstCheck);
    deadLineDate.setMonth(deadLineDate.getMonth() + i);
    const deadline = dateToString(deadLineDate);
    const task: BaseTask = {
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
