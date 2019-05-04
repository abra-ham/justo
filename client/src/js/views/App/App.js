import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Store from '../Store';
import Checkout from '../Checkout';

import './style.scss';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			items: [],
			cart: {
				items: [],
			},
		}

		this.getCart = this.getCart.bind(this);
	}

	componentDidMount() {
		axios('http://localhost:9000/v1/items')
			.then(items => this.setState({ items: items.data }));

		this.getCart();
	}

	getCart() {
		axios('http://localhost:9000/v1/cart')
			.then(cart => this.setState({ cart: cart.data[0] }));
	}

	render() {
		const { location: { pathname }} = this.props;
		const { items, cart } = this.state;

		return (
			<section id="main-container" styleName="main-container">
				<header styleName="header">
					<span>Justo</span>
					<button>
						{pathname == '/items' && (
								<Link to="/checkout">
									Ir al carrito ({cart.items.length})
								</Link>
						)}
						{pathname == '/checkout' && (
							<Link to="/items">
								Regresar
							</Link>
						)}
					</button>
				</header>
				<section>
					<Route
						path="/items"
						render={routerProps => <Store {...routerProps} items={items} getCart={this.getCart} />}
					/>
					<Route path="/checkout" render={routerProps => <Checkout {...routerProps} items={items}/>} />
				</section>
			</section>
		);
	};
};

export default App;
