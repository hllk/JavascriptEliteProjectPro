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
		
   $scope.read = function(id) {
      alert("open msg " + id);
   };
   
   $scope.delete = function (id) {
   	InboxFactory.deleteMessage(id)		
   	.success(function(jsonData, statusCode){

			var tableRow = $('#' + id);
			tableRow.remove();
						//alert("USUNIĘTO!");
		});
   };
   
   
   
   
   
		
});