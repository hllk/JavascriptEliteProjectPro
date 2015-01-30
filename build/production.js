angular.module('EmailApp', ['ngRoute']).config(function ( $routeProvider ) {
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
	.when('/view', {
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
});;/**
* Controller: NewMsgCtrl
*/
angular.module('EmailApp').controller('ConfigurationCtrl', function ConfigurationCtrl($scope,  $http) {
	'use strict';

});;/**
* Controller: InboxCtrl
*/
angular.module('EmailApp').controller('InboxCtrl', function InboxCtrl ($scope,  $http) {
	'use strict';
	console.log('Inbox Loaded!');
   $scope.title = 'Title';
   $scope.author = 'Author';
   $scope.content = 'Content';
   
   $scope.getEmails = function () {
        		$http.get('/emails').success(function (res) {
        			$scope.emailsRes = res;
        			console.log(res);
        		});
        	};   
   
   
   $scope.getEmails();
   
});;/**
* Controller: NewMsgCtrl
*/
angular.module('EmailApp').controller('NewMsgCtrl', function NewMsgCtrl($scope,  $http) {
	'use strict';

});;/**
* Controller: NewMsgCtrl
*/
angular.module('EmailApp').controller('PreviewCtrl', function PreviewCtrl($scope,  $http) {
	'use strict';

});;/**
* Controller: InboxCtrl
*/
angular.module('EmailApp').controller('SentCtrl', function SentCtrl ($scope,  $http) {
	'use strict';

});