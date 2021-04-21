import React, { FunctionComponent } from 'react';
import './breadcrumb.scss';

export interface BreadCrumbProps {
	links?: [];
}

const BreadCrumb: FunctionComponent<BreadCrumbProps> = ({ links }) => (
    <div className="breadcrumb">
        <ul>
            {links && links.length > 0 && links.map((link, index) => {
                return (
                    <li key={index}>{link.name}</li>
                )
            })}
        </ul>
    </div>
);

export default BreadCrumb;
