angular.module("zc").controller("MainCtrl", ['$scope','$state',
	function($scope,$state){


	var initFunc = function(){

	};
	var init = function(){
		initFunc();
	};

	init();
}])

angular.module("zc").controller("HomeCtrl", [function(){
	alert('home')
}]);

angular.module("zc").controller("LoginCtrl", ['$scope','$state',
function($scope, $state){

    var initParams = function(){
        $scope.oData = {
            content: ''
        };
    };
    var login = function () {
        console.log($scope.oData.content);
        //登录
        $state.go('zc.main.home');
    };
    var initFunc = function(){
        $scope.login = login;
    };
    var init = function(){
        initParams();
        initFunc();
    };
    init();
}]);
