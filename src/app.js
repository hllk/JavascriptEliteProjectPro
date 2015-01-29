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
   .when('/new', {
		templateUrl: 'src/new/new.html',
		controller: 'NewMsgCtrl', 
	})
	.when('/preview', {
		templateUrl: 'src/preview/preview.html',
		controller: 'PreviewCtrl', 
	})
	.when('/conf', {
		templateUrl: 'src/configuration/configuration.html',
		controller: 'ConfigurationCtrl', 
	})
	.otherwise({ // default
		redirectTo: '/inbox'
	});
});