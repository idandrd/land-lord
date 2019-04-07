import { last } from "lodash";
import { Contract, BaseTask, CheckBundle } from "../types";

export function generateTasks(contract: Contract): BaseTask[] {
  return [
    ...generateDepositCheckTasks(contract),
    ...generateOutOfChecksTasks(contract)
  ];
}

function generateDepositCheckTasks(contract: Contract): BaseTask[] {
  const tasks = contract.checkBundles.map(checkBundle =>
    parseCheckBundle(checkBundle, contract.id)
  );
  return [].concat(...tasks);
}

function generateOutOfChecksTasks(contract: Contract): BaseTask[] {
  if (contract.checkBundles.length === 0) {
    return [];
  }
  const lastBundle = last(contract.checkBundles);
  const endDate = new Date(lastBundle.dateOfFirstCheck);
  const monthsToAdd =
    lastBundle.amountOfChecks * lastBundle.checkForHowManyMonths - 1;
  endDate.setMonth(endDate.getMonth() + monthsToAdd);
  const task: BaseTask = {
    contractId: contract.id,
    deadline: dateToString(endDate),
    taskType: "outOfChecks",
    status: "active"
  };
  return [task];
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
