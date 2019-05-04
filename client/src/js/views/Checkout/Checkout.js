import React from 'react';
import axios from 'axios';

import './style.scss';

class Checkout extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			total: 0,
			discount: 0,
			itemsWithCount: [],
			loading: false,
		}
	};

	componentDidMount() {
		this.state.loading = true;
	
		axios('http://localhost:9000/v1/cart/checkout')
			.then(({ data }) => this.setState({
				...data,
				loading: false,
			}));
	};

	render() {
		const { total, discount, itemsWithCount, loading } = this.state;

		if (!loading) {
			return (
				<section styleName="checkout">
					<div styleName="items">
						<ul>
							{itemsWithCount.map((item, idx) => (
								<li key={idx}>
									<p>{item.name}</p>
									{(item.quantity * item.price) != item.discount && (
										<React.Fragment>
											<p styleName="promotion">¡Se ha aplicado una promoción especial para tí!</p>
											<p styleName="promotion">{item.promotionDescription}</p>
										</React.Fragment>
									)}
									<p>Cantidad: {item.quantity}</p>
								</li>
							))}
						</ul>
					</div>
					<div styleName="totals">
						<div>
							<span>Precio sugerido: </span>
							<span>{total}</span>
						</div>
						{discount != total && (
							<div>
								<span>Descuento: </span>
								<span>-{total - discount}</span>
							</div>
						)}
						<div>
							<span>Total: </span>
							<span>{discount || total}</span>
						</div>
					</div>
				</section>
			);
		};
	};
};

export default Checkout;
