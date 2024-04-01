import { TransactionBlock } from "@mysten/sui.js/transactions";
import { getAllOwnedObjects, isBoostedClaimCap, obj, SUI_DENOMINATOR } from "./utils";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { bcs } from "@mysten/sui.js/bcs";
import BigNumber from "bignumber.js";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui.js/utils";
import { BoostedClaimCapType, ObjectArg } from "./types";

export class RefundService {
    public static SIMLATION_ACCOUNT_ADDRESS = "0xca9711c3de3ef474209ebd920b894e4d374ff09e210bc31cbd2d266f7bff90ca";
    public static REFUND_PACKAGE_ADDRESS = "0xd4a00758cecbdb1e68e75d246fe79406ff5390874fa7a3e207fd2b27497d3f4e";
    public static REFUND_PACKAGE_ADDRESS_READ = "";
    public static REFUND_POOL_OBJECT_ID = "0xa6f54da63deade56868dabcc43174ce5b97f0d94bc4035162a047cd4e6340b6b";
    public static REFUND_POOL_PUBLISHER_OBJECT_ID = "0x1e7cefc3144b75823d9c7e9d048e81fe742139b95c136e4209f3f8cc2692358a";
    public static REFUND_BOOSTED_CLAIM_CAP_STRUCT_TYPE_NAME = "BoostedClaimCap";
    public static REFUND_MODULE_NAME = "refund";
    public static REFUND_BOOSTED_MODULE_NAME = "booster";
    public static BOOSTER_OBJECT_TYPE = `${RefundService.REFUND_PACKAGE_ADDRESS}::${RefundService.REFUND_BOOSTED_MODULE_NAME}::${this.REFUND_BOOSTED_CLAIM_CAP_STRUCT_TYPE_NAME}`;
    public static REFUND_GAS_BUGET = 50_000_000;
    private static _instance: RefundService;

    private constructor() {}

    provider = new SuiClient({
        url: getFullnodeUrl('mainnet')
    });

    static getInstance() {
        if(!this._instance) {
            this._instance = new RefundService();
        }
        return this._instance;
    }

    public claimRefundTransaction(tx: TransactionBlock, {
        poolObjectId,
        clock = SUI_CLOCK_OBJECT_ID
    }: {
        poolObjectId: ObjectArg;
        clock?: ObjectArg;
    }) { 
        tx.moveCall({
            target: `${RefundService.REFUND_PACKAGE_ADDRESS}::refund::claim_refund`,
            arguments: [obj(tx, poolObjectId), obj(tx, clock)],
            typeArguments: []
        });
    }

    public async getClaimAmountBoosted({
        poolObjectId,
        affectedAddress,
    }: {
        poolObjectId: string;
        affectedAddress: string;
    }) {
        const tx = new TransactionBlock();
        tx.moveCall({
            target: `${RefundService.REFUND_PACKAGE_ADDRESS}::refund::amount_to_claim_boosted`,
            typeArguments: [],
            arguments: [obj(tx, poolObjectId), tx.pure(affectedAddress)],
        });

        tx.setGasBudget(RefundService.REFUND_GAS_BUGET);

        const res = await this.provider.devInspectTransactionBlock({
            sender: RefundService.SIMLATION_ACCOUNT_ADDRESS,
            transactionBlock: tx,
        });

        if (!res.results) {
            throw new Error("No results found for the request phase request");
        }

        const returnValues = res.results[0].returnValues;

        if (!returnValues) {
            throw new Error("Return values are undefined");
        }

        const rawAmountBytes = returnValues[0][0];
        const decoded = bcs.de("Option<u64>", new Uint8Array(rawAmountBytes));
        let amount: string;

        if ("Some" in decoded && decoded.Some) {
            amount = decoded.Some;
        } else if ("None" in decoded && decoded.None === true) {
            amount = "0"; // Use "0" if decoded.None is true
        } else {
            throw new Error("Decoded amount has an invalid shape");
        }

        const amountInMist = amount.toString();
        const amountInSui = new BigNumber(amount).div(SUI_DENOMINATOR).toString();

        return { mist: amountInMist, sui: amountInSui };
    }

    public async getClaimAmountNormal({
        poolObjectId,
        affectedAddress,
    }: {
        poolObjectId: string;
        affectedAddress: string;
    }) {
        const tx = new TransactionBlock();

        tx.moveCall({
            target: `${RefundService.REFUND_PACKAGE_ADDRESS}::refund::amount_to_claim`,
            typeArguments: [],
            arguments: [obj(tx, poolObjectId), tx.pure(affectedAddress)],
        });

        tx.setGasBudget(RefundService.REFUND_GAS_BUGET);

        const res = await this.provider.devInspectTransactionBlock({
            sender: RefundService.SIMLATION_ACCOUNT_ADDRESS,
            transactionBlock: tx,
        });

        if (!res.results) {
        throw new Error("No results found for the request phase request");
        }

        const returnValues = res.results[0].returnValues;

        if (!returnValues) {
            throw new Error("Return values are undefined");
        }

        const rawAmountBytes = returnValues[0][0];
        const decoded = bcs.de("Option<u64>", new Uint8Array(rawAmountBytes));
        let amount: string;

        if ("Some" in decoded && decoded.Some) {
            amount = decoded.Some;
        } else if ("None" in decoded && decoded.None === true) {
            amount = "0"; // Use "0" if decoded.None is true
        } else {
            throw new Error("Decoded amount has an invalid shape");
        }

        const amountInMist = amount.toString();
        const amountInSui = new BigNumber(amount).div(SUI_DENOMINATOR).toString();

        return { mist: amountInMist, sui: amountInSui };
    }

