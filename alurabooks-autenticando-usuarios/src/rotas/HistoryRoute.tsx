import React from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import '../App.css'

import { createBrowserHistory } from 'history'
import Rotas from '.';

export const history = createBrowserHistory({ window })

function App() {
  return (<HistoryRouter history={history}>
      <Rotas />
    </HistoryRouter>
  );
}

export default App;