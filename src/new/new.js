/**
* Controller: NewMsgCtrl
*/
angular.module('EmailApp').controller('NewMsgCtrl', function NewMsgCtrl($scope, $location, InboxFactory) {
	'use strict';

    $scope.send = function() {
        console.log($scope.inputTitle);
        InboxFactory.sendMessage($scope.inputTitle, $scope.inputEmail, $scope.inputContent)
            .success(function(jsonData, statusCode){
			alert("wysłano!");
			$location.path("/sent");
		});
    };
});