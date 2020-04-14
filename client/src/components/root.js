import React, { userState } from 'react';
import Header from './layout/header';
import Footer from './layout/footer';

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