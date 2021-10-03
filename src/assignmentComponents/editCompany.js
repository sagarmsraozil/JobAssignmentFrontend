import React,{useState,useEffect} from 'react';
import axios from 'axios';
import useCommon from '../customHook/useCommon'
import {toast} from 'react-toastify';

const EditCompany = (props) => {
    const {data} = props;
    const {auth} = useCommon();

    //state goes here
    let [companyDetails,setCompanyDetails] = useState({
        "title":data.title,
        "image":data.image,
        "description":data.description,
        "status":data.status,
        "categoryId":data.categoryId? data.categoryId._id : data.categoryId,
        "errors":{}
    })
    let [categories,setCategories] = useState([]);

    //effect goes Here
    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"api/category",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setCategories(response.data.data)
            }
            else
            {
                setCategories([])
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])


    const changeHandler = (e)=>{
        let {name,value} = e.target;
        if(value == "")
        {
            value = undefined;
        }
        setCompanyDetails({
            ...companyDetails,
            [name]:value
        })
    }

    const imageHandler = (e)=>{
        let {name,files} = e.target;
        setCompanyDetails({
            ...companyDetails,
            [name]:files[0]
        })
    }

    const editCompany = (e)=>{
        e.preventDefault();
        console.log(companyDetails);
        let fd = new FormData();
        fd.append('title',companyDetails.title);
        fd.append('status',companyDetails.status);
        fd.append('description',companyDetails.description);
        fd.append('image',companyDetails.image);
        fd.append('categoryId',companyDetails.categoryId);

        axios.put(process.env.REACT_APP_URL+"api/company/"+data._id,fd,auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                toast.success(response.data.message);
                window.location.reload();
            }
            else
            {
                setCompanyDetails({
                    ...companyDetails,
                    ['errors']:response.data.error
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    return (
        <React.Fragment>
             <div class="modal fade" id={`editCompany${data._id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Edit {data.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <form method = "post" onSubmit={editCompany}>
                            <div className="form-group mb-2">
                                <label> Title </label>
                                <input type="text" className="form-control" name="title" value={companyDetails.title} placeholder="Title" onChange={(e)=>{changeHandler(e)}}/>
                                {companyDetails['errors']['title']&& (<p> <small style={{color:"red"}}> *{companyDetails['errors']['title']} </small> </p>)}
                            </div>
                            <div className="form-group mb-2">
                                <label> Status </label>
                                <select className="form-select" name='status' onChange={(e)=>{changeHandler(e)}}>
                                    <option value={true} selected = {companyDetails.status == true? true:false}>True</option>
                                    <option value={false} selected = {companyDetails.status == false? true:false}>False</option>
                                </select>
                                
                                {companyDetails['errors']['status']&& (<p> <small style={{color:"red"}}> *{companyDetails['errors']['status']} </small> </p>)}
                            </div>
                            <div className="form-group mb-2">
                                <label> Image </label>
                                <input type="file" className="form-control mb-0" name="image" accept="image/*" onChange={(e)=>{imageHandler(e)}}/>
                                <span style={{color:"grey"}}> <small>*Optional</small> </span>
                            </div>
                            <div className="form-group mb-2">
                                <label> Category </label>
                                <select className="form-select" name='categoryId' onChange={(e)=>{changeHandler(e)}}>
                                    <option value={undefined} selected = {companyDetails.categoryId == undefined? true:false}></option>
                                    {
                                        categories.map((val)=>{
                                            return (
                                                <option value={val._id} selected = {companyDetails.categoryId == val._id? true:false}> {val.title} </option>
                                            )
                                        })
                                    }
                                </select>
                                <span style={{color:"grey"}}> <small>*Optional</small> </span>
                                
                            </div>
                            <div className="form-group mb-2">
                                <label> Description </label>
                                <textarea className="form-control" name="description" placeholder="Description Here" onChange={(e)=>{changeHandler(e)}}>{companyDetails.description}</textarea>
                                <span style={{color:"grey"}}> <small>*Optional</small> </span>
                                
                            </div>
                            {companyDetails['errors']['random']&& (<p className="text-center"> <small style={{color:"red"}}> *{companyDetails['errors']['random']} </small> </p>)}
                            <div className="text-center">
                                <button className="btn btn-md w-0 btnDesign mt-3" type="submit" name="submitCompany"> Edit Company </button>
                            </div>
                        </form>
                    </div>
                    </div>
                    </div>
                    </div> 
        </React.Fragment>
    )
}

export default EditCompany
