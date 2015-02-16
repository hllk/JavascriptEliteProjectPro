/**
* Controller: NewMsgCtrl
*/
angular.module('EmailApp').controller('ConfigurationCtrl', function ConfigurationCtrl($scope, localStorageService) {
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
        { name: 'Cyborg', url: 'cyborg' }
      ];
      
       
    $scope.$watch('localcss', function () {
        if ($scope.localcss !== null ) {
            localStorageService.add('localcss', $scope.localcss);
            console.log($scope.localcss);
          }
    });
    
   
});