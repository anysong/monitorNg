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





