import React, { useState } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Simulator from './components/Simulator';
import Configuration, { Config } from './components/Configuration';

const styles = createStyles({
  appContainer: {
    border: 0,
    frameborder: 0,
    width: '100%',
    height: '100%'
  }
})

interface Props extends WithStyles<typeof styles> { }

const App: React.FC<Props> = () => {
  const [config, setConfig] = useState<Config|undefined>(undefined)
  if (!config) return (<Configuration onConfigSet={setConfig} />)
  return (<Simulator account={config.account} node={config.node} appUrl={config.appUrl} resetNode={() => { setConfig(undefined) }} />);
};

export default withStyles(styles)(App)
