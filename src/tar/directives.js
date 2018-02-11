angular.module("zc").directive('zcChartBar',[function(){
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
		'templateUrl': 'views/directives/zcChartBar.html',
		link: link
	}
}])
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
angular.module("zc").directive('zcChartPie',[function(){
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
		'templateUrl': 'views/directives/zcChartPie.html',
		link: link
	}
}])