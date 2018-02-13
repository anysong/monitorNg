angular.module('zc').factory('BaseServ', ['$q',function($q){
	
	var that = {};

	var query = function(data){
		var opt = {
			'method': data.method.toUpperCase() || 'GET',
			'url': delUrl(data.url),
			'headers': {}
		};
		/**  defer **/
		var deferred = $q.defer();
		/** deUrl处理url **/
		function delUrl(url){
			alert('处理'+ url)
		};
		// var delUrl = function(){
		// 	alert('处理')
		// };
	};

	that.query = query;
	return that;
}])