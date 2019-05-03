export default (req, res) => {
  const { database } = req;

  database.cart.all()
    .then(response => res.status(200).send(response))
    .catch(error => res.status(500).send(error));
};
