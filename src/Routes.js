import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './pages/App';
import List from './pages/List';
import UploadProgress from './components/UploadProgress/UploadProgress';

export default function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/list" exact component={List} />
        </Switch>
        <UploadProgress style={{ textAlign: 'center' }} />
      </Router>
    </>
  );
}
