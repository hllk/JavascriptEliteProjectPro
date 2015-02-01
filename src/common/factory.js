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
	
	exports.getSent = function () {
		return $http.get('/sent')
			.success(function(jsonData, statusCode){
				console.log('The request was successful!', statusCode);
				exports.sentemails = jsonData;
			})
			.error(function (data) {
				console.log('There was an error!', data);
			});
	};
    
    exports.sendMessage = function(messageTitle, messageReceivers, messageContent) {
        return $http.post('/sent', {
            id: Date.now(),
            title: messageTitle,
            receivers: messageReceivers,
            content: messageContent,
            sent: Date.now()
            })
            .success(function(jsonData, statusCode){
                console.log('Message sent', statusCode);
            })
            .error(function(data){
                console.log('Message lost somewhere between time and space', data);
            });
    };
	
	return exports;
});