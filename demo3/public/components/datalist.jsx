import 'D3less/datalist';
import BottomTab from 'D3jsx/bottomtab';
import lodash from 'lodash';

var viewData = {
    searchdata:{
        type: 2,
        quota: 2,
        flag: 1
    },
    listdata:{},
    dateDetail: [],
    fakedata:{
        quota_1: { //人头
            Thead: [{
                name: '名称',
                com: '',
                key: 'Name'
            }, {
                name: '人头数',
                com: '',
                key: 'PersonCount'
            }, {
                name: '环比',
                com: '%',
                key: 'PersonCountGrowthRate',
                contrast: 'ToTalPersonCountGrowthRate'
            }, {
                name: '占比',
                com: '%',
                key: 'PersonCountAccounting',
            }], //'完成率3'
            Nhead: [{
                name: '总人头数',
                com: '',
                key: 'ToTalPersonCount'
            }, {
                name: '环比',
                com: '%',
                key: 'ToTalPersonCountGrowthRate'
            }] //'完成率'
        },
        quota_2: { //GMV
            Thead: [{
                name: '名称',
                com: '',
                key: 'Name'
            }, {
                name: '金额（万）',
                com: '',
                key: 'GMV'
            }, {
                name: '环比',
                com: '%',
                key: 'GMVGrowthRate',
                contrast: 'TotalGMVGrowthRate'
            }, {
                name: '占比',
                com: '%',
                key: 'GMVAccounting'
            }],
            Nhead: [{
                name: '总金额',
                com: '万',
                key: 'ToTalGMV'
            }, {
                name: '环比',
                com: '%',
                key: 'TotalGMVGrowthRate'
            }] //'完成率'
        },
        quota_3: { //总营收
            Thead: [{
                name: '名称',
                com: '',
                key: 'Name'
            }, {
                name: '金额（万）',
                com: '',
                key: 'GrossMargin'
            }, {
                name: '佣金率',
                com: '%',
                key: 'GrossMarginGrowthRate',
                contrast: 'ToTalGrossMarginRate'
            }, {
                name: '占比',
                com: '%',
                key: 'GrossMarginAccounting'
            }], //'完成率3'
            Nhead: [{
                name: '总金额',
                com: '万',
                key: 'ToTalGrossMargin'
            }, {
                name: '佣金率',
                com: '%',
                key: 'ToTalGrossMarginRate'
            }] //'完成率'
        }
    }
};

var orderNum = 'desc';

