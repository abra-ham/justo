const staticItems = {
	0: {
		TSHIRT: {
			code: 'TSHIRT',
			name: 'Playera con motivo de Avengers: Endgame',
			description: 'Esta playera se encuentra libre de spoilers.',
			price: 20,
		}
	},
	1: {
		VOUCHER: {
			code: 'VOUCHER',
			name: 'Voucher de Peppa Pig',
			description: 'Perfecto para tus sobrinos.',
			price: 5,
		}
	}, 
	2: { 
		MUG: {
			code: 'MUG',
			name: 'Taza con motivo Vegetariano',
			description: 'Ahora nadie te invitará por una hamburguesa, bien hecho.',
			price: 7.5,
		},
	}
};

const initialCartState = {
	0: {
		id: 0,
		items: [],
		price: 0,
		discount: 0,
		total: 0,
		appliedPromotions: []
	}
}

const promotions = {
	0: {
		TSHIRT: {
			promotion: (quantity, price) => {
				return quantity >= 3 ? quantity * 19 : quantity * price;
			},
			description: 'Lleva 3 playeras o más y cada una tendrá un valor de $19.00',
		},
		VOUCHER: {
			promotion: (quantity, price) => {
				return quantity >= 2 ? (quantity - 1) * price : price;
			},
			description: 'Lleva 2 y el segundo es gratis'
		},
		MUG: {},
	}
}

export { 
	staticItems,
	initialCartState,
	promotions
}
