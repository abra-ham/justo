const staticItems = {
	0: {
		code: 'TSHIRT',
		name: 'Playera con motivo de Avengers: Endgame',
		description: 'Esta playera se encuentra libre de spoilers.',
	},
	1: {
		code: 'VOUCHER',
		name: 'Voucher de Peppa Pig',
		description: 'Perfecto para tus sobrinos.'
	}, 
	2: {
		code: 'MUG',
		name: 'Taza con motivo Vegetariano',
		description: 'Ahora nadie te invitará por una hamburguesa, bien hecho.'
	}
};

const initialCartState = {
	0: {
		items: [],
		price: 0,
		discount: 0,
		total: 0,
		appliedPromotions: []
	}
}

export { 
	staticItems,
	initialCartState
}
