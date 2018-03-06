angular.module("zc").directive('zcChartBar',['$timeout',function($timeout){
	/** 线形图表 **/
	var link = function(s, e){
		var $scope = s,
			option = {},
			$node = $(e[0]);

			// var myChart = echarts.init($node.find('.js-chart-box')[0]);
			var myChart = echarts.init($node[0]);

			//生成图表
			var dataAxis = ['在线'];
			var data = [220, 182];
			var yMax = 500;
			var dataShadow = [];

			for (var i = 0; i < data.length; i++) {
			    dataShadow.push(yMax);
			}

			option = {
				color: ['#62aefa','#50d0da','#fc769d','#be70f5','#fa9d31','#f5756e','#8bd153','#fadd31'],
			    title: {
			        text: '在线在线',
			        subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
			    },
			    xAxis: {
			        data: dataAxis,
			        axisLabel: {
			            inside: true,
			            textStyle: {
			                color: '#fff'
			            }
			        },
			        axisTick: {
			            show: false
			        },
			        axisLine: {
			            show: false
			        },
			        z: 10
			    },
			    yAxis: {
			        axisLine: {
			            show: false
			        },
			        axisTick: {
			            show: false
			        },
			        axisLabel: {
			            textStyle: {
			                color: '#999'
			            }
			        }
			    },
				legend: {
					data: ['1','2']
				},
			    dataZoom: [
			        {
			            type: 'inside'
			        }
			    ],
			    series: [
			        {
			            type: 'bar',
						name: '在线',
			            data: data
			        },
					{
			            type: 'bar',
						name: '忙碌',
			            data: data
			        }
			    ]
			};

			// Enable data zoom when user click bar.
			var zoomSize = 6;
			myChart.on('click', function (params) {
			    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
			    myChart.dispatchAction({
			        type: 'dataZoom',
			        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
			        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
			    });
			});
			// 渲染
			myChart.setOption(option);

			$(window).resize(function () {
              $scope.$apply(function () {
                console.info("重置");
                myChart.resize()
              })
            });
            var initEvent = function(){
				$scope.$on('echarts.bar.render', function(ev, uuid, dataList){
					if($scope.uuid === uuid){
						console.log('render1',uuid);
						var xNameList = [];
						var onlineValue = [];
						var busyValue = [];
						for(var i=0;i<dataList.length;i++){
							if(dataList[i].name == '在线'){
								onlineValue.push(dataList[i].value);
							}else {
								busyValue.push(dataList[i].value);
							};
							xNameList.push(dataList[i].name);
						};
						option.series[0].data = onlineValue;
						option.series[1].data = busyValue;
						option.xAxis.data = xNameList;
						option.title.subtext = 'xxxxxxxxbar';
						//图例
						// option.legend.data = xNameList;
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
		'templateUrl': 'views/directives/zcChartBar.html',
		link: link
	}
}])
