import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import './item-row.scss';

import { transformPrice } from '../../common/utils'

const ItemRow:FunctionComponent<any> = ({data}) => (
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
        <div className="city">
            {data?.state_name}
        </div>
    </div>
);

export default ItemRow;
