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
}]);;angular.module('EmailApp').directive('receivedMails', function() {
  return {
      restrict: 'E',
      replace: 'true',
      template: '<div class="table-responsive"><table class="table table-hover"><thead><tr><th>Nadawca</th><th>Tytuł</th><th>Usuń</th></tr><tbody></tbody></thead></table></div>',
      controller: function ($scope) {
         $scope.del = function (id) {
             $scope.delete(id)   	
             	.success(function(jsonData, statusCode){
						var tableRow = $('#' + id);
						tableRow.remove();
					});
         };
         
         addElement = function (mail) {
         	var fragment = mail.content.substr(0, 150) + "...";
        		var sender = $("<td>" + mail.sender +"</td>");
        		var title = $("<td><a href=\"#/view/" +mail.id+ "\">" + mail.title +"</a><p>"+fragment+"</p></td>");
        		var removeBtn = $("<button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"del()\"><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=\"true\"></span></button>");
				removeBtn.bind('click', function(){
            	$scope.del(mail.id); 
			   }); 
				var remove = $("<td></td>").append(removeBtn);        			
        		var row = $("<tr class='read-"+mail.read+"' id='"+mail.id+"'></tr>)");
        		$("tbody").append(row.append(sender).append(title).append(remove));
        };
      },

      link: function(scope, elem, attrs) {
         scope.$watch('emails', function(list) {
         	for(var i in scope.emails){
         		var mail = list[i];
        			addElement(mail);
         	}
      	});
    	}
  	};
});

angular.module('EmailApp').directive('isActiveNav', [ '$location', function($location) {
	return {
 		restrict: 'A',
 		link: function(scope, element) {
   		scope.location = $location;
   		scope.$watch('location.path()', function(currentPath) {
     			if('#' + currentPath === element[0].attributes.href.nodeValue) {
       			element.parent().addClass('active');
     			} else {
       			element.parent().removeClass('active');
     			}
   		});
 		}
 	};
}]);





angular.module('EmailApp').directive('listView', function() {
  return {
      restrict: 'E',
      replace: 'true',
      template: '<div class="table-responsive"><table class="table table-hover"><thead><tr><th>Odbiorcy</th><th>Tytuł</th></tr><tbody></tbody></thead></table></div>',
      scope: {
      // creates a scope variable in your directive
      // called `list` bound to whatever was passed
      // in via the `list` attribute in the DOM
      list: '=list'
      },
      //The link function is mainly used for:
      //   attaching event listeners to DOM elements,
      //   watching model properties for changes, 
      //   and updating the DOM.
      link: function(scope, elem, attrs) {

         scope.$watch('list', function(list) {
        		angular.forEach(list, function(mail, key) {
        			$("tbody").append("<tr><td>" + mail.receivers +"</td><td><a href=\"#/view/" +mail.id+ "\">" + mail.title +"</a></td></tr>)");
        		});
      	});
    	}
  	};
});;angular.module('EmailApp').factory('mailService', function InboxFactory ($rootScope, $http, $location) {
	'use strict';
	var exports = {};
	exports.getMessages = function () {
		return $http.get('/emails')
		   .success(function(jsonData, statusCode){
			   console.log('The getMessages request was successful!', statusCode);
			   exports.emails = jsonData;
			})
			.error(function (data) {
				console.log('getMessages: There was an error!', data);
			});
	};
	
   exports.getMessage = function (id) {
		return $http.get('/emails/'+id)
		   .success(function(jsonData, statusCode){
			   console.log('The getMessage request was successful!', statusCode);
			   exports.email = jsonData;
			   if(exports.email.read === false){
					exports.readMessage(exports.email);			   
			   }
			   
			})
			.error(function (data) {
				console.log('getMessage: There was an error!', data);
			});
	};
	
	exports.deleteMessage = function (id) {
		return $http.delete('/emails/'+id)
		   .success(function(jsonData, statusCode){
			   console.log('The deleteMessage request was successful!', statusCode);
			   exports.email = jsonData;
			})
			.error(function (data) {
				console.log('deleteMessage: There was an error!', data);
			});
	};
	
	exports.getSent = function () {
		return $http.get('/sent')
			.success(function(jsonData, statusCode){
				console.log('The getSent request was successful!', statusCode);
				exports.sentemails = jsonData;
			})
			.error(function (data) {
				console.log('getSent: There was an error!', data);
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
                console.log('The sendMessage request was successful!', statusCode);
            })
            .error(function(data){
                console.log('Message lost somewhere between time and space', data);
            });
    };
    
    exports.readMessage = function (msg) {
			msg.read = true;
			return $http.put('/emails/'+msg.id, msg)
			  	.success(function(jsonData, statusCode){
					console.log('The readMessage request was successful!', statusCode);
			   })
				.error(function (data) {
				 	console.log('readMessage: There was an error!', data);
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
angular.module('EmailApp').controller('InboxCtrl', function InboxCtrl ($scope, mailService) {
	'use strict';
	$scope.init = function(){
   	mailService.getMessages()
			.success(function(jsonData, statusCode){
				$scope.emails = jsonData;
			});
	};
	
   $scope.delete = function (id) {
   	return mailService.deleteMessage(id);
   };
   
});;/**
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
});;/**
* Controller: PreviewCtrl
*/
angular.module('EmailApp').controller('PreviewCtrl', function PreviewCtrl($scope, $location, $routeParams, mailService) {
	'use strict';
   mailService.getMessage($routeParams.param)
		.success(function(jsonData, statusCode){
			console.log('The request was successful!', statusCode);
			$scope.email = jsonData;
		});
		
   $scope.delete = function(){
	  mailService.deleteMessage($routeParams.param)
		.success(function(jsonData, statusCode){
			alert("USUNIĘTO!");
			$location.path("/inbox");
		});
   };
});;/**
* Controller: SendboxCtrl
*/
angular.module('EmailApp').controller('SentCtrl', function SentCtrl ($scope,  mailService) {
	'use strict';
	console.log('Sent loaded!');
	
	$scope.init = function(){
		mailService.getSent()
		.success(function(jsonData, statusCode){
			console.log('The request was successful!', statusCode);
			$scope.sentemails = jsonData;
		});
	};
});