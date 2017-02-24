import 'D3less/home';
import {Link, IndexLink} from 'react-router';

const _root = './public/img';

const arr = [
    {
        path: '/overview',
        zh: '整体概况',
        imgLink: _root + '/icon_1.png'
    },
    {
        path: '/datalist',
        zh: '数据统揽',
        imgLink: _root + '/icon_2.png'
    },
    {
        path: '',
        zh: '服务中心',
        imgLink: _root + '/icon_3.png'
    },
    {
        path: '',
        zh: '供应链',
        imgLink: _root + '/icon_4.png'
    },
];

class Home extends React.Component{

    componentDidMount(){
        this.props.hideloading();
    }

    render(){
        return(
            <div className="home">
                <ul className="menu-btn">
                    {
                        arr.map(function(v ,i){
                            return(
                                <li key={i}>
                                    <Link to={v.path}>
                                        <img src={v.imgLink} />
                                        <div className={'link-txt text-' +(v.path ? 'blue' : 'gray')}>
                                            {v.zh}
                                            {v.path ? '' : <p>（规划中）</p>}
                                        </div>
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
                <div className="bottom-img">
                    <img src={_root + '/bg.png'} />
                </div>
                <b className="foot-txt">React-Router</b>
            </div>
        );
    }
};

export default Home;
