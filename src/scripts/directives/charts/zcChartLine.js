angular.module("zc").directive('zcChartLine',[function(){
	/** 线形图表 **/
	var link = function(s, e){
		var $scope = s,
			$node = $(e[0]);

			console.log('xxxx');
	};

	return {
		'restrict': 'A',
		'replace': true,
		'scope': {

		},
		'templateUrl': 'views/directives/zcChartLine.html',
		link: link
	}
}])