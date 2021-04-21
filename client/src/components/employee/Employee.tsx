import React, { FunctionComponent, useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { useParams } from 'react-router-dom';
import { EmployeeSkeleton } from '../../common/skeletons';
import './employee.scss';

import { Icon } from 'semantic-ui-react';

const vcardText = "BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3ADoe%3BJohn%0AFN%3AJohn%20Doe%0ATITLE%3A08002221111%0AORG%3AStackflowover%0AEMAIL%3BTYPE%3DINTERNET%3Ajohndoe%40gmail.com%0AEND%3AVCARD";

var  testCard= {
    version: '3.0',
    lastName: 'Нижинский',
    middleName: 'D',
    firstName: 'Костя',
    nameSuffix: 'JR',
    namePrefix: 'MR',
    nickname: 'Test User',
    gender: 'M',
    organization: 'ACME Corporation',
    workPhone: '312-555-1212444',
    homePhone: '312-555-1313333',
    cellPhone: '312-555-1414111',
    pagerPhone: '312-555-1515222',
    homeFax: '312-555-1616',
    workFax: '312-555-1717',
    birthday: "20140112",
    anniversary: "20140112",
    title: 'Crash Test Dummy',
    role: 'Crash Testing',
    email: 'john.doe@testmail',
    workEmail: 'john.doe@workmail',
    url: 'http://johndoe',
    workUrl: 'http://acemecompany/johndoe',
    homeAddress: {
        label: 'Home Address',
        street: '123 Main Street',
        city: 'Chicago',
        stateProvince: 'IL',
        postalCode: '12345',
        countryRegion: 'United States of America'
    },

    workAddress: {
        label: 'Work Address',
        street: '123 Corporate Loop\nSuite 500',
        city: 'Los Angeles',
        stateProvince: 'CA',
        postalCode: '54321',
        countryRegion: 'California Republic'
    },

    source: 'http://sourceurl',
    note: 'dddddd',
    socialUrls: {
        facebook: 'johndoe',
        linkedIn: 'johndoe',
        twitter: 'johndoe',
        flickr: 'johndoe',
        skype:"test_skype",
        custom: 'johndoe'
    }
};

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


const Employee: FunctionComponent<any> = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<employee>({});
    const { id } = useParams();

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
                        {/* <EmployeeSkeleton /> */}
                        loading
                    </div>
                    )
                }
                {!loading && Object.keys(data).length > 0 && (
                    <>
                        <div className="main-content">
                            <div className="avatar">
                                <div className="logoBg"></div>
                                <div className="shortcutsBg">
                                    <div className="shortcuts">
                                        <a href={`tel:+${data.mobile}`}>
                                            <Icon name='phone' flipped='horizontally' size='large' />{' '}
                                        </a>
                                        <a href={`mailto:${data.email}`}>
                                            <Icon name='send' size='large' />
                                        </a>
                                    </div>
                                </div>
                                <div className="user-info">
                                    <div>
                                        <img src={`static/images/employees/${data.photo ? data.photo : 'user2.png'}`} className="user" alt={data.firstName} />
                                    </div>
                                    <div>
                                        <h2 className="name">
                                            {data.firstName} {data.lastName}
                                        </h2>
                                    </div>
                                    <div>
                                        { data.position }
                                    </div>
                                </div>
                            </div>
                            <div className="employee-data">
                                <div></div>
                                <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore amet sunt ratione iusto commodi repudiandae eum necessitatibus?</div>
                                <div>
                                    <Icon name='phone' flipped='horizontally' size='large' />
                                </div>
                                <div> 
                                    <h3>
                                        {data.mobile}
                                    </h3>
                                    <span>Mobile</span>
                                </div>
                                <div></div>
                                <div>
                                    <h3>
                                        {data.telephone}
                                    </h3>
                                    <span>Telephone</span>
                                </div>
                                <div>
                                    <Icon name='send' size='large' />
                                </div>
                                <div> {data?.email}</div>
                                <div>
                                    <Icon name='building' size='large' />
                                </div>
                                <div>
                                    <h3>GECI GROUP</h3>
                                    <span>{ data.position }</span>
                                </div>
                                <div><Icon name='world' size='large' /></div>
                                <div>
                                    <h3>https://geciweb.com</h3>
                                    <span>Website</span>
                                </div>
                            </div>
                            <div className="footer">
                                <div className="footer-txt">asasdasd</div>
                                <div className="qr">
                                    <QRCode value={window.location.href} size={120} level={'M'} includeMargin={true} className="qrcode" />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
};

export default Employee;
