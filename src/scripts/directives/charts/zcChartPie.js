angular.module("zc").directive('zcChartPie',[function(){
	/** 线形图表 **/
	var link = function(s, e){
		var $scope = s,
			option = {},
			$node = $(e[0]);

			// var data = genData(2);

			var num = 0;

			var myChart = echarts.init($node[0]);

			option = {
				color: ['#62aefa','#50d0da','#fc769d','#be70f5','#fa9d31','#f5756e','#8bd153','#fadd31'],
				textStyle: {
					fontSize: '16px'
				},
			    title : {
			        text: '同名数量统计',
			        subtext: '纯属虚构',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    series : [
			        {
			            name: '姓名',
			            type: 'pie',
			            radius : '55%',
			            center: ['40%', '50%'],
			            data: [],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            },
						label: {
							show: true,
							fontSize: '20',
							fontWeight: 'bold'
						}
			        }
			    ]
			};

			function genData(count) {
			    var nameList = ['赵', '钱'];
			    var legendData = [];
			    var seriesData = [];
			    var selected = {};
			    for (var i = 0; i < 2; i++) {
			        name = Math.random() > 0.65
			            ? makeWord(4, 1) + '·' + makeWord(3, 0)
			            : makeWord(2, 1);
			        legendData.push(name);
			        seriesData.push({
			            name: name,
			            value: Math.round(Math.random() * 100000)
			        });
			        selected[name] = i < 6;
			    }

			    return {
			        legendData: legendData,
			        seriesData: seriesData,
			        selected: selected
			    };

			    function makeWord(max, min) {
			        var nameLen = Math.ceil(Math.random() * max + min);
			        var name = [];
			        for (var i = 0; i < nameLen; i++) {
			            name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
			        }
			        return name.join('');
			    }
			};

			$(window).resize(function () {
              $scope.$apply(function () {
                console.info("重置");
                myChart.resize();
              })
            });
			var initEvent = function(){
				$scope.$on('echarts.pie.render', function(ev, uuid, dataList){
					if($scope.uuid === uuid){
						console.log('render1',uuid);
						option.series[0].data = dataList;
						option.title.subtext = 'xxxxxxxx';
						// 渲染
						myChart.setOption(option);
					};
				});
			};
            var init = function(){
            	initEvent();
            };
            init();
	};

	return {
		'restrict': 'A',
		'replace': true,
		'scope': {
			'chartItem': '=',
			'uuid': '@'
		},
		'templateUrl': 'views/directives/zcChartPie.html',
		link: link
	}
}])
