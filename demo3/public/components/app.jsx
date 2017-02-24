import 'D3less/app';
import {Link, IndexLink} from 'react-router';

var App = React.createClass({
    getInitialState:() => ({
        bg: 'white'
    }),
    render(){

        var self = this;

        return (
            <div className="main">
                {/* 渲染层 */}
                {
                    self.props.children && React.cloneElement(self.props.children, {
                        watermark: 'MinL',
                        showloading(){
                            $('.J-Spiner').show();
                        },
                        hideloading(){
                            setTimeout(function(){
                                $('.J-Spiner').fadeOut();
                            }, 500);
                        },
                        setWaterMark: function(){
                            var self = this;
                            var _el = $('.J-WaterMarkBox');
                            var _str = '';
                            $('.J-WaterMark-P').remove();

                            setTimeout(function(){
                                for(var i = 0; i < ~~(_el.height() / 160) * 2; i++){
                                    _str = _str + '<div class="water-mark">' + self.watermark + '</div>';
                                }

                                _el.children().addClass('water-mark-c');
                                _el.addClass('water-mark-p');
                                _el.prepend('<div class="J-WaterMark-P overflow bg-white" style="height:' + _el.children().height() + 'px;position: absolute;top: 0;left: 0;">' + _str + '</div>');
                            }, 100);
                        },
                        removeWaterMark: function(){
                            var $el = $('.J-WaterMark-P');
                            $el.parent().removeClass('water-mark-p');
                            $el.children().removeClass('water-mark-c');
                            $el.remove();
                        },

                    })
                }

                {/*过渡动画 */}
                <div className="spiner J-Spiner">
                    <div className="sk-spinner sk-spinner-wandering-cubes">
                        <div className="sk-cube1"></div>
                        <div className="sk-cube2"></div>
                    </div>
                </div>
            </div>
        );
    }
});

export default App;
    
