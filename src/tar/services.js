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
angular.module('zc').factory('ChatServ', [function(){
	console.log(2)
	var that = {
		'aa':111
	};
	return that;
	
}])
angular.module('zc').factory('CallServ', ['BaseServ',function(BaseServ){
    var getUrl = {
    	'getCallStaffJobInfoListNG_all': 'call-data/getCallStaffJobInfoListNG_all',
    	'xxxxx': 'aaaaa'
    };
    var that = {};
   for(var name in getUrl ){
    	that[name] = (function(url){
            return function(params){
                var promise = BaseServ.query({
                    method: 'GET',
                    url: url,
                    params: params
                })
                return promise
            };
        })(getUrl[name])
    };

    return that;
}])





