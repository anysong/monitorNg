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
