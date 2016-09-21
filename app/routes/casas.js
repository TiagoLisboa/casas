// app/routes/casas

module.exports = function (app) {
	// var controller = require ('../controllers/casas.js')();
	var controller = app.controllers.casas;

	app.route('/casas')
		.get(controller.listaCasas)
		.post(controller.salvaCasa);

	app.route('/casas/:id')
		.get(controller.veCasa)
		.delete(controller.removeCasa);

	app.route('/casas/registro')
		.post(controller.salvaRegistro);
}