angular.module('EmailApp', ['ngRoute']).config(function ( $routeProvider ) {
	'use strict';
	// configure urls
	$routeProvider
	// inbox route
	.when('/inbox', {
		templateUrl: 'src/list/inbox.html',
		controller: 'InboxCtrl', // map js to html scope
	})
	.otherwise({ // default
		redirectTo: '/inbox'
	});
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
});