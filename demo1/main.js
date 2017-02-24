// react普通hash替换用法

import React from 'react';
import ReactDOM from 'react-dom';

const [About, Inbox, Home] = ['About', 'Inbox', 'Home'].map(
    (v, i) => React.createClass({
        render: () => (<div>{v}</div>)
    })
);

const App = React.createClass({
    getInitialState: () => ({route: window.location.hash.substr(1)}),
    componentDidMount(){
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            })
        })
    },
    render(){
        let Child;
        switch(this.state.route) {
            case '/about': Child = About; break;
            case '/inbox': Child = Inbox; break;
            default: Child = Home;
        }

        return (
            <div>
                <h1><a href="#/home">Home</a></h1>
                <ul>
                    <li><a href="#/about">About</a></li>
                    <li><a href="#/inbox">Inbox</a></li>
                </ul>
                <Child/>
            </div>
        );
    }
})

ReactDOM.render(<App />, document.getElementById('example'));
