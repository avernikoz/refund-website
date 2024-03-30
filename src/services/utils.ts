import { TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";
import { BoostedClaimCapType, GenericArg, ObjectArg } from "./types";
import { GetOwnedObjectsParams, PaginatedObjectsResponse, SuiClient, SuiObjectResponse } from "@mysten/sui.js/client";

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

export const truncateAddress = (address: string | null | undefined): string | null => {
  return truncateText(address, { nCharsStart: 5, nCharsEnd: 4 });
};

type TruncateTextOptions = { nCharsStart: number; nCharsEnd: number };
export const truncateText = (
  text: string | null | undefined,
  options: TruncateTextOptions,
): string | null => {
  if (!text) {
    return null;
  }
  const start = text.substring(0, options.nCharsStart);
  const end = text.substring(text.length - options.nCharsEnd);
  const shortText = `${start}…${end}`;
  if (shortText.length < text.length) {
    return shortText;
  } else {
    return text;
  }
};


export function isBoostedClaimCap(obj: unknown): obj is BoostedClaimCapType {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  if (!("data" in obj) || !obj.data || typeof obj.data !== "object") {
    return false;
  }

  const objectData = obj.data;

  if (!("objectId" in objectData) || typeof objectData.objectId !== "string") {
    return false;
  }

  if (!("content" in objectData) || objectData.content === null || typeof objectData.content !== "object") {
    return false;
  }

  const content = objectData.content;

  return (
    "dataType" in content &&
    "type" in content &&
    "fields" in content &&
    typeof content.fields === "object" &&
    content.fields !== null &&
    "id" in content.fields &&
    typeof content.dataType === "string" &&
    typeof content.type === "string" &&
    typeof content.fields.id === "object" &&
    content.fields.id !== null &&
    "id" in content.fields.id &&
    typeof content.fields.id.id === "string" &&
    "new_address" in content.fields &&
    typeof content.fields.new_address === "string"
  );
}


export async function getAllOwnedObjects({
  provider,
  options,
}: {
  provider: SuiClient;
  options: GetOwnedObjectsParams;
}) {
  const allOwnedObjects: SuiObjectResponse[] = [];
  let nextCursor: string | undefined | null = null;
  let objects: PaginatedObjectsResponse = await provider.getOwnedObjects(options);

  // Fetching and combining part
  while (objects.hasNextPage) {
    const userObjects: SuiObjectResponse[] = objects.data;
    allOwnedObjects.push(...userObjects);

    nextCursor = objects.nextCursor;
    objects = await provider.getOwnedObjects({
      ...options,
      cursor: nextCursor,
    });
  }

  const userObjects: SuiObjectResponse[] = objects.data;
  allOwnedObjects.push(...userObjects);

  return allOwnedObjects;
}
