/**
* Controller: InboxCtrl
*/
angular.module('EmailApp').controller('InboxCtrl', function InboxCtrl ($scope, mailService) {
	'use strict';
	$scope.init = function(){
   	mailService.getMessages()
			.success(function(jsonData, statusCode){
				$scope.emails = jsonData;
			});
	};
	
   $scope.delete = function (id) {
   	return mailService.deleteMessage(id);
   };
   
});