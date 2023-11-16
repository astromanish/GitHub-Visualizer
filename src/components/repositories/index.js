import React from 'react'

import Overview from './Overview'
import CommitList from './contributions';
import Footer from '../Footer';

const Repository = (props) => {
    return (
        <>
        <Overview data={props}/>
        <CommitList data={props} />
        <Footer />
        </>
    );
}

export default Repository;