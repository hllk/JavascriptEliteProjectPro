/**
* Controller: NewMsgCtrl
*/
angular.module('EmailApp').controller('NewMsgCtrl', function NewMsgCtrl($scope, $location, mailService, localStorageService) {
	'use strict';

    if (localStorageService.isSupported) {
    console.log("Hurra!!");
        }
                                      
    $scope.adresses = [{id: 1}];
    $scope.emails = [];
    $scope.send = function() {
        console.log($scope.emails);
        mailService.sendMessage($scope.inputTitle, $scope.emails, $scope.inputContent)
            .success(function(jsonData, statusCode){
			alert("wysłano!");
			$location.path("/sent");
		});
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