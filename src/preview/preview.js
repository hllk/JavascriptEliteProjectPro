/**
* Controller: PreviewCtrl
*/
angular.module('EmailApp').controller('PreviewCtrl', function PreviewCtrl($scope, $location, $routeParams, InboxFactory) {
	'use strict';
   InboxFactory.getMessage($routeParams.param)
		.success(function(jsonData, statusCode){
			console.log('The request was successful!', statusCode);
			$scope.email = jsonData;
		});
		
   $scope.delete = function(){
	  InboxFactory.deleteMessage($routeParams.param)
		.success(function(jsonData, statusCode){
			alert("USUNIĘTO!");
			$location.path("/inbox");
		});
   };
});