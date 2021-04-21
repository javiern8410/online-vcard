import React, { FunctionComponent, useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import SearchBox from '../search-box/SearchBox';
import BreadCrumb from '../breadcrumb/BreadCrumb';
import { SkeletonRow } from '../../common/skeletons'
import ItemRow from '../item-row/ItemRow';
import './items.scss';

const Items: FunctionComponent = ({ }) => {
	const searchParams = new URLSearchParams(window.location.search);
	const search = searchParams.get('search');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [data, setData] = useState({});

	const getSearch = async () => {

		try {
			setLoading(true);
			setError(false);

			const response = await axios.get(`api/items?q=${search}`, {
				headers: {
					name: 'Javier',
					lastname: 'Nieve'
				}
			});

			setData(response.data);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			setError(true);
		}
	};

	useEffect(() => {
		if (search) {
			getSearch();
		}
	}, [search]);

	return (
		<>
			<SearchBox query={search} />
			<div className="container">
				<BreadCrumb links={data.categories} />
				<div className="main-content">
					{error && (
						<div className="alert danger">
							Error al obtener los datos
						</div>
					)}
					{loading ? (
						<Fragment>
							{ Array(3).fill(0).map((line, index) => <SkeletonRow key={index} />)}
						</Fragment>
					) : (
							<Fragment>
								{!loading && data?.items && data.items.map((item, index) => (
									<ItemRow data={item} key={index} />
								))}
							</Fragment>
						)
					}
				</div>
			</div>
		</>
	)
};

export default Items;
