import { useConnectWallet, useCurrentWallet, useDisconnectWallet, useWallets } from '@mysten/dapp-kit';
import { IconContainer } from './styles';
import { Button } from '../Button';
import { FlexBlock } from '../../styles';

export const WalletRows: React.FC = () => {
  const wallets = useWallets();
  const currentWallet = useCurrentWallet();
  const { mutateAsync: connect } = useConnectWallet();
  const { mutateAsync: disconnect } = useDisconnectWallet();

  const connectWallet = async (wallet: typeof wallets[0]) => {
    if(currentWallet.isConnected) {
      await disconnect();
    }
    await connect({ wallet }, { onSuccess: (data) => console.debug(data) });
  }


  return (
    <>
        {wallets.length === 0 && <h1>No SUI wallet installed</h1>}
        {
          !currentWallet.isConnected && 
          <FlexBlock $direction='column' style={{gap: '1em'}}>
          <h2>Select your wallet to start the refund process</h2>
          {wallets.map((wallet) => {
            return (
              <Button style={{display: 'flex', justifyContent: 'start', flexDirection: 'row', width: '20em', margin: '0 auto'}} onClick={() => connectWallet(wallet)} key={`wallet-${wallet.name}-${i}`}>
                <IconContainer>
                  <img alt={`${wallet.name} icon`} src={wallet.icon} />
                </IconContainer>
                {wallet.name}
              </Button>
            );
          })}
          </FlexBlock>
        }
        {
          currentWallet.isConnected && 
          <FlexBlock $direction='row' $justifyContent='center' style={{paddingLeft: '15px', gap: '1em', maxWidth: '100%', overflowX: 'auto'}}>
          {wallets.map((wallet) => {
            return (
              <Button className={currentWallet.currentWallet.name === wallet.name ? 'selected' : ''} onClick={() => connectWallet(wallet)} key={`wallet-${wallet.name}`}>
                <img style={{width: '25px'}} alt={`${wallet.name} icon`} src={wallet.icon} />
              </Button>
            );
          })}
          </FlexBlock>
        }
    </>
  );
};
