import './style/App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// components
import Header from './components/Header';
import Tabs from './components/Tabs';

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Tabs} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
