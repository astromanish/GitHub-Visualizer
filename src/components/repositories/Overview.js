import React, {useEffect} from 'react'
import axios from 'axios';


export default function Overview(props) {
    useEffect(() => {
        axios.get(`https://api.github.com/repos/${props.data.match.params.profile_id}/${props.data.match.params.repo_name}/`, {
            headers: {
                authorization: `Bearer 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`
            }
        })
            .then(res => {
                console.log('repo overview');
                console.log(res);
            })
            .catch(err => console.log(err));
    }, [])
  return (
    <div>Overview</div>
  )
}
