/**
* Controller: InboxCtrl
*/
angular.module('EmailApp').controller('InboxCtrl', function InboxCtrl ($scope, mailService) {
	'use strict';
   mailService.getMessages()
		.success(function(jsonData, statusCode){
			console.log('The request was successful!', statusCode);
			$scope.emails = jsonData;
		});
		   
   $scope.delete = function (id) {
   	mailService.deleteMessage(id)		
   	.success(function(jsonData, statusCode){
			var tableRow = $('#' + id);
			tableRow.remove();
		});
   };
   
});