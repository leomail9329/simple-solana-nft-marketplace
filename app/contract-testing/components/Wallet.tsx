

import React, { useCallback, useMemo } from 'react';
import {
    WalletModalProvider
} from '@solana/wallet-adapter-react-ui';
import { ConnectionProvider, useLocalStorage, WalletProvider } from '@solana/wallet-adapter-react';
import {
    PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useSnackbar } from 'notistack';

export const Wallets = ({ children } : {children: any}) => {
    const endpoint = useMemo(() => clusterApiUrl('devnet'), []);
    // clusterApiUrl returns a string.
    // const endpoint = useMemo(() => "http://localhost:8899", []);
    const [autoConnect, setAutoConnect] = useLocalStorage('autoConnect', false);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ],
        []
    );

    const { enqueueSnackbar } = useSnackbar();
    const onError = useCallback(
        (error : any) => {
            enqueueSnackbar(error.message ? `${error.name}: ${error.message}` : error.name, {
                variant: 'error'
            });
            console.error(error);
        },
        [enqueueSnackbar]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>

            <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>

                <WalletModalProvider>

                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};