import React from 'react'
import '../../../styles/Commit.css'

const Commit = (props) => {
    const satile1 = {
        backgroundColor: `rgba(0, 255, 0,${(props.dydata.commit) / 5})`,
    }
    const satile2 = {
        backgroundColor: "#eee"
    }
    return (
        <div style={props.dydata.commit ? satile1 : satile2} className="commit">
        </div>
    );
}

export default Commit;