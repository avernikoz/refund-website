import { ChangeEventHandler, FC, useState } from "react";
import { Button } from "../components/Button";
import { RefundService } from "../services/RefundService";
import { FlexBlock, PlainInput } from "../styles";


const refundService = RefundService.getInstance();

export const CheckRinBotAddress: FC<{ownerAddress: string, onSuccess: (rinBotAddress: string, objectCapId: string) => void}> = ({ownerAddress, onSuccess}) => {
    const [rinBotAddress, setRinBotAddress] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>();    

    const addressFieldChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setRinBotAddress(event.target.value);
    };

    const checkValidity: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const {boostedClaimCapObjectId} = await refundService.getBoostedClaimCap({ownerAddress, newAddress: rinBotAddress});
        setIsValid(!!boostedClaimCapObjectId);
        if(boostedClaimCapObjectId) {
            onSuccess(rinBotAddress, boostedClaimCapObjectId);
        }
        return false;
    }

    return <form onSubmit={checkValidity}>
        <FlexBlock $direction="column" style={{gap: '1em'}}>
            <span>RinBot wallet address</span>
            <PlainInput style={{margin: '0 auto'}} onChange={addressFieldChange} type="text" />
            <Button style={{margin: '0 auto'}} type="submit">Check validity</Button>
            {isValid && <h4>✅<br/> The address <code>{rinBotAddress}</code> appear as RINBot address</h4>}
            {isValid === false && rinBotAddress.length > 0 && <h4>❌<br/> The address {rinBotAddress} not appear as RINBot address, did you follow the provided instructions?</h4>}
        </FlexBlock>
        
    </form>
}