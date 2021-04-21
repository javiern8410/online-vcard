import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import './home.scss';

const Home: FunctionComponent = () => {

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="section-header">
                    <h1>GECI Group - Employee System</h1>
                </div>
                <div className="main-content">
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem odit fuga, illo in blanditiis dolorum debitis quidem ea dicta voluptates odio eligendi doloremque minima architecto quia nemo deleniti at perspiciatis.
                    </p>
                    <br/>
                    <Link to="/admin">
                        <button>Admin</button>
                    </Link>
                </div>
            </div>
        </>
    )
};

export default Home;
