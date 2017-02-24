import 'D3less/bottomtab';

var BottomTab = React.createClass({

    getInitialState:() => ({
            tablist: ['实时', '昨日', '本月'],
            flag: 0
    }),
    render(){
        var state = this.state;
        return (
            <ul className="fixed-bottom-tab">
                {
                    state.tablist.map((v, i) => <li className={state.flag == i ? 'active': ''} key={i} onClick={() => this.go(i)}>{v}</li>)
                }
            </ul>
        );
    },
    go($index){
        var flag = this.state.flag;
        if(flag == $index) return;
        this.setState({
            flag: $index
        });
        this.props.getData($index);
    }
});

export default BottomTab;

