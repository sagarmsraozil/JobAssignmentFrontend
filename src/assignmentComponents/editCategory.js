import React,{useState} from 'react'
import axios from 'axios';
import useCommon from '../customHook/useCommon';
import {toast} from 'react-toastify'


const EditCategory = (props) => {
    const {data} = props;
    const {auth} = useCommon();
    
    let[category,setCategory] = useState({
        "title":data.title
    })

    const changeHandler = (e)=>{
        let {name,value} = e.target;
        setCategory({
            ...category,
            [name]:value
        })    
    }

    const editCategory = (e)=>{
        e.preventDefault();

        axios.put(process.env.REACT_APP_URL+"api/category/"+data._id,category,auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
               toast.success(response.data.message);
                window.location.reload();
            }
            else
            {
               toast.error(response.data.message);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <React.Fragment>
               <div class="modal fade" id={`edit${data._id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Edit {data.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <form method = "post" onSubmit={editCategory}>
                            <div className="form-group">
                            
                                <label> Title </label>
                                <input type="text" className="form-control" name="title" value={category.title} placeholder="Title" onChange={(e)=>{changeHandler(e)}}/>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-md w-0 btnDesign mt-3" type="submit" name="submitCategory"> Edit Category </button>
                            </div>
                        </form>
                    </div>
                    </div>
                    </div>
                    </div> 
        </React.Fragment>
    )
}

export default EditCategory
