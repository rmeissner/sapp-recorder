import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import { Button } from '@gnosis.pm/safe-react-components';
import { SimulatorEngine, Transaction } from '../logic/simulator';
import { FrameCommunicator } from '../logic/messaging';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';

const styles = createStyles({
    appContainer: {
        border: 0,
        frameborder: 0,
        width: '100%',
        height: '100%'
    }
})

interface Props extends WithStyles<typeof styles> {
    node: string,
    account: string,
    appUrl: string,
    resetNode: () => void
}

const Simulator: React.FC<Props> = ({ classes, node, account, appUrl, resetNode }) => {
    const { safe, sdk } = useSafeAppsSDK() 
    const [nextTxs, setNextTxs] = useState<Transaction[] | undefined>([])
    const [pendingTxs, setPendingTxs] = useState<Transaction[]>([])
    const appFrame = useRef<HTMLIFrameElement>(null)

    const isSafeApp = safe.safeAddress !== ''

    const engine = useMemo(() => {
        return new SimulatorEngine(node)
    }, [node])

    const handleSubmit = useCallback(async () => {
        if (isSafeApp) {
            await sdk.txs.send({ txs: pendingTxs })
        } else {
            console.log("Recorded Transactions:", pendingTxs)
        }
    }, [safe, pendingTxs]);

    const onTransactionProposal = useCallback(async (txs: Transaction[]) => {
        if (txs.length > 1)
            throw Error("Currently multiple txs are not supported")
        const tx = txs[0]
        const result = await engine.sendTransaction(account, { to: tx.to, value: tx.value, data: tx.data })
        setNextTxs(txs)
        return result
    }, [engine, account, setNextTxs]);

    React.useEffect(() => {
        if (!nextTxs) return
        setPendingTxs(pendingTxs.concat(nextTxs))
        setNextTxs(undefined)
    }, [nextTxs, setNextTxs, pendingTxs, setPendingTxs])

    const communicator: FrameCommunicator = useMemo(() => {
        return new FrameCommunicator(appFrame, engine, appUrl, isSafeApp ? safe : {
            safeAddress: account,
            network: "MAINNET"
        }, {
            onTransactionProposal
        })
    }, [appFrame, account, appUrl, onTransactionProposal])

    useEffect(() => {
        return communicator.connect(window)
    }, [communicator])

    useEffect(() => {
        const init = async () => {
            await engine.unlock(account)
        }
        init()
    }, [engine, account])

    return (<>
        <>
            &nbsp;Transactions in queue {pendingTxs.length}
            <Button size="md" color="primary" onClick={handleSubmit}>{ isSafeApp ? "Submit" : "Log" }</Button>
            <Button size="md" color="primary" onClick={resetNode}>Reset</Button>
        </>
        <iframe title="App" ref={appFrame} src={appUrl} className={classes.appContainer} />
    </>);
};

export default withStyles(styles)(Simulator)
