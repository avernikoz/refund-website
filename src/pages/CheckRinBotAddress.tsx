import { ChangeEventHandler, FC, useState } from "react";
import { Button } from "../components/Button";
import { RefundService } from "../services/RefundService";
import { FlexBlock, PlainInput } from "../styles";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import { getSuiVisionTransactionLink, isTransactionSuccessful, truncateAddress } from "../services/utils";


const refundService = RefundService.getInstance();

export const CheckRinBotAddress: FC<{ownerAddress: string, onSuccess: (p: {rinBotAddress: string, objectCapId: string} | undefined) => void}> = ({ownerAddress, onSuccess}) => {
    const [rinBotAddress, setRinBotAddress] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>();
    const [claimCapNotAssociatedWithObj, setClaimCapNotAssociatedWithObj] = useState<string | undefined>();
    const [burnTxStatus, setBurnTxStatus] = useState<'failed' | 'success' | undefined>(undefined);
    const [lastTxDigest, setLastTxDigest] = useState<string | undefined>(undefined);    
    const { mutateAsync: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
    const [loading, setLoading] = useState(false);

    const addressFieldChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setRinBotAddress(event.target.value.trim());
    };

    const checkValidity: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const {boostedClaimCapObjectId, boostedClaimCapNotAssociatedWithNewAddressObjectId} = await refundService.getBoostedClaimCap({ownerAddress, newAddress: rinBotAddress});
            if(boostedClaimCapNotAssociatedWithNewAddressObjectId) {
                setClaimCapNotAssociatedWithObj(boostedClaimCapNotAssociatedWithNewAddressObjectId);
            }
            setIsValid(!!boostedClaimCapObjectId);
            if(rinBotAddress && boostedClaimCapObjectId) {
                onSuccess({rinBotAddress, objectCapId: boostedClaimCapObjectId});
            }else {
                onSuccess(undefined);
            }
        }catch(e) {
            console.error(e);
        }finally {
            setBurnTxStatus(undefined);            
            setLoading(false);
        }
        return false;
    }

    const resetCapability = async (boostedClaimCap: string): Promise<void> => {
        const tx = new TransactionBlock();
        refundService.getReturnBoosterCapTransaction(tx, {
            poolObjectId: RefundService.REFUND_POOL_OBJECT_ID,
            boostedClaimCap
        });

        tx.setGasBudget(RefundService.REFUND_GAS_BUGET);
        setLoading(true);
        try {
            const txResult = await signAndExecuteTransactionBlock({
                transactionBlock: tx,
                options: {
                    showEffects: true
                }
            });
            setIsValid(undefined);
            setClaimCapNotAssociatedWithObj(undefined);
            if(isTransactionSuccessful(txResult)) {
                setBurnTxStatus('success');            
            }else {
                setBurnTxStatus('failed');            
            }
            setLastTxDigest(txResult.digest);
        }catch(e) {
            console.error(e);
            setBurnTxStatus('failed');            
        }finally {
            setIsValid(undefined);
            setLoading(false);
        }
    }

    return <form onSubmit={checkValidity}>
        <FlexBlock $direction="column" style={{gap: '1em'}}>
            <span>RinBot wallet address</span>
            <PlainInput style={{margin: '0 auto'}} required pattern="^(0x|0X)?[a-fA-F0-9]+$" onChange={addressFieldChange} type="text" />
            <Button disabled={loading} style={{margin: '0 auto'}} type="submit">{loading ? <img src="/spinner.svg" /> : null} Check validity</Button>
            {isValid && <h4>✅<br/> The address <code>{truncateAddress(rinBotAddress)}</code> it's a RINBot address</h4>}
            {isValid === false && rinBotAddress.length > 0 && !claimCapNotAssociatedWithObj && <h4>❌<br/> The address {truncateAddress(rinBotAddress)} is not a valid address, please ensure to follow all the steps above.</h4>}
            {isValid === false && rinBotAddress.length > 0 && claimCapNotAssociatedWithObj && <h4>❌<br/> The address {truncateAddress(rinBotAddress)} doesn't have the capabilities to redeem, if you followed the above steps and you see this message, please click on <code>Reset Capabilities</code> and retry</h4>}
            {isValid === false && rinBotAddress.length > 0 && claimCapNotAssociatedWithObj && <Button onClick={() => resetCapability(claimCapNotAssociatedWithObj)} disabled={loading} style={{margin: '0 auto'}} type="submit">{loading ? <img src='/spinner.svg' /> : null} Reset Capabilities</Button>}
            {burnTxStatus === 'success' && lastTxDigest && <h4>✅<br/> The capabilities has been reset, retry with the above steps and recheck the validity (<a href={getSuiVisionTransactionLink(lastTxDigest)}>TX</a>)</h4>}
            {burnTxStatus === 'success' && !lastTxDigest && <h4>✅<br/> The capabilities has been reset, retry with the above steps and recheck the validity</h4>}
            {burnTxStatus === 'failed' && lastTxDigest && <h4>❌<br /> The capabilities has not been reset, tx failed (<a href={getSuiVisionTransactionLink(lastTxDigest)}>TX</a>)</h4>}
            {burnTxStatus === 'failed' && !lastTxDigest && <h4>❌<br /> The capabilities has not been reset, tx failed</h4>}
        </FlexBlock>
        
    </form>
}