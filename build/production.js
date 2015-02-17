angular.module('EmailApp', ['ngRoute', 'LocalStorageModule']).config(['$routeProvider', 'localStorageServiceProvider', function ( $routeProvider, localStorageServiceProvider ) {
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
    localStorageServiceProvider
    .setPrefix('EmailApp')
    .setStorageType('localStorage')
    .setNotify('true', 'true');
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
        		$("tbody").prepend(row.append(sender).append(title).append(remove));
        };
        
        var formatTime = function(timestamp) {
	 			var date = new Date(timestamp * 1000);
				var datevalues = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
				return datevalues;
			};
      },

      link: function(scope, elem, attrs) {
         scope.$watch('newemails', function(list) {
         	for(var i in scope.newemails){
         		var mail = list[i];
        			addElement(mail);
         	}
      	});
    	}
  	};
});

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
        			$("tbody").prepend("<tr><td>" + mail.receivers +"</td><td>" + mail.title + "</td></tr>)");
        		});
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
}]);;angular.module('EmailApp').factory('mailService', function InboxFactory ($rootScope, $http, $location) {
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
        //var receiversArray = JSON.stringify(messageReceivers);
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
});

;/**
* Controller: NewMsgCtrl
*/
angular.module('EmailApp').controller('ConfigurationCtrl', function ConfigurationCtrl($scope, localStorageService, $rootScope) {
	'use strict';  
     
   $rootScope.data = {
       localcss: ''
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
    for (var i = 1; i <= 15; i++) {
        $scope.result.push(i);
        }
    };
    
    $scope.frequencies = 1;

    $scope.$watch('frequencies', function () {
         $rootScope.$broadcast('rateEvent', $scope.frequencies * 60000);
         }
    );
    
    
   
});;/**
* Controller: InboxCtrl
*/
angular.module('EmailApp').controller('InboxCtrl', function InboxCtrl ($scope, mailService, $rootScope, $timeout) {
	'use strict';

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
});;/**
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
        $scope.submitted = true;
        if ($scope.messageForm.$valid) {
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
   
   $scope.back = function(){
			$location.path("/inbox");
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