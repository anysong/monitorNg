angular.module('zc').factory('BaseServ', ['$q','$http',function($q,$http){
	
	var that = {};

	var query = function(data){
		var opt = {
			'method': data.method.toUpperCase() || 'GET',
			'url': dealUrl(),
			'headers': {}
		};
		var token = window.localStorage.getItem('temp-id');
		/**  defer **/
		var deferred = $q.defer();
		/** deUrl处理url **/
		function dealUrl(){
			// chat/data/getOnceData.action
			
			if(data.ChatServ){
				return '/' + data.url;
			}else {
				return data.url + '/4';
			};
		};

		if(opt.method === 'GET'){
			
			opt.params = data.params || {};
			opt.headers['temp-id'] = token;

   			$http(opt).then(function(data){
   				deferred.resolve(data);
   			},function(msg){
   				deferred.reject(msg);
   			})
            return deferred.promise;

		}else if(opt.method === 'POST'){
			
			var ajaxObj = $.ajax({
				type: 'POST',
				url: dealUrl(),
				headers: {
                    'temp-id': token
                },
                data: params.params,
                dataType: 'json',
                success: function(data){
                	deferred.resolve(data);
                },
                complete: function(request, status){
                	if (status == 'timeout') {
                        ajaxObj.abort();
                        deferred.reject({
                            retCode: '00500',
                            retMsg: '检测到当前网络异常，请再次尝试'
                        });
                    }
                }

			})
			return deferred.promise;
		};
	};

	that.query = query;
	return that;
}])
angular.module('zc').factory('CallServ', ['BaseServ',function(BaseServ){
    var getUrl = {
    	'getCallStaffJobInfoListNG_all': 'call-data/getCallStaffJobInfoListNG_all',
    	'getOnceData': 'chat/data/getOnceData.action'
    };
    var that = {};
   for(var name in getUrl ){
    	that[name] = (function(url){
            return function(params){
                var promise = BaseServ.query({
                    method: 'GET',
                    url: url,
                    ChatServ: true,
                    params: params
                })
                return promise
            };
        })(getUrl[name])
    };

    return that;
}])






angular.module('zc').factory('ChatServ', ['BaseServ',function(BaseServ){
	var getUrl = {
    	'getCallStaffJobInfoListNG_all': 'call-data/getCallStaffJobInfoListNG_all',
    	'getOnceData': 'chat/data/getOnceData.action',
    	'customerSession': 'chat-wb/customerSession/getConservationLineChart/4',
    };
    var that = {};
   for(var name in getUrl ){
    	that[name] = (function(url){
            return function(params){
                var promise = BaseServ.query({
                    method: 'GET',
                    url: url,
                    ChatServ: true,
                    params: params
                })
                return promise
            };
        })(getUrl[name])
    };

    return that;
}])
