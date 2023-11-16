import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Search() {
    const [name, setUsername] = useState({
        userName: ''
    });

    const changeUsername = (e) => {
        setUsername({userName: e.target.value})
    }

    return (
        <>
            <div className="cntnr">
                <h2 className="main-heading display-4"><img height="52" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/github.svg" /></h2>
                <form>
                    <div className="form-group">
                        <input type="text" value={name.userName} onChange={changeUsername} placeholder="Enter Username" className="form-control"/>
                    </div>
                    <div  className="text-center">
                        <Link to={'/' + name.userName} className="text-light"><button className="btn btn-dark"> Lets Go!  </button> </Link>
                    </div>
                </form>
            </div>
        </>

    )
}

export default Search