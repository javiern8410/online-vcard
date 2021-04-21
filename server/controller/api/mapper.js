module.exports.mapData = (data, headers) => {
	if (data) {
        let response = {};
        response.author = {
            name: headers.name,
            lastname: headers.lastname
        };
        let categoriesPath = data.filters.filter(el => el.id === 'category');
        response.categories = categoriesPath[0]?.values[0]?.path_from_root;
		response.items = data.results.map(item => {
			return {
				id: item.id,
				title: item.title,
				price: {
                    currency: item.currency_id,
                    amount: item.price,
                    decimals: 2
                },
                picture: item.thumbnail,
                state_name: item.address.state_name,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping
			};
        });
		return response;
	}
	return {};
};

module.exports.mapItem = (data, headers) => {
	if (data) {
        let response = {};
        response.author = {
            name: headers.name,
            lastname: headers.lastname
        };
        response.id = data.id;
        response.title = data.title;
        response.price = {
            currency: data.currency_id,
            amount: data.price,
            decimals: 2
        };
        response.category = data.category
        response.picture = data.thumbnail;
        response.sold_quantity = data.sold_quantity;
        response.condition = data.condition;
        response.free_shipping = data.shipping.free_shipping;
        response.description = data.description;
		return response;
	}
	return {};
};