import React from 'react'

import CommitList from './contributions';
import Footer from '../Footer';

const MoreRepoDetails = (props) => {
    return (
        <>
        <CommitList data={props} />
        <Footer />
        </>
    );
}

export default MoreRepoDetails;