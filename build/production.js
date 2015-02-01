angular.module('EmailApp', ['ngRoute']).config(['$routeProvider',function ( $routeProvider ) {
	'use strict';
	// configure urls
	$routeProvider
	// inbox route
	.when('/inbox', {
		templateUrl: 'src/inbox/inbox.html',
		controller: 'InboxCtrl', // map js to html scope
	})
	.when('/sent', {
		templateUrl: 'src/sent/sent.html',
		controller: 'SentCtrl', // map js to html scope
	})
   .when('/create', {
		templateUrl: 'src/new/new.html',
		controller: 'NewMsgCtrl', 
	})
	.when('/view/:param', {
		templateUrl: 'src/preview/preview.html',
		controller: 'PreviewCtrl', 
	})
	.when('/config', {
		templateUrl: 'src/configuration/configuration.html',
		controller: 'ConfigurationCtrl', 
	})
	.otherwise({ // default
		redirectTo: '/inbox'
	});
}]);;angular.module('EmailApp').directive('helloWorld', function() {
  return {
      restrict: 'E',
      replace: 'true',
      template: '<div><h3>Hello2  World3!!</div>',
      controller: function (InboxFactory) {
         this.messages = [];
         InboxFactory.getMessages()
            .then( angular.bind( this, function then() {
               this.messages = InboxFactory.messages;
               
               this.template = "abc";
               
               for (var i in this.messages){
						 this.template += this.messages[i].sender + "<br>";     
               }
               console.log(this.template);
            })	);
         
      },
      compile: function CompilingFunction($templateElement, $templateAttributes) {
        return function LinkingFunction($scope, $linkElement, $linkAttributes) {          

      };
    }
  };
});;angular.module('EmailApp').factory('InboxFactory', function InboxFactory ($rootScope, $http, $location) {
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
});;/**
* Controller: NewMsgCtrl
*/
angular.module('EmailApp').controller('ConfigurationCtrl', function ConfigurationCtrl($scope,  $http) {
	'use strict';

});;/**
* Controller: InboxCtrl
*/
angular.module('EmailApp').controller('InboxCtrl', function InboxCtrl ($scope, InboxFactory) {
	'use strict';
	console.log('Inbox Loaded!');

   InboxFactory.getMessages()
		.success(function(jsonData, statusCode){
			console.log('The request was successful!', statusCode);
			$scope.emails = jsonData;
		});
		
   $scope.read = function(id) {
      alert("open msg " + id);
   };
   
   $scope.delete = function (id) {
   	InboxFactory.deleteMessage(id)		
   	.success(function(jsonData, statusCode){

			var tableRow = $('#' + id);
			tableRow.remove();
						//alert("USUNIĘTO!");
		});
   };
   
   
   
   
   
		
});;/**
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
});;/**
* Controller: PreviewCtrl
*/
angular.module('EmailApp').controller('PreviewCtrl', function PreviewCtrl($scope, $location, $routeParams, InboxFactory) {
	'use strict';
   InboxFactory.getMessage($routeParams.param)
		.success(function(jsonData, statusCode){
			console.log('The request was successful!', statusCode);
			$scope.email = jsonData;
		});
		
   $scope.delete = function(){
	  InboxFactory.deleteMessage($routeParams.param)
		.success(function(jsonData, statusCode){
			alert("USUNIĘTO!");
			$location.path("/inbox");
		});
   };
});;/**
* Controller: SendboxCtrl
*/
angular.module('EmailApp').controller('SentCtrl', function SentCtrl ($scope,  InboxFactory) {
	'use strict';
	console.log('Sent loaded!');
	
	InboxFactory.getSent()
		.success(function(jsonData, statusCode){
			console.log('The request was successful!', statusCode);
			$scope.sentemails = jsonData;
		});
	
});