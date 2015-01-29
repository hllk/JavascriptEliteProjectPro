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
});