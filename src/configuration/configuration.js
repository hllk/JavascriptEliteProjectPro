/**
* Controller: NewMsgCtrl
*/
angular.module('EmailApp').controller('ConfigurationCtrl', function ConfigurationCtrl($scope, localStorageService, $rootScope) {
	'use strict';  
     
   $rootScope.data = {
       localcss: '',
     };	
   
   if (localStorageService.isSupported) {
         if(angular.isUndefined(localStorageService.get('localcss')) || localStorageService.get('localcss') === null) {
             $rootScope.data.localcss = 'cyborg';
             }
         else {
             $rootScope.data.localcss = localStorageService.get('localcss');
          }
     }
    else { 
        $rootScope.data.localcss = 'cyborg';
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
         
    $scope.$watch('data.localcss', function () {
        if ($rootScope.data.localcss !== null ) {
         localStorageService.add('localcss', $rootScope.data.localcss);         
        }
    });
    
    $scope.result = [];
    
    $scope.init = function() {
        for (var i = 1; i <= 30; i++) {
            $scope.result.push(i);
        }
        
        if(angular.isUndefined($rootScope.frequencies) || $rootScope.frequencies === null) {
            $rootScope.frequencies = 1;
        }
    };
    
     
    $scope.$watch('frequencies', function () {
         $rootScope.$broadcast('rateEvent', $scope.frequencies * 60000);
         $rootScope.frequencies = $scope.frequencies;
         }
    );
    
   
});