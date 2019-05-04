import React, { Component } from 'react';
import axios from 'axios';

import './style.scss';

const addItemToCart = (item, getCart) => {

	axios.post('http://localhost:9000/v1/cart/add', { item })
		.then(res => getCart());
}

const Store = ({ items = [], getCart }) => {
	return (
		<section id="store" styleName="store">
			<ul styleName="item-list">
				{items.length && items.map((item, idx) => {
					const [parsedItem] = Object.values(item);
					return (
						<li key={idx}>
							<div styleName="data">
								<h1>{parsedItem.name}</h1>
								<span>${parsedItem.price}</span>
								<p>{parsedItem.description}</p>
							</div>
							<div styleName="quantity">
								<button onClick={() => addItemToCart(parsedItem, getCart)}>
									Añadir al carrito
								</button>
							</div>
						</li>
					)
				})}
			</ul>	
		</section>
	)
}

export default Store;
