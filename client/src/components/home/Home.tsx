import React, { FunctionComponent, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBox from '../search-box/SearchBox';
import BreadCrumb from '../breadcrumb/BreadCrumb';
import { SkeletonRow } from '../../common/skeletons'
import { transformPrice } from '../../common/utils'
import './home.scss';

const Home: FunctionComponent = () => {
    const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
    const [lastItem, setLastItem] = useState(null);
    const lastSearch = localStorage.getItem('lastSearch');

    const IsLastSearch = () => {
        return (
            <div className="section-header"><h1>Basado en tu última visita</h1></div>
        )
    };

    const getItemById = async () => {
		try {
			setLoading(true);
			setError(false);
			
			const response = await axios.get(`api/items/${lastSearch}`, {
                headers: {
                  name: 'Javier',
                  lastname: 'Nieve'
                }
            });
		  
			setLastItem(response.data);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			setError(true);
		}
	};

    useEffect(()=> {
        if(lastSearch) {
            getItemById();
        }
    }, []);

    const RenderLastSearch: FunctionComponent = ({data}) => {
        return (
            <div className="item">
                <div className="thumbnail">
                    <Link to={`/items/${data.id}`}>
                        <img src={data.picture} width="180px" alt={data.title} title={data.title} />
                    </Link>
                </div>
                <div className="item-details">
                    <div className="price">
                        $ {transformPrice(data.price.amount, data.price.decimals)}
                    </div>
                    <div className="description">
                        <Link to={`/items/${data.id}`}>
                            {data.title}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <SearchBox />
            {lastSearch && (
                <div className="container">
                    <BreadCrumb />
                    <IsLastSearch />
                    <div className="main-content">
                        {error && (
                            <div className="alert danger">
                                Error al obtener los datos
                            </div>
                        )}
                        {loading && <SkeletonRow />}
                        {!loading && lastItem && <RenderLastSearch data={lastItem} />}
                    </div>
                </div>
            )}
        </>
    )
};

export default Home;
