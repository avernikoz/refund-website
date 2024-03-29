import { TransactionArgument, TransactionBlock } from "@mysten/sui.js/transactions";
import { GenericArg, ObjectArg } from "./types";

export function isTransactionArgument(arg: GenericArg): arg is TransactionArgument {
  if (!arg || typeof arg !== "object" || Array.isArray(arg)) {
    return false;
  }

  return "kind" in arg;
}

export function obj(tx: TransactionBlock, arg: ObjectArg) {
  return isTransactionArgument(arg) ? arg : tx.object(arg);
}

export const SUI_DECIMALS = 9;

export const SUI_DENOMINATOR = 10 ** SUI_DECIMALS;