angular.module('casas', ['ngRoute', 'chart.js'])
	.config(function($routeProvider) {
		$routeProvider.when('/casas', {
			templateUrl: 'partials/casas.html',
			controller: 'CasasController'
		})
		.when('/casa/:idCasa', {
			templateUrl: 'partials/casa.html',
			controller: 'CasaController'	
		})
		.otherwise({'redirectTo': '/casas'});
		
	});
