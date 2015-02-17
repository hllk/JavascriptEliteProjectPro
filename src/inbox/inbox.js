/**
* Controller: InboxCtrl
*/
angular.module('EmailApp').controller('InboxCtrl', function InboxCtrl ($scope, $interval, mailService, $rootScope, $timeout) {
	'use strict';

	$scope.aa="aa";
    $rootScope.rate = 60000;
	$scope.init = function(){
   	mailService.getMessages()
			.success(function(jsonData, statusCode){
				$scope.emails = jsonData;
				$scope.newemails = jsonData;
			});
    loop();
	};
    
    $rootScope.$on('rateEvent', function(event, rate) { 
        $scope.rate = rate;       
    });
	
   $scope.delete = function (id) {
   	return mailService.deleteMessage(id)
   		.success(function(jsonData, statusCode){
				removeElement($scope.emails, id);
		});
   };
   
   var removeElement = function(data, id){
   	for(var i = 0; i < data.length; i++) {
    		if(data[i].id == id) {
         	data = data.splice(i, 1);
         	break;
    		}
		}
   };
   
   var isEqual = function (l1, l2) {
   	if (l1===undefined || l2.length===undefined){
   		return true;
   	}
   	if (l1.length!=l2.length){
   		return false;
   	}
   	else{
		   for(var i in l1){
				if(l1[i].id!=l2[i].id){
					return false;				
				}		   
		   }
		}
		return true;
   };
   
   var loop = function(){
      mailService.getMessages()
			.success(function(jsonData, statusCode){
				if(isEqual($scope.emails,jsonData)){
					console.log("rowne");
				}
				else{
					console.log("nierowne");
					var i = $scope.emails.length;
					var end = jsonData.length;
					$scope.newemails=[];
					for(i; i<end; i++){
						$scope.newemails.push(jsonData[i]);		
						$scope.emails.push(jsonData[i]);				
					}				
				}
           $timeout(loop, $scope.rate);
           console.log('refreshed');
			});
 };
});