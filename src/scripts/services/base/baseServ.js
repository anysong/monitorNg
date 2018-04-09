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
				return '/' + data.urlServ;
			}else {
				return data.urlServ + '/4';
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
