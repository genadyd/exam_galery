import React from 'react';
import './App.scss';
import './components/Header'
import './components/Galeryes'
import Header from "./components/Header";
import Galeryes from "./components/Galeryes";
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import GaleryImages from "./components/GaleryImages";

function App() {
  return (
    <div className="App">
        <Provider store={store} >
       <Header/>
       <Router>
        <div className={`container`}>
<Switch>
            <Route path={`/`} component={Galeryes} exact/>
            <Route path="/galery-images/:id" component={GaleryImages}/>
</Switch>


        </div>
       </Router>

        </Provider>
       </div>

  );
}

export default App;
