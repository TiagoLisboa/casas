angular.module("casas").controller('CasaController', function ($scope, $routeParams, $http, $httpParamSerializerJQLike, $interval) {
	$scope.casa;

	$scope.filtro = "";

	$interval(function () {$scope.carrega()}, 500);

	$scope.carrega = function () {
		$http.get('/casas/'+$routeParams.idCasa)
			.then(
				function (res){
					$scope.casa = res.data;
					gerarGrafico($scope.casa);
					// $interval(function () {entRand();}, 10000)
				},
				function (erro){
					console.log(erro);
				}
			);

	}

	// $scope.carrega();

	$scope.salva = function (){
		var data = {
				_id: $scope.casa._id,
				proprietario: $scope.casa.proprietario,
				registros: $scope.casa.registros};

		console.log(data);

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

	$scope.onClick = function (points, evt) {
	    console.log(points, evt);
	};
	$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
	$scope.options = {
	    scales: {
			yAxes: [
	        {
	          	id: 'y-axis-1',
	          	type: 'linear',
	          	display: true,
	          	position: 'left'
	        }]
		}
	};

	function gerarGrafico(casa) {
		$scope.labels = [];
		$scope.data = [[]];
		for (var i = 0; i < casa.registros.length; i++){
			$scope.labels.push(casa.registros[i].date);
			$scope.data[0].push(casa.registros[i].valor);
		}
	}

});;

