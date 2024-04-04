import { FC, useEffect, useState } from "react";
import { FlexBlock, MainPageCard, ResponsiveFlex, Separator} from "../styles";
import { WalletRows } from "../components/WalletRows/WalletRows";
import { AccountRows } from "../components/AccountRows/AccountRows";
import { CheckEligibility } from "./CheckEligibility";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { BaseRefund } from "./BaseRefund";
import { BoostedRefund } from "./BoostedRefund";


export const MainPage: FC = () => {
    const currentAccount = useCurrentAccount();
    const [baseRefundAmount, setBaseRefundAmount] = useState<string | undefined>();
    const [boostedRefundAmount, setBoostedRefundAmount] = useState<string | undefined>();

    const onAffected: (p: {boostedSui: string, amount: string}) => void = ({amount, boostedSui}) => {
        setBaseRefundAmount(amount);
        setBoostedRefundAmount(boostedSui);
    }

    useEffect(() => {
        setBaseRefundAmount(undefined)
        setBoostedRefundAmount(undefined)
    }, [currentAccount]);

    const onNotAffected = () => {}

    const onCheckEligibilityFail = () => {}

    const baseRefundSuccess = () => {}

    const baseRefundFail = () => {}

    const boostedRefundSuccess = () => {}

    const boostedRefundFail = () => {}

    return <MainPageCard>
        <FlexBlock $direction="column">
            <WalletRows />
            <AccountRows />
            {currentAccount && 
            <CheckEligibility 
                selectedAddress={currentAccount?.address} 
                onAffected={onAffected} 
                onNotAffected={onNotAffected} 
                onFail={onCheckEligibilityFail} />
            }
            <ResponsiveFlex $justifyContent="space-evenly">
                {
                    boostedRefundAmount && currentAccount &&
                    <BoostedRefund 
                        amount={boostedRefundAmount}
                        onSuccess={boostedRefundSuccess}
                        onFail={boostedRefundFail} 
                        selectedAddress={currentAccount.address} />
                }
                {baseRefundAmount && boostedRefundAmount && currentAccount &&
                    <Separator />
                }
                {
                    baseRefundAmount &&
                    <BaseRefund
                        amount={baseRefundAmount} 
                        onSuccess={baseRefundSuccess} 
                        onFail={baseRefundFail} />
                }
            </ResponsiveFlex>
            
        </FlexBlock>
    </MainPageCard>
}