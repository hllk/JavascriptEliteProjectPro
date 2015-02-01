/**
* Controller: SendboxCtrl
*/
angular.module('EmailApp').controller('SentCtrl', function SentCtrl ($scope,  InboxFactory) {
	'use strict';
	console.log('Sent loaded!');
	
	InboxFactory.getSent()
		.success(function(jsonData, statusCode){
			console.log('The request was successful!', statusCode);
			$scope.sentemails = jsonData;
		});
	
});