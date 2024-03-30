import { FC, useEffect, useState } from "react";
import { WalletRows } from "../components/WalletRows/WalletRows";
import { whiteFontStyleHeading } from "../theme";
import { Card, FlexBlock } from "../styles";
import { useCurrentAccount, useDisconnectWallet, useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import { RefundService } from "../services/RefundService";
import BigNumber from 'bignumber.js';
import { Button } from "../components/Button";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { getSuiVisionTransactionLink, isTransactionSuccessful } from "../services/utils";


const refundService = RefundService.getInstance();

export const MainPage: FC = () => {
    const currentAccount = useCurrentAccount();
    const [isAffected, setIsAffected] = useState<boolean | undefined>(undefined);
    const [baseRefundAmount, setBaseRefundAmount] = useState<string | undefined>(undefined);
    const { mutateAsync: disconnect } = useDisconnectWallet();
    const { mutateAsync: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
    const [claimRefundStatus, setClaimRefundStatus] = useState<'failed' | 'success' | undefined>(undefined);
    const [lastTxDigest, setLastTxDigest] = useState<string | undefined>(undefined);

    const isTheWalletAffected = async (address: string) => {
        const {mist, sui} = await refundService.getClaimAmountNormal({
            poolObjectId: RefundService.REFUND_POOL_OBJECT_ID,
            affectedAddress: address,
        });
        return {affected: !new BigNumber(mist).isEqualTo(0), sui};
    }

    const reclaim = async () => {
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
        }else {
            setClaimRefundStatus('failed');            
        }
        setLastTxDigest(result.digest);
    }

    useEffect(() => {
        (async () => {
            if(currentAccount) {
                const {sui, affected }= await isTheWalletAffected(currentAccount.address);
                setIsAffected(affected);
                if(!affected) {
                    await disconnect();
                }
                if(affected) {
                    setBaseRefundAmount(sui);
                }
            }
        })();
    }, [currentAccount, disconnect]);

    return <FlexBlock $direction="column">
        {
            isAffected === undefined && 
            <Card style={{padding: '3em'}}>
                <h2 style={whiteFontStyleHeading}>Check your wallet eligibility</h2>
                <WalletRows />
            </Card>
        }
        {
            isAffected === false && 
            <Card style={{padding: '3em'}}>
                <h3 style={whiteFontStyleHeading}>❌<br/> Your account is either not affected or you have already claimed the refund.<br /> If you have any questions feel free to reach out to us.</h3>
                <h4 style={whiteFontStyleHeading}>Retry with another wallet</h4>
                <WalletRows />
            </Card>
        }
        {
            isAffected && 
            <Card style={{padding: '3em'}}>
                <h2 style={whiteFontStyleHeading}>✅<br/> We have identified <code>${baseRefundAmount}</code> <b>SUI</b> available for refunding to your account.</h2>
                <Button onClick={reclaim}>Reclaim</Button>
            </Card>
        }
        {
            claimRefundStatus === 'success' &&
            <Card style={{padding: '3em'}}>
                {lastTxDigest && <h3 style={whiteFontStyleHeading}>✅<br/> <b>Base refund</b> is <a href={getSuiVisionTransactionLink(lastTxDigest)}>successfully claimed</a>!</h3>}
                {!lastTxDigest && <h3 style={whiteFontStyleHeading}>✅<br/> <b>Base refund</b> is successfully claimed!</h3>}
                <h4 style={whiteFontStyleHeading}>Retry with another wallet</h4>
                <WalletRows />
            </Card>
        }
        {
            claimRefundStatus === 'failed' &&
            <Card style={{padding: '3em'}}>
                {lastTxDigest && <h3 style={whiteFontStyleHeading}>❌<br/> <a href={getSuiVisionTransactionLink(lastTxDigest)}>Failed</a> to claim <b>base refund</b></h3>}
                {!lastTxDigest && <h3 style={whiteFontStyleHeading}>❌<br/> Failed to claim <b>base refund</b></h3>}
                {!lastTxDigest && <h4 style={whiteFontStyleHeading}>Retry with another wallet</h4>}
                <WalletRows />
            </Card>
        }
    </FlexBlock>
}