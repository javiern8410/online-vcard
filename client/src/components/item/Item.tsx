import React, { FunctionComponent, useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SearchBox from '../search-box/SearchBox';
import BreadCrumb from '../breadcrumb/BreadCrumb';
import { SkeletonItem } from '../../common/skeletons'
import './item.scss';

import { transformPrice, getTranslation } from '../../common/utils'

const Item: FunctionComponent = ({ }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState({});
    const { id } = useParams();
    localStorage.setItem('lastSearch', id);

    const getItemById = async () => {
        try {
            setLoading(true);
            setError(false);

            const response = await axios.get(`api/items/${id}`, {
                headers: {
                    name: 'Javier',
                    lastname: 'Nieve'
                }
            });

            setData(response.data)
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setError(true);
        }
    };

    useEffect(() => {
        if (id) {
            getItemById();
        }
    }, [id]);

    return (
        <>
            <SearchBox />
            <div className="item-container">
                <BreadCrumb links={data.category} />
                <div className="main-content">
                    {error && (
                        <div className="alert danger">
                            Error al obtener los datos
                        </div>
                    )}
                    {loading && <SkeletonItem />}
                    {!loading && Object.keys(data).length > 0 && (
                        <Fragment>
                            <div className="produc">
                                <div>
                                    <img src={data.picture} className="responsive" alt={data.title} />
                                </div>
                                <div>
                                    <h2>
                                        Descripcion del Producto
                                    </h2>
                                    <p>
                                        {data?.description}
                                    </p>
                                </div>

                            </div>
                            <div className="product-data">
                                <div>
                                    <div className="status">
                                        {getTranslation(data?.condition)} {data.sold_quantity > 0 && ` | ${data.sold_quantity}  Vendidos`}
                                    </div>
                                    <div className="title">
                                        {data.title}
                                    </div>
                                    <div className="price">
                                        $ {transformPrice(data.price.amount, data.price.decimals)}
                                    </div>
                                    {data.free_shipping && (
                                        <div className="free-shipping">
                                            Envío Gratis
                                        </div>
                                    )}
                                    <div className="buy-btn">
                                        <button className="btn-primary">
                                            <span>
                                                Comprar
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
        </>
    )
};

export default Item;
