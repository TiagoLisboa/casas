angular.module("casas").controller('CasaController', function ($scope, $routeParams, $http, $httpParamSerializerJQLike, $interval) {
	$scope.casa;

	$scope.filtro = "";

	$scope.carrega();

	$scope.carrega = function () {
		$http.get('/casas/'+$routeParams.idCasa)
			.then(
				function (res){
					$scope.casa = res.data;
					// $interval(function () {entRand();}, 10000)
				},
				function (erro){
					console.log(erro);
				}
			);
	}

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

	function entRand () {
		$scope.addLinha();

		var nowDate = new Date();

		var registro = $scope.casa.registros[$scope.casa.registros.length - 1];

		registro.data = nowDate.toJSON().slice(0,10);
		registro.hora = nowDate.toJSON().slice(11,16);
		registro.valor = Math.floor(Math.random() * 10) + 20;

		$scope.salva();

	}

});;

