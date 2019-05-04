export default (req, res) => {
	const { database, body } = req;

	database.cart.all()
		.then(response => {
			const [cart] = response;
			const { item } = body;
			
			return { ...cart, items: [...cart.items, item] };
		})
		.then(newCart => database.cart.update(newCart))
		.then(response => res.status(200).send(response))
		.catch(error => {
			console.log({ error })
			res.status(500).send(error)
		});
};
