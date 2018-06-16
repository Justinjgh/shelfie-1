module.exports = {
	read: (req, res, next) => {
		const dbInstance = req.app.get('db');

		dbInstance.get_inventory().then((products) => res.status(200).send(products)).catch((err) => {
			res.status(500).send({ errorMessage: 'Something went wrong!' });
			console.log(err);
		});
	},
	create: (req, res, next) => {
		const dbInstance = req.app.get('db');
		const { name, price, image_url } = req.body;

		dbInstance.create_product([ name, price, image_url ]).then(() => res.sendStatus(200)).catch((err) => {
			res.status(500).send({ errorMessage: 'Something went wrong!' });
			console.log(err);
		});
	},
	delete: (req, res, next) => {
		const dbInstance = req.app.get('db');
		const { id } = req.params;

		dbInstance.delete_product([ id ]).then(() => res.sendStatus(200)).catch((err) => {
			res.status(500).send({ errorMessage: 'Something went wrong!' });
			console.log(err);
		});
	},
	update: (req, res, next) => {
		const dbInstance = req.app.get('db');
		const { name, price, image_url } = req.body;
		const { id } = req.params;

		dbInstance.update_product([ id, name, price, image_url ]).then(() => res.sendStatus(200)).catch((err) => {
			res.status(500).send({ errorMessage: 'Something went wrong!' });
			console.log(err);
		});
	},
	getOne: (req, res, next)=> {
		const dbInstance = req.app.get('db');
		const { id } = req.params;

		dbInstance.get_product([id])
		.then( product => res.status(200).send( product ) )
        .catch( err => {
          res.status(500).send({errorMessage: "Something went wrong!"});
          console.log(err)
        } );
	}
};
