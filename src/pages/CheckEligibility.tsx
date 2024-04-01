import { FC, useEffect, useState } from "react";
import { RefundService } from "../services/RefundService";
import BigNumber from "bignumber.js";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { FlexBlock } from "../styles";
import { truncateAddress } from "../services/utils";

interface CheckEligibilityParams {
    selectedAddress: string, 
    onAffected: (r: {amount: string, boostedSui: string}) => void, 
    onNotAffected: () => void, 
    onFail: () => void
}


const refundService = RefundService.getInstance();

export const CheckEligibility: FC<CheckEligibilityParams> = ({selectedAddress, onAffected, onNotAffected, onFail}) => {
    const [isAffected, setIsAffected] = useState<boolean | undefined>(undefined);
    const currentAccount = useCurrentAccount();
    const [loading, setLoading] = useState(false);

    const isTheWalletAffected = async (address: string) => {
        const {mist, sui} = await refundService.getClaimAmountNormal({
            poolObjectId: RefundService.REFUND_POOL_OBJECT_ID,
            affectedAddress: address,
        });
        const {sui: boostedSui} = await refundService.getClaimAmountBoosted({
            poolObjectId: RefundService.REFUND_POOL_OBJECT_ID,
            affectedAddress: address,
        });
        return {affected: !new BigNumber(mist).isEqualTo(0), sui, boostedSui};
    }

    useEffect(() => {
        (async () => {
            if(currentAccount) {
                try {
                    setLoading(true);
                    const {sui, affected, boostedSui } = await isTheWalletAffected(selectedAddress);
                    setIsAffected(affected);
                    if(affected) {
                        onAffected({boostedSui, amount: sui});
                    }else {
                        onNotAffected();
                    }
                }catch(e) {
                    onFail();
                }finally {
                    setLoading(false);
                }
            }
        })();
    }, [currentAccount]);

    return <>
        {
            loading && <FlexBlock $direction="row" $justifyContent="center"><h3> Checking {truncateAddress(selectedAddress)} eligibility... </h3> </FlexBlock>
        }  
        {
            isAffected === false && 
            <>
                <h3>❌<br/> Your account is either not affected or you have already claimed the refund.<br /> If you have any questions feel free to reach out to us.</h3>
                <h4>You can retry with another wallet or account by selecting it in the top menu</h4>
            </>
        }
    </>
}