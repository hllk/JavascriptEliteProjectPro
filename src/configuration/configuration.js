/**
* Controller: NewMsgCtrl
*/
angular.module('EmailApp').controller('ConfigurationCtrl', function ConfigurationCtrl($scope, localStorageService, $rootScope) {
	'use strict';  
     
     if (localStorageService.isSupported) {
         if(angular.isUndefined(localStorageService.get('localcss')) || localStorageService.get('localcss') === null) {
             $scope.localcss = 'cyborg';
             }
         else {
             $scope.localcss = localStorageService.get('localcss');
          }
     }
    else { 
        $scope.localcss = 'cyborg';
    }
            
      // create the list of bootswatches
      $scope.bootstraps = [
        { name: 'Cerulean', url: 'cerulean' },
        { name: 'Superhero', url: 'superhero' },
        { name: 'United', url: 'united' },
        { name: 'Cyborg', url: 'cyborg' },
        { name: 'Sandstone', url: 'sandstone' },
        { name: 'Darkly', url: 'darkly' },
        { name: 'Flatly', url: 'flatly' },
        { name: 'Slate', url: 'slate' }
      ];
      
       
    $scope.$watch('localcss', function () {
        if ($scope.localcss !== null ) {
            localStorageService.add('localcss', $scope.localcss);          
          }
    });
    
    $scope.result = [];
    
    $scope.init = function() {
    for (var i = 1; i <= 15; i++) {
        $scope.result.push(i);
        }
    };
    
    $scope.frequencies = 1;

    $scope.$watch('frequencies', function () {
         $rootScope.$broadcast('rateEvent', $scope.frequencies * 60000);
         }
    );
    
    
   
});