angular.module("casas").controller('CasaController', function ($scope, $routeParams, $http, $httpParamSerializerJQLike) {
	$scope.casa;

	$scope.filtro = "";

	$http.get('/casas/'+$routeParams.idCasa)
		.then(
			function (res){
				$scope.casa = res.data;
			},
			function (erro){
				console.log(erro);
			}
		);

	$scope.salva = function (){
		var data = {
				_id: $scope.casa._id,
				proprietario: $scope.casa.proprietario,
				registros: $scope.casa.registros};

		$http.post("/casas", data);
	}

	$scope.addLinha = function () {
		$scope.casa.registros.push({data: null, hora: null, valor:null});
	}
});;