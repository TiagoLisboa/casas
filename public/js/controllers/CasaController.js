angular.module("casas").controller('CasaController', function ($scope, $routeParams, $http, $httpParamSerializerJQLike, $interval) {
	var liveLineData = new RealTimeData(1);

	$scope.casa;

	$scope.filtro = "";

	$scope.onClick = function (points, evt) {
	    console.log(points, evt);
	};

	$scope.opcoes = liveLineData.history();
	console.log(liveLineData.history());

	var promise = $interval(function () {$scope.carrega()}, 500);

	$scope.carrega = function () {
		$http.get('/casas/'+$routeParams.idCasa)
			.then(
				function (res){
					$scope.casa = res.data;
					$scope.stream = liveLineData.next();					
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
		$scope.casa.registros.push({date: null, hora: null, valor:null});
	}

	$scope.$on('$destroy',function(){
	    if(promise)
			$interval.cancel(promise);   
	});
});;

