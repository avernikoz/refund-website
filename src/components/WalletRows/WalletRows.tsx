import { useConnectWallet, useWallets } from '@mysten/dapp-kit';
import { IconContainer, WalletRow } from './styles';

export const WalletRows: React.FC = () => {
  const wallets = useWallets();

  const { mutate: connect } = useConnectWallet();

  return (
    <>
      <div>
        {wallets.map((wallet) => {
          return (
            <div key={`wallet-${wallet.name}`}>
              <WalletRow
                $alignItems="center"
                onClick={() => {
                  connect({ wallet }, { onSuccess: (data) => console.debug(data) });
                }}>
                <IconContainer>
                  <img alt={`${wallet.name} icon`} src={wallet.icon} />
                </IconContainer>
                {wallet.name}
              </WalletRow>
            </div>
          );
        })}
      </div>
    </>
  );
};
