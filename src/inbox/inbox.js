/**
* Controller: InboxCtrl
*/
angular.module('EmailApp').controller('InboxCtrl', function InboxCtrl ($scope, InboxFactory) {
	'use strict';
	console.log('Inbox Loaded!');

   InboxFactory.getMessages()
		.success(function(jsonData, statusCode){
			console.log('The request was successful!', statusCode);
			$scope.emails = jsonData;
		});
		
   $scope.openMessage = function(id) {
      //$state.go('view');
      console.log("open msg " + id);
   };
		
});