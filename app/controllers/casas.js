module.exports = function () {

	var casas = [
		{'_id': 0, 'proprietario':'jose','registros': [{data: "2016-09-12", hora: "12:00", valor: 25}, {data: "2016-09-12", hora: "12:10", valor: 15}, {data: "2016-09-12", hora: "12:20", valor: 20}]},
	];

	var ID_CASA_NXT = casas.length;

	var controller = {};
	
	controller.listaCasas = function (req,res) {
		res.json(casas);
	};

	controller.veCasa = function (req,res) {
		const idCasa = req.params.id;
		const casa = casas.filter(function(index) {
			return index._id == idCasa;
		})[0];
		console.log(casa);

		casa ? res.json(casa):
		res.status(404).send('casa não encontrada');
	};

	controller.salvaCasa = function (req,res) {
		let casa = req.body;
		casa = casa._id+1 ? atualizar(casa) : adicionar(casa);
	};

	controller.removeCasa = function (req,res) {
		const idCasa = req.params.id;
		const casa = casas.filter(function(index) {
			return index._id != idCasa;
		})[0];

		casa ? res.json(casa):
		res.status(404).send('casa não encontrada');
	};

	function atualizar (casaNv) {
		casas = casas.map(function (casa) {
			if(casa._id == casaNv._id) {
				casa = casaNv;
			}
			return casa;
		})

		return casaNv;
	};

	function adicionar (casaNv) {
		casaNv._id = ID_CASA_NXT++;
		casas.push(casaNv);
		return casaNv;
	};

	return controller;
}