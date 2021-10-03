import React,{useState,useEffect} from 'react';
import axios from 'axios';
import useCommon from '../customHook/useCommon';

const SingleCompany = (props) => {
    const {} = props;
    const {auth} = useCommon();

    let [singleCompany,setSingleCompany] = useState({});

    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"api/company/"+props.match.params.id,auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setSingleCompany(response.data.data);
            }
            else
            {
                setSingleCompany({});
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    return (
        <React.Fragment>
            {
                singleCompany&&
                (
                    <>
                    <p className="text-center" style={{fontWeight:'bolder',fontSize:"32px"}}> {singleCompany.title} </p>
                    <p className="text-center"> <strong> Added At: </strong> {singleCompany.created_at}  </p>
                    <p className="text-center"> <strong> Updated At: </strong> {singleCompany.updated_at}  </p>
                   </>
                )
            }
        </React.Fragment>
    )
}

export default SingleCompany
