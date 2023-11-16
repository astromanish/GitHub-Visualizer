import React from 'react'
import CommitList from './contributions';
import Footer from './SearchPage/SearchPageFooter';


const MoreRepoDetails = (props) => {
    //console.log(props);
    return (
        <>
        <CommitList data={props} />
        <Footer />
        </>
    );
}

export default MoreRepoDetails;