    public claimRefundBoosted(transaction: TransactionBlock, {
        boostedClaimCap,
        poolObjectId,
        clock = SUI_CLOCK_OBJECT_ID,
        userRinbotRefundDestinationAddress,
    }: {
        boostedClaimCap: ObjectArg;
        poolObjectId: ObjectArg;
        clock?: ObjectArg;
        userRinbotRefundDestinationAddress: ObjectArg;
    }) {
        const tx = transaction ?? new TransactionBlock();
        const txRes = tx.moveCall({
        target: `${RefundService.REFUND_PACKAGE_ADDRESS}::booster::claim_refund_boosted`,
        typeArguments: [],
        arguments: [
            obj(tx, boostedClaimCap),
            obj(tx, poolObjectId),
            tx.pure(userRinbotRefundDestinationAddress),
            obj(tx, clock),
        ],
        });

        tx.setGasBudget(RefundService.REFUND_GAS_BUGET);

        return { tx, txRes };
    }

    public getReturnBoosterCapTransaction(tx: TransactionBlock, {
        boostedClaimCap,
        poolObjectId,
    }: {
        boostedClaimCap: ObjectArg;
        poolObjectId: ObjectArg;
    }) {
        const txRes = tx.moveCall({
            target: `${RefundService.REFUND_PACKAGE_ADDRESS}::booster::return_booster_cap`,
            typeArguments: [],
            arguments: [obj(tx, boostedClaimCap), obj(tx, poolObjectId)],
        });

        tx.setGasBudget(RefundService.REFUND_GAS_BUGET);

        return { tx, txRes };
    }

    public async getBoostedClaimCap({ ownerAddress, newAddress }: { ownerAddress: string; newAddress: string }): Promise<{
        boostedClaimCapObjectId: string | null;
        isAnyBoostedClaimCapExists: boolean;
        boostedClaimCapNotAssociatedWithNewAddressObjectId: string | null;
    }> {
        const allBoostedClaimCapObjects = await getAllOwnedObjects({
            provider: this.provider,
            options: {
                owner: ownerAddress,
                // TODO: Check for correctness
                // Because this might not work in case of upgraded package id, so as a solution,
                // we need to use another filter, which would allow to fetch `BoostedClaimCap` for multiple package addresses
                filter: { StructType: RefundService.BOOSTER_OBJECT_TYPE },
                options: {
                showContent: true,
                showType: true,
                },
            },
        });

        const allBoostedClaimCapListRaw = allBoostedClaimCapObjects as unknown;

        if (!Array.isArray(allBoostedClaimCapListRaw)) {
            throw new Error("[getBoostedClaimCap] Wrong shape returned for get boosted claim cap request");
        }

        const listOfObjectClaimCaps = allBoostedClaimCapListRaw.filter((el): el is BoostedClaimCapType =>
            isBoostedClaimCap(el),
        );

        // We should make sure that boosted claim cap is related to the new address that was provided
        // Otherwise, ignoring the new address, we'll return the boosted claim cap
        // which might not be related to the client
        const boostedClaimCapsAssociatedWithNewAddress = listOfObjectClaimCaps.filter(
            (el) => el.data.content.fields.new_address === newAddress,
        );

        //
        const boostedClaimCapsNotAssociatedWithNewAddress = listOfObjectClaimCaps.filter(
            (el) => el.data.content.fields.new_address !== newAddress,
        );

        const isAnyBoostedClaimCapExists =
        listOfObjectClaimCaps.length > 0 || boostedClaimCapsAssociatedWithNewAddress.length > 0;

        // We can pick any of the associated with the user and new address boosted claim cap
        const boostedClaimCapObject = boostedClaimCapsAssociatedWithNewAddress[0];

        const boostedClaimCapNotAssociatedWithNewAddress = boostedClaimCapsNotAssociatedWithNewAddress[0];

        // We should return related to new address
        return {
            boostedClaimCapObjectId: boostedClaimCapObject?.data?.objectId ?? null,
            isAnyBoostedClaimCapExists,
            boostedClaimCapNotAssociatedWithNewAddressObjectId:
                boostedClaimCapNotAssociatedWithNewAddress?.data?.objectId ?? null,
        };
  }
}
