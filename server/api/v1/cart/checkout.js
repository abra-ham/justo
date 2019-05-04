export default (req, res) => {
	const { database } = req;

	database.cart.checkout(database)
		.then(response => res.status(200).send(response))
		.catch(error => {
			console.log({ error })
			res.status(500).send(error)
		});
};
