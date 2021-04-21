import React, { FunctionComponent, Fragment } from 'react';

export const SkeletonRow: FunctionComponent = () => {
    return (
        <div className="skeleton-grid-1">
            <div>
                <div className="skeleton-line -square-180"></div>
            </div>
            <div>
                <div className="listed-data data-horizontal-block">
                    <span className="label skeleton-line -line-50 -small"></span>
                    <span className="content skeleton-line -line-75 -small"></span>
                </div>
                <div className="listed-data data-horizontal-block">
                    <span className="label skeleton-line -line-50 -small"></span>
                    <span className="content skeleton-line -line-75 -small"></span>
                </div>
            </div>
        </div>
    );
}

export const SkeletonItem: FunctionComponent = () => {
    return (
        <Fragment>
            <div style={{marginLeft: '30px'}}>
                <div className="skeleton-line -square-500"></div>
                <div className="listed-data data-horizontal-block">
                    <span className="label skeleton-line -line-50 -small"></span>
                    <span className="content skeleton-line -line-75 -big"></span>
                    <span className="content skeleton-line -line-75 -big"></span>
                    <span className="content skeleton-line -line-75 -very-big"></span>
                </div>
            </div>
            <div>
                <div className="listed-data data-horizontal-block">
                    <span className="label skeleton-line -line-50 -small"></span>
                    <span className="content skeleton-line -line-75 -small"></span>
                </div>
                <div className="listed-data data-horizontal-block">
                    <span className="content skeleton-line -line-75 -small"></span>
                    <span className="content skeleton-line -line-100 -small"></span>
                    <span className="content skeleton-line -line-100-36 -big"></span>
                </div>
                <div className="listed-data data-horizontal-block">
                    <span className="content skeleton-line -line-100 -small"></span>
                    <span className="content skeleton-line -line-100 -small"></span>
                    <span className="content skeleton-line -line-100 -small"></span>
                    <span className="content skeleton-line -line-100-36 -big"></span>
                </div>
            </div>
        </Fragment>
    );
}