import React,{useState,useEffect} from 'react'
import axios from 'axios';
import useCommon  from '../customHook/useCommon';

const SingleCategory = (props) => {
    const {} = props;
    const {auth} = useCommon();
    let [data,setData] = useState({});
    
    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"api/category/"+props.match.params.id,auth.config)
        .then((response)=>{
            console.log(response);
            if(response.data.success == true)
            {
                setData(
                    response.data.data
                )
            }
            else
            {
                setData(
                    {}
                )
            }
        })
    })

    return (
        <React.Fragment>
            {
                data&&(
                    <>
                    <p className="text-center" style={{fontWeight:'bolder',fontSize:"32px"}}> {data.title} </p>
                    <p className="text-center"> <strong> Added At: </strong> {data.created_at}  </p>
                    <p className="text-center"> <strong> Updated At: </strong> {data.updated_at}  </p>
                   </>
                )
            }
        </React.Fragment>
    )
}

export default SingleCategory
