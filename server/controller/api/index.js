const express = require('express');
const axios = require('axios');
const router = express.Router();
const mapper = require('./mapper');
module.exports = router;

router.get('/items', async (req, res) => {
    const { q } = req.query;

	try {
		const response = (await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}`)).data;
		response.results.splice(4);
		
		res.send(mapper.mapData(response, req.headers));
	} catch (err) {
		console.log(err);
		res.status(500).send({error: err.message});
	}
});

router.get('/items/:id', async (req, res) => {
    const { id } = req.params;

	try {
        const response = (await axios.get(`https://api.mercadolibre.com/items/${id}`)).data;
		const description = (await axios.get(`https://api.mercadolibre.com/items/${id}/description`)).data;
		const category = (await axios.get(`https://api.mercadolibre.com/categories/${response.category_id}`)).data;

		response.description = description.plain_text;
		response.category = category.path_from_root;

		res.send(mapper.mapItem(response, req.headers));
	} catch (err) {
		console.log(err);
		res.status(500).send({error: err.message});
	}
});