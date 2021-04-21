import React, { FunctionComponent, useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { EmployeeSkeleton } from '../../common/skeletons'

import { Button, Icon } from 'semantic-ui-react'


export interface employee {
    firstName: string;
    lastName: string;
    email: string;
    phone: {
        _id: string;
        phoneType: string;
        number: string;
      }[]
    id: string;
}


const Employee: FunctionComponent<any> = ({id}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<employee>({});

    const getEmployee = async () => {
        try {
            setLoading(true);
            setError(false);

            const response = await axios.get(`api/employees/${id}`);

            setData(response.data)
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setError(true);
        }
    };

    useEffect(() => {
        if (id) {
            getEmployee();
        }
    }, [id]);

    return (
        <>
            <div className="employee-container">
                {loading && (
                    <div className="loagind-wrapper">
                        { <EmployeeSkeleton /> }
                    </div>
                    )
                }
                {!loading && Object.keys(data).length > 0 && (
                    <>
                        <div className="main-content">
                                <Fragment>
                                    <div className="avatar">
                                        <div>
                                            <img src="static/images/user2.png" className="responsive" alt={data.firstName} />
                                        </div>
                                        <div style={{marginTop: '-15px'}}>
                                            <Icon name='phone square' size='big' color='blue' />{' '}
                                            <Icon name='mail square' size='big' color='blue' />{' '}
                                        </div>
                                    </div>
                                    <div>
                                        <Button primary>Click Here</Button> {' '}
                                        <p className="name">
                                            {data.firstName} {data.lastName}
                                        </p>
                                    </div>
                                    <div className="employee-data">
                                        <div>Email</div>
                                        <div> {data?.email}</div>
                                        {data?.phone && data.phone.map((phone, index) => (
                                            <Fragment key={index}>
                                                <div>Phone</div>
                                                <div className="status">
                                                    {phone.phoneType} - {phone.number}
                                                </div>
                                            </Fragment>    
                                        ))}
                                    </div>
                                </Fragment>
                        </div>
                    </>
                )}
            </div>
        </>
    )
};

export default Employee;
