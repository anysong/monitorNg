angular.module('zc').factory('BaseServ', ['$q','$http',function($q,$http){
	
	var that = {};

	var query = function(data){
		var opt = {
			'method': data.method.toUpperCase() || 'GET',
			'url': dealUrl(),
			'headers': {}
		};
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
			console.log(window.localStorage.getItem('temp-id'));
			opt.params = data.params || {};
			opt.headers['temp-id'] = window.localStorage.getItem('temp-id');

			console.log('opt',opt);
			console.log($http);
			// $http(opt).success(function(data) {
   //              deferred.resolve(data);
   //          }).error(function(msg) {
   //              deferred.reject(msg);
   //          });
   			$http(opt).then(function(data){
   				deferred.resolve(data);
   			},function(msg){
   				deferred.reject(msg);
   			})
            return deferred.promise;

		}else if(opt.method === 'POST'){
			var token = '';
			token = window.localStorage.getItem('temp-id');
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