var DataList = React.createClass({
    getInitialState: () => viewData,
    componentDidMount(){
        this.getData(1);
    },
    render(){
        var searchdata = this.state.searchdata;
        var fakedata = this.state.fakedata;
        var listdata = this.state.listdata;
        var dateDetail = this.state.dateDetail;

        return(
            <div className="datalist">
                <div className="bg-white bottom-tab-prev">
                    <div className="middle-top">
                        <div className="middle-sel">
                            维度选择
                            <div className="sel-group">
                                <select defaultValue={searchdata.type} onChange={this.setSelect} name="type">
                                    <option value="1">区域</option>
                                    <option value="2">项目部</option>
                                </select>
                                <i className="fa fa-angle-down arrow"></i>
                            </div>
                        </div>
                        <div className="middle-sel">
                        指标选择
                            <div className="sel-group">
                                <select defaultValue={searchdata.quota} onChange={this.setSelect} name="quota">
                                    <option value="1">人头</option>
                                    <option value="2">GMV</option>
                                    <option value="3">总营收</option>
                                </select>
                                <i className="fa fa-angle-down arrow"></i>
                            </div>
                        </div>
                    </div>
                    <div className="middle-mid">
                        {
                            fakedata['quota_' + searchdata.quota].Nhead.map((v, i) => (
                                <span key={i}>{v.name}：{listdata[v.key]} {v.com}</span>
                            ))
                        }
                    </div>
                    <div className="middle-bottom J-WaterMarkBox">
                        <table>
                            <thead>
                                <tr>
                                    {
                                        fakedata['quota_' + searchdata.quota].Thead.map((th, i) => (
                                            <th key={i}>
                                                <a href="javascript:;" style={{display: 'block',color: '#337ab7'}} onClick={() => this.setOrder(i)}>
                                                    {th.name} <i className="fa fa-arrows-v"></i>
                                                </a>
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dateDetail.map((item, i) => (
                                        <tr key={i}>

                                            {
                                                fakedata['quota_' + searchdata.quota].Thead.map((td, _i) => (
                                                    <td key={_i}>
                                                        {
                                                            td.contrast && item[td.key] < listdata[td.contrast] ?
                                                            <span className="text-red">
                                                                {item[td.key]} {td.com}

                                                                {
                                                                    item[td.key] < 0 ? 
                                                                    <i className="fa fa-long-arrow-down"></i> :
                                                                    ''
                                                                }
                                                            </span> : 
                                                            <span>
                                                                {item[td.key]} {td.com}
                                                            </span>
                                                        }
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <BottomTab getData={this.getData}/>
            </div>
        );
    },
    setSelect(e){
        var self = this;
        var searchdata = self.state.searchdata;
        searchdata[e.target.name] = e.target.value;
        this.setState({searchdata: searchdata});

        if(e.target.name == 'type'){
            this.getData(e.target.value, 2);
        }else{
            this.setData();
        }
    },
    getData($index, _type){//_type 默认1，2为维度选择
        var self = this;
        var searchdata = self.state.searchdata;

        if(!_type){
            searchdata.flag = $index;
            self.setState({
                searchdata: searchdata
            });
        }

        self.props.showloading();

        var re = {"DateDetail":[{"Name":"东北","GMV":1428810.00,"GrossMargin":92461.40,"PersonCount":528,"GMVGrowthRate":1.49,"PersonCountGrowthRate":1.27,"GrossMarginGrowthRate":1.66,"GMVAccounting":0.14,"PersonCountAccounting":0.13,"GrossMarginAccounting":0.15,"PersonCountCompletionRate":77,"GMVCompletionRate":36,"GrossMarginCompletionRate":22},{"PersonCountGrowthRate":-3,"PersonCountCompletionRate":130,"Name":"福建","GMV":997109.00,"GrossMargin":75692.60,"PersonCount":568,"GMVGrowthRate":1.36,"GrossMarginGrowthRate":2.05,"GMVAccounting":0.10,"PersonCountAccounting":0.14,"GrossMarginAccounting":0.12},{"Name":"广西","GMV":470976.00,"GrossMargin":30216.05,"PersonCount":227,"GMVGrowthRate":0.84,"PersonCountGrowthRate":0.70,"GrossMarginGrowthRate":0.84,"GMVAccounting":0.05,"PersonCountAccounting":0.05,"GrossMarginAccounting":0.05},{"Name":"海南","GMV":802948.00,"GrossMargin":44552.60,"PersonCount":287,"GMVGrowthRate":1.04,"PersonCountGrowthRate":1.08,"GrossMarginGrowthRate":1.44,"GMVAccounting":0.08,"PersonCountAccounting":0.07,"GrossMarginAccounting":0.07},{"Name":"华北","GMV":1369289.00,"GrossMargin":64999.25,"PersonCount":670,"GMVGrowthRate":2.22,"PersonCountGrowthRate":2.09,"GrossMarginGrowthRate":1.66,"GMVAccounting":0.13,"PersonCountAccounting":0.16,"GrossMarginAccounting":0.10},{"Name":"华东","GMV":518432.00,"GrossMargin":35488.90,"PersonCount":301,"GMVGrowthRate":1.40,"PersonCountGrowthRate":1.22,"GrossMarginGrowthRate":1.78,"GMVAccounting":0.05,"PersonCountAccounting":0.07,"GrossMarginAccounting":0.06},{"Name":"两湖","GMV":658647.00,"GrossMargin":42069.10,"PersonCount":291,"GMVGrowthRate":0.85,"PersonCountGrowthRate":0.96,"GrossMarginGrowthRate":1.32,"GMVAccounting":0.06,"PersonCountAccounting":0.07,"GrossMarginAccounting":0.07},{"Name":"西部","GMV":2321982.00,"GrossMargin":132426.15,"PersonCount":587,"GMVGrowthRate":1.69,"PersonCountGrowthRate":1.36,"GrossMarginGrowthRate":1.67,"GMVAccounting":0.22,"PersonCountAccounting":0.14,"GrossMarginAccounting":0.21},{"Name":"云南","GMV":1033353.00,"GrossMargin":70142.55,"PersonCount":283,"GMVGrowthRate":1.04,"PersonCountGrowthRate":0.84,"GrossMarginGrowthRate":1.17,"GMVAccounting":0.10,"PersonCountAccounting":0.07,"GrossMarginAccounting":0.11},{"Name":"中原","GMV":774156.00,"GrossMargin":38342.50,"PersonCount":388,"GMVGrowthRate":1.81,"PersonCountGrowthRate":1.67,"GrossMarginGrowthRate":2.01,"GMVAccounting":0.07,"PersonCountAccounting":0.09,"GrossMarginAccounting":0.06}],"ToTalGMV":10375702.00,"ToTalPersonCount":4130,"ToTalGrossMargin":626391.10,"TotalGMVGrowthRate":1.37,"ToTalPersonCountGrowthRate":1.25,"ToTalGrossMarginRate":1.53,"ToTalPersonCountCompletionRate":77.58,"ToTalGMVCompletionRate":80,"ToTalGrossMarginCompletionRate":38};
        self.setState({
            listdata: re,
            dateDetail: re.DateDetail
        });
        self.setData();
        self.props.setWaterMark();
        self.props.hideloading();
    },
    setData(){
        var self = this;
        var state = self.state.searchdata;
        var quota = state.quota;
        var flag = state.flag;
        var type = state.type;

        var fakeData = self.state.fakedata;
        var _head = fakeData['quota_' + quota];

        var arr_quota = ['PersonCount', 'GMV', 'GrossMargin'];

        if(flag == 3 && type == 2){
            if(_head.Nhead.length == 2) _head.Nhead.push({name: '完成率', com: '%', key: 'ToTal' + arr_quota[quota - 1] + 'CompletionRate'});
            if(_head.Thead.length == 4) _head.Thead.splice(2, 0, {name: '完成率', com: '%', key: arr_quota[quota - 1] + 'CompletionRate', contrast: 'ToTal' + arr_quota[quota - 1] + 'CompletionRate'});
        }else{
            if(_head.Thead.length == 5) _head.Thead.splice(2, 1);
            if(_head.Nhead.length == 3) _head.Nhead.splice(2, 1);
        }

        fakeData['quota_' + quota] = _head;

        self.setState({fakeData: fakeData});
    },
    setOrder($index){
        var state = this.state;
        var orderKey = state.fakedata['quota_' + state.searchdata.quota].Thead[$index].key;
        orderNum = orderNum == 'desc' ? 'asc' : 'desc';

        var list = lodash.orderBy(state.dateDetail, orderKey, orderNum);

        this.setState({
            dateDetail: list
        });
    }
});

export default DataList;
