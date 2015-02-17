/**
* Controller: NewMsgCtrl
*/
angular.module('EmailApp').controller('NewMsgCtrl', function NewMsgCtrl($scope, $location, mailService, localStorageService) {
	'use strict';

                                 
    $scope.adresses = [{id: 1}];
    $scope.emails = [];
    $scope.storedEmails = [];
    $scope.EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
    
    if (localStorageService.isSupported) {
        console.log("Hurra!!");
        var keys = localStorageService.keys();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].indexOf('@') > -1) {
                $scope.storedEmails.push(keys[i]);
            }
        }
        console.log($scope.storedEmails);
    }
    
    $scope.send = function() {
        $scope.submitted = true;
        if ($scope.messageForm.$valid) {
            if (localStorageService.isSupported) {
                for (var i = 0; i < $scope.emails.length; i++) {
                    localStorageService.set($scope.emails[i], $scope.emails[i]);
                }
            }
            console.log($scope.emails);
            mailService.sendMessage($scope.inputTitle, $scope.emails, $scope.inputContent)
                .success(function(jsonData, statusCode){
                alert("wysłano!");
                $location.path("/sent");
		});}
     
    };
    
    $scope.addNewAdress = function() {
        var newItemNo = $scope.adresses.length+1;
        $scope.adresses.push({'id': newItemNo});
    };

    $scope.removeAdress = function() {
        if ($scope.adresses.length > 1) {
            $scope.adresses.pop();
        }
        
    };
});