import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BlockExplorer from './pages/BlockExplorer';
import Accounts from './pages/Accounts';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={BlockExplorer}></Route>
      <Route exact path='/accounts' component={Accounts}></Route>
    </Switch>
  );
}

export default Main;