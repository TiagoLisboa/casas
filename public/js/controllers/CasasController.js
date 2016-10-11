angular.module("casas").controller('CasasController', function ($scope, $routeParams, $http) {
	$scope.casas;

	$scope.filtro = "";

	buscarCasas();

	$http.get('/casas')
		.then(
			function (res){
				$scope.casas = res.data;
				console.log($scope.casas);
			},
			function (erro){
				console.log(erro);
			}
		);

	function buscarCasas () {
		$http.get('/casas')
			.then(
				function (res){
					console.log(res);
				},
				function (erro){
					console.log(erro);
				}
			);
	};
});