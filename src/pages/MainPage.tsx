import { FC } from "react";
import { Container } from "../components/Header/styles";
import { useConnectWallet, useCurrentAccount, useWallets } from "@mysten/dapp-kit";
import { RefundService } from "../services/RefundService";
import { WalletRows } from "../components/WalletRows/WalletRows";
import { whiteFontStyleHeading } from "../theme";
import { FlexBlock } from "../styles";


export const MainPage: FC = () => {
    const wallets = useWallets();
    const currentAccount = useCurrentAccount();
    const { mutateAsync: connect } = useConnectWallet();

    const checkEligibility = async () => {

        if(currentAccount) {
            const refundService = RefundService.getInstance();
            const result = await refundService.getClaimAmountNormal({
                poolObjectId: RefundService.REFUND_POOL_OBJECT_ID,
                affectedAddress: currentAccount?.address,
            });
            console.log('result', result);
        }
    };



    return <FlexBlock $direction="column">
        <h2 style={whiteFontStyleHeading}>Check your wallet eligibility</h2>
        <WalletRows />
    </FlexBlock>
}