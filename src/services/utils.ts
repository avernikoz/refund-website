import { TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";
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

const isTransactionResult = (value: unknown): value is TransactionResult => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'digest' in value &&
    typeof value.digest === 'string' &&
    'effects' in value &&
    typeof value.effects === 'object' &&
    value.effects !== null &&
    'status' in value.effects &&
    typeof value.effects.status === 'object' &&
    value.effects.status !== null &&
    'status' in value.effects.status &&
    typeof value.effects.status.status === 'string'
  );
};

type TransactionResult = {
  effects: {
    status: {
      status: string;
    };
  };
  digest: string;
};


export const isTransactionSuccessful = (
  transactionResult: unknown,
): boolean => {
  if (isTransactionResult(transactionResult)) {
    const isSuccess = transactionResult.effects.status.status === 'success';

    if (!isSuccess) {
      console.warn(
        `Transaction ${transactionResult.digest} was not successful.`,
      );
    }

    return isSuccess;
  } else {
    console.warn('Transaction is not in a valid shape.');
    console.warn('Transaction wrong shape: ', transactionResult);

    return false;
  }
};


export function getSuiVisionTransactionLink(digest: string) {
  return `https://suivision.xyz/txblock/${digest}`;
}