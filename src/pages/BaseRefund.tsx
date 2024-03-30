import { TransactionBlock } from "@mysten/sui.js/transactions";
import { FC, useCallback, useState } from "react";
import { RefundService } from "../services/RefundService";
import { useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import { getSuiVisionTransactionLink, isTransactionSuccessful } from "../services/utils";
import { FlexBlock } from "../styles";
import { Button } from "../components/Button";


const refundService = RefundService.getInstance();
interface BaseRefunParams {
    amount: string,
    onSuccess: () => void, 
    onFail: () => void
}

export const BaseRefund: FC<BaseRefunParams> = ({amount, onSuccess, onFail}) => {
    const { mutateAsync: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
    const [claimRefundStatus, setClaimRefundStatus] = useState<'failed' | 'success' | undefined>(undefined);
    const [lastTxDigest, setLastTxDigest] = useState<string | undefined>(undefined);    

    const reclaim = useCallback(() => async () => {
        const tx = new TransactionBlock();
        refundService.claimRefundTransaction(tx, {
            poolObjectId: RefundService.REFUND_POOL_OBJECT_ID
        });
        tx.setGasBudget(RefundService.REFUND_GAS_BUGET);
        const result = await signAndExecuteTransactionBlock({
            transactionBlock: tx,
            options: {
                showEffects: true
            }
        });
        if(isTransactionSuccessful(result)) {
            setClaimRefundStatus('success');            
            onSuccess();
        }else {
            setClaimRefundStatus('failed');            
            onFail();
        }
        setLastTxDigest(result.digest);
    }, [onFail, onSuccess, signAndExecuteTransactionBlock]);

    return <FlexBlock $direction="column" style={{flex: 1}}>
        <h3>💵 <b>Base Refund</b>: Receive <i><b>100%</b></i> of your lost funds — <code>${amount}</code> <b>SUI</b>.</h3> 
        <Button style={{margin: '0 auto'}} onClick={reclaim}>Reclaim {amount} SUI</Button>
        {
            claimRefundStatus === 'success' &&
            <>
                {lastTxDigest && <h3>✅<br/> <b>Base refund</b> is <a href={getSuiVisionTransactionLink(lastTxDigest)}>successfully claimed</a>!</h3>}
                {!lastTxDigest && <h3>✅<br/> <b>Base refund</b> is successfully claimed!</h3>}
                <h4>If you want to check another wallet you can switch wallet or account using the top menu</h4>
            </>
        }
        {
            claimRefundStatus === 'failed' &&
            <>
                {lastTxDigest && <h3>❌<br/> <a href={getSuiVisionTransactionLink(lastTxDigest)}>Failed</a> to claim <b>base refund</b></h3>}
                {!lastTxDigest && <h3>❌<br/> Failed to claim <b>base refund</b></h3>}
                {!lastTxDigest && <h4>You can retry with another wallet or account by selecting it in the top menu</h4>}
            </>
        }
    </FlexBlock>
}