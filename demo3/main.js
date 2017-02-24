import {Router, Route, Link, IndexLink, IndexRoute, hashHistory} from 'react-router';

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

import App from 'D3jsx/app';
import Home from 'D3jsx/home';
import OverView from 'D3jsx/overview';
import DataList from 'D3jsx/datalist';

const routeConfig = [
    {
        path: '/',
        component: App,
        indexRoute: { component: Home },
        childRoutes: [
            { path: 'overview', component: OverView },
            { path: 'datalist', component: DataList }
        ]
    }
];

/*
    <IndexLink to="/">Home</IndexLink>
*/

// 渲染
ReactDOM.render(<Router routes={routeConfig} history={hashHistory} />, document.getElementById('example'));
