import 'D3less/overview';
import BottomTab from 'D3jsx/bottomtab';

var OverView = React.createClass({
    getInitialState: () => ({
        data: {},
        flag: 1,
        chartrate: 1
    }),
    componentDidMount(){
        this.getData();
    },
    render(){
        var data = this.state.data;
        var chartrate = this.state.chartrate;
        return(
            <div className="overview">
                <div className="J-WaterMarkBox">
                    {   
                        this.state.flag == 2 ?
                        (
                            <div style={{paddingTop: 20}}>
                                <ul className="color-cue">
                                    <li><span className="cue-red"></span>实际完成</li>
                                    <li><span className="cue-blue"></span>目标值</li>
                                </ul>
                                <p className="title">GMV完成情况</p>
                                <div className="mid">
                                    <div className="mid-title" style={{paddingTop: 20}}>
                                        累计<span className="text-red">{data.TargetDate}月</span>GMV(KPI)完成情况（单位：万）
                                    </div>
                                    <div className="mid-body">
                                        <div className="col-p">
                                            <div className="col-up">
                                                <label className="static">{data.GMV}</label>
                                                <div className="p-p">
                                                    <p style={{ width: data.GMVAccumulatedRate * chartrate + '%' }}>
                                                        <span>{data.GMVAccumulatedRate}%</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-down">
                                                <label className="static">{data.GMVTarget}</label>
                                                <div className="p-p">
                                                    <p style={{ width: 100 * chartrate + '%' }}></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mid">
                                    <div className="mid-title">
                                        预计<span className="text-red">{data.TargetDate}月</span>GMV(KPI)完成情况（单位：万）
                                    </div>
                                    <div className="mid-body">
                                        <div className="col-p">
                                            <div className="col-up">
                                                <label className="static">{data.ExpectedGMV}</label>
                                                <div className="p-p">
                                                    <p style={{ width: data.GMVExpectedCompletionRate * chartrate + '%' }}>
                                                        <span>{data.GMVExpectedCompletionRate}%</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-down">
                                                <label className="static">{data.GMVTarget}</label>
                                                <div className="p-p">
                                                    <p style={{ width: 100 * chartrate + '%' }}></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="mid-hr" />
                                <p className="title">人头及佣金完成情况</p>
                                <div className="mid">
                                    <div className="mid-title" style={{paddingTop: 20}}>
                                        人头完成情况（单位：人）
                                    </div>
                                    <div className="mid-body">
                                        <div className="col-p">
                                            <div className="col-up">
                                                <label className="static">{data.PersonCount}</label>
                                                <div className="p-p">
                                                    <p style={{ width: data.PersonCountCompletionRate * chartrate + '%' }}>
                                                        <span>{data.PersonCountCompletionRate}%</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-down">
                                                <label className="static">{data.PersonCountTarget}</label>
                                                <div className="p-p">
                                                    <p style={{ width: 100 * chartrate + '%' }}></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mid">
                                    <div className="mid-title">
                                        佣金完成情况（单位：万）
                                    </div>
                                    <div className="mid-body">
                                        <div className="col-p">
                                            <div className="col-up">
                                                <label className="static">{data.GrossMargin}</label>
                                                <div className="p-p">
                                                    <p style={{ width: data.GrossMarginCompletionRate * chartrate + '%' }}>
                                                        <span>{data.GrossMarginCompletionRate}%</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-down">
                                                <label className="static">{data.GrossMarginTarget}</label>
                                                <div className="p-p">
                                                    <p style={{ width: 100 * chartrate + '%' }}></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <ul className="dashboard bottom-tab-prev" >
                                <li>
                                    <div className="panel">
                                        <p className="text-gray-6">GMV</p>
                                        <p className="text-ink">{data.GMV}万</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="panel">
                                        <p className="text-gray-6">环比上月增长</p>
                                        <p className="text-red">{data.GMVGrowthRate}%</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="panel">
                                        <p className="text-gray-6">人头数</p>
                                        <p className="text-ink">{data.PersonCount}</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="panel">
                                        <p className="text-gray-6">环比上月增长</p>
                                        <p className="text-red">{data.PersonCountGrowthRate}%</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="panel">
                                        <p className="text-gray-6">佣金</p>
                                        <p className="text-ink">{data.GrossMargin}万</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="panel">
                                        <p className="text-gray-6">佣金率</p>
                                        <p className="text-red">{data.GrossMarginRate}%</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="panel">
                                        <p className="text-gray-6">客单价</p>
                                        <p className="text-ink">{data.CustomerPrice}</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="panel">
                                        <p className="text-gray-6">付款率</p>
                                        <p className="text-red">{data.PaymentRate}%</p>
                                    </div>
                                </li>
                                <li className="col-4">
                                    <div className="panel">
                                        <p className="text-gray-6">产品UV</p>
                                        <p className="text-ink">{data.UV}</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="panel">
                                        <p className="text-gray-6">创建订单数</p>
                                        <p className="text-ink">{data.OrderCount}</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="panel">
                                        <p className="text-gray-6">转化</p>
                                        <p className="text-red">{data.UVConversionRate}</p>
                                    </div>
                                </li>
                            </ul>
                        )
                    }
                </div>
                <BottomTab getData={this.getData}/>
            </div>
        );
    },
    getData(flag){
        var self = this;
        flag = flag || 1;
        self.props.showloading();
        self.props.removeWaterMark();

        var re = flag != 2 ? {"PersonCount":3789,"GMV":966.66,"GrossMargin":63.45,"CustomerPrice":2551.23,"OrderCount":2015,"GrossMarginRate":6.56,"PaymentRate":49.53,"UV":267928,"GMVGrowthRate":85.42,"PersonCountGrowthRate":68.40,"UVConversionRate":132.97,"TargetDate":"","PersonCountTarget":0,"GrossMarginTarget":0,"GMVAccumulatedRate":0,"GMVExpectedCompletionRate":0,"PersonCountCompletionRate":0,"GrossMarginCompletionRate":0,"GMVTarget":0,"ExpectedGMV":0} : {"PersonCount":91456,"GMV":23216.04,"GrossMargin":1447.85,"CustomerPrice":0,"OrderCount":0,"GrossMarginRate":0.062364,"PaymentRate":0,"UV":0,"GMVGrowthRate":0,"PersonCountGrowthRate":0,"UVConversionRate":0,"TargetDate":"07","PersonCountTarget":133928.00,"GrossMarginTarget":2054.65,"GMVAccumulatedRate":67.93,"GMVExpectedCompletionRate":81.52,"PersonCountCompletionRate":68.29,"GrossMarginCompletionRate":70.47,"GMVTarget":34176.57,"ExpectedGMV":27859.24};
        console.log(re);
        self.props.setWaterMark();
        if(flag == 3) self.setRate(re);

        self.setState({
            data: re,
            flag: flag
        });
        self.props.hideloading();
    },
    setRate (re){
        var self = this;
        var _arr = ['GMVAccumulatedRate', 'GMVExpectedCompletionRate', 'PersonCountCompletionRate', 'GrossMarginCompletionRate', 'GrossMarginRate'];
        var _num = 0;
        var _rate = 1;
        $.each(_arr,function(i,v){
            if(re[v] > _num) _num = re[v];
        });
        if(_num > 100) _rate = 100 / _num;
        self.setState({
            chartrate: _rate
        })
    }
});

export default OverView;
