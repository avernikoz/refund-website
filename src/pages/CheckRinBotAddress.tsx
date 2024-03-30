import { ChangeEventHandler, FC, useState } from "react";
import { Button } from "../components/Button";
import { RefundService } from "../services/RefundService";


const refundService = RefundService.getInstance();

export const CheckRinBotAddress: FC<{ownerAddress: string, onSuccess: (rinBotAddress: string, objectCapId: string) => void}> = ({ownerAddress, onSuccess}) => {
    const [rinBotAddress, setRinBotAddress] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>();    

    const addressFieldChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setRinBotAddress(event.target.value);
    };

    const checkValidity = async () => {
        const {boostedClaimCapObjectId} = await refundService.getBoostedClaimCap({ownerAddress, newAddress: rinBotAddress});
        setIsValid(!!boostedClaimCapObjectId);
        if(boostedClaimCapObjectId) {
            onSuccess(rinBotAddress, boostedClaimCapObjectId);
        }
    }

    return <form onSubmit={checkValidity}>
        <input onChange={addressFieldChange} type="text" />
        <Button type="submit">Check validity</Button>
        {isValid && <h3>✅ The address {rinBotAddress} appear as RINBot address</h3>}
        {!isValid && <h3>❌ The address {rinBotAddress} not appear as RINBot address, did you follow the provided instructions?</h3>}
    </form>
}