import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import Divider from './components/routing/Divider.js';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
//CSS
import './assets/css/index.css';
import './assets/css/App.css';
import './assets/css/Home.css'
import './assets/css/AppMenu.css'
import './assets/css/Table.css'
import './assets/css/Relations.css';
import './assets/css/prism.css';
// import './aboutusstyle/animate.css'
// import './aboutusstyle/bootstrap.css'
// import './aboutusstyle/bootstrap.min.css'
// import './aboutusstyle/style.css'


ReactDOM.render(
    <BrowserRouter>
        <Divider />
    </BrowserRouter>,
    document.getElementById('root'));
// import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import Contact from './components/Contact'


// ReactDOM.render((
//   <BrowserRouter>
//   <div>
//     <Route exact path="/" component={App}/>
//     <Route path="/contact" component={Contact}/>
//   </div>
//   </BrowserRouter>
//   ), document.getElementById('root'));