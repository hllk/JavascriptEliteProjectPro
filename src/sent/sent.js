/**
* Controller: SendboxCtrl
*/
angular.module('EmailApp').controller('SentCtrl', function SentCtrl ($scope,  mailService) {
	'use strict';
	console.log('Sent loaded!');
	
	mailService.getSent()
		.success(function(jsonData, statusCode){
			console.log('The request was successful!', statusCode);
			$scope.sentemails = jsonData;
		});
	
});