import { useConnectWallet, useWallets } from '@mysten/dapp-kit';
import { IconContainer } from './styles';
import { Button } from '../Button';
import { FlexBlock } from '../../styles';

export const WalletRows: React.FC = () => {
  const wallets = useWallets();

  const { mutate: connect } = useConnectWallet();

  const connectWallet = (wallet: typeof wallets[0]) => {
    connect({ wallet }, { onSuccess: (data) => console.debug(data) });
  }

  return (
    <>
      <FlexBlock $direction='column' style={{gap: '1em'}}>
        {wallets.map((wallet) => {
          return (
            <Button style={{display: 'flex', justifyContent: 'start', flexDirection: 'row', width: '20em', margin: '0 auto'}} onClick={() => connectWallet(wallet)} key={`wallet-${wallet.name}`}>
              <IconContainer>
                <img alt={`${wallet.name} icon`} src={wallet.icon} />
              </IconContainer>
              {wallet.name}
            </Button>
          );
        })}
      </FlexBlock>
    </>
  );
};
