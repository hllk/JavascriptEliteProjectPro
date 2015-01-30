angular.module('EmailApp').factory('InboxFactory', function InboxFactory ($rootScope, $http, $location) {
	'use strict';
	var exports = {};
	exports.getMessages = function () {
		return $http.get('/emails')
		   .success(function(jsonData, statusCode){
			   console.log('The request was successful!', statusCode);
			   exports.emails = jsonData;
			})
			.error(function (data) {
				console.log('There was an error!', data);
			});
	};
	
   exports.getMessage = function (id) {
		return $http.get('/emails/'+id)
		   .success(function(jsonData, statusCode){
			   console.log('The request was successful!', statusCode);
			   exports.email = jsonData;
			})
			.error(function (data) {
				console.log('There was an error!', data);
			});
	};
	
	exports.deleteMessage = function (id) {
		return $http.delete('/emails/'+id)
		   .success(function(jsonData, statusCode){
			   console.log('Deleted', statusCode);
			   exports.email = jsonData;
			})
			.error(function (data) {
				console.log('There was an error!', data);
			});
	};
	return exports;
});