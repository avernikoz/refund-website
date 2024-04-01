import { ObjectArg as SuiObjectArg } from "@mysten/sui.js/bcs";
import { TransactionArgument, TransactionBlock } from "@mysten/sui.js/transactions";

export type ObjectId = string;

export type ObjectCallArg = { Object: SuiObjectArg };

export type ObjectArg = string | ObjectCallArg | TransactionArgument;

export type PureArg = bigint | string | number | boolean | null | TransactionArgument | Array<PureArg>;
export type GenericArg = ObjectArg | PureArg | Array<ObjectArg> | Array<PureArg> | Array<GenericArg>;

export type TransactionResult = ReturnType<TransactionBlock["moveCall"]>;
export type GetTransactionType = Promise<{ tx: TransactionBlock; txRes: TransactionResult }>;

export type BoostedClaimCapType = {
  data: {
    objectId: string;
    content: {
      dataType: string;
      type: string;
      hasPublicTransfer: boolean;
      fields: {
        id: { id: string };
        new_address: string;
      };
    };
  };
};