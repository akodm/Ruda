import React, { userState } from 'react';
import Header from './header';
import Footer from './footer';

const Root = (props) => (
    <div className="root-main">
        <Header />         
        <div className="root-mainDiv">
            {props.main}
        </div>
        <Footer />
    </div>
);

export default Root;