// react配合router插件

import React from 'react';
import ReactDOM from 'react-dom';

// 首先我们需要导入一些组件...
import {Router, Route, Link, IndexLink, IndexRoute, hashHistory, browserHistory} from 'react-router';

const Dashboard = React.createClass({
    render() {
        return (<div>Welcome to the app!</div>);
    }
});

const [About, Inbox] = ['About', 'Inbox'].map(
    (v, i) => React.createClass({
        render: () => (<div>{v}</div>)
    })
);

const App = React.createClass({
    render(){
        return (
            <div>
                <h1>
                    <IndexLink to="/">Home</IndexLink>
                </h1>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
});

// 利用jsx的结构创建路由
// ReactDOM.render((
//     <Router history={hashHistory}>
//         <Route path="/" component={App}>
//             <IndexRoute component={Dashboard} />
//             <Route path="about" component={About} />
//             <Route path="inbox" component={Inbox} />
//         </Route>
//     </Router>
// ), document.getElementById('example'));

// 利用配置文件导入路由
const routeConfig = [
    {
        path: '/',
        component: App,
        indexRoute: { component: Dashboard },
        childRoutes: [
            { path: 'about', component: About },
            { path: 'inbox', component: Inbox }
        ]
    }
];
ReactDOM.render(<Router routes={routeConfig} history={hashHistory} />, document.getElementById('example'));
