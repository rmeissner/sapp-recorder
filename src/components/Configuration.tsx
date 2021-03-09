import React, { useCallback, useState } from 'react';
import { createStyles, TextField, withStyles, WithStyles } from '@material-ui/core';
import { Button } from '@gnosis.pm/safe-react-components';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';

const styles = createStyles({
    appContainer: {
        border: 0,
        frameborder: 0,
        width: '100%',
        height: '100%'
    }
})

export interface Config {
    account: string,
    node: string,
    appUrl: string
}
interface Props extends WithStyles<typeof styles> {
    onConfigSet: (config: Config | undefined) => void
}

const KEY_LOCAL_STORAGE_NODE_KEY = "sapp_browser_config_node"
const KEY_LOCAL_STORAGE_ACCOUNT_KEY = "sapp_browser_config_account"
const KEY_LOCAL_STORAGE_APP_KEY = "sapp_browser_config_app"

const Configuration: React.FC<Props> = ({ onConfigSet }) => {
    const { safe } = useSafeAppsSDK() 
    console.log({safe})
    const [node, setNode] = useState(localStorage.getItem(KEY_LOCAL_STORAGE_NODE_KEY) || "")
    const [account, setAccount] = useState(safe.safeAddress || localStorage.getItem(KEY_LOCAL_STORAGE_ACCOUNT_KEY) || "")
    const [appUrl, setAppUrl] = useState(localStorage.getItem(KEY_LOCAL_STORAGE_APP_KEY) || "")
    const handleConfig = useCallback(async (node: string, account: string, appUrl: string) => {
        localStorage.setItem(KEY_LOCAL_STORAGE_NODE_KEY, node)
        localStorage.setItem(KEY_LOCAL_STORAGE_ACCOUNT_KEY, account)
        localStorage.setItem(KEY_LOCAL_STORAGE_APP_KEY, appUrl)
        if (node && account && appUrl) {
            onConfigSet({ node, account, appUrl })
        } else {
            onConfigSet(undefined)
        }
    }, [onConfigSet])
    return (<>
        <TextField value={node} onChange={(e) => setNode(e.target.value) } label="Node url" />
        <TextField value={account} onChange={(e) => setAccount(e.target.value) } label="Account address" />
        <TextField value={appUrl} onChange={(e) => setAppUrl(e.target.value) } label="App url" />
        <Button size="md" color="primary" onClick={() => handleConfig(node, account, appUrl) }>Start</Button>
    </>);
};

export default withStyles(styles)(Configuration)