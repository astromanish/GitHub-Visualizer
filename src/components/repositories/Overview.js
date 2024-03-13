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
