/**
* Controller: NewMsgCtrl
*/
angular.module('EmailApp').controller('NewMsgCtrl', function NewMsgCtrl($scope, $location, mailService) {
	'use strict';

    $scope.send = function() {
        console.log($scope.inputTitle);
        mailService.sendMessage($scope.inputTitle, $scope.inputEmail, $scope.inputContent)
            .success(function(jsonData, statusCode){
			alert("wysłano!");
			$location.path("/sent");
		});
    };
});