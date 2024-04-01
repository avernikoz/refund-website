import { PropsWithChildren } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { MainPage } from './pages/MainPage';
import { Header } from './components/Header';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { AldrinThemeProvider } from './theme';
import { Footer } from './components/Footer';
import { FlexBlock } from './styles';

const queryClient = new QueryClient();

const App: React.FC<PropsWithChildren> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider 
      createClient={() => {
        return new SuiClient({
          url: getFullnodeUrl('mainnet')
        });
      }} 
      defaultNetwork={'mainnet'}>
        <WalletProvider autoConnect>
          <AldrinThemeProvider>
            <FlexBlock style={{minHeight: 'calc(100vh)'}} $direction='column' $justifyContent='space-between'>
              <Header />
              <MainPage />
              <Footer />
            </FlexBlock>
          </AldrinThemeProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}

export default App
