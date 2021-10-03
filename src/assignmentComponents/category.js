import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Container,Row,Col,Card} from 'react-bootstrap';
import useCommon from '../customHook/useCommon';
import {useToasts} from 'react-toast-notifications';
import {FiEdit} from 'react-icons/fi';
import {AiFillDelete} from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import EditCategory from './editCategory';
import {Link} from 'react-router-dom';


const Category = (props) => {
    const {} = props;
    const {auth} = useCommon();
    const {addToast} = useToasts();
    //state goes here
    let [categoryCredentials,setCredentials] = useState({
        "title":""
    })
    let [categories,setCategories] = useState([]);
    let [currentPage,setCurrentPage] = useState(0);

    //effect goes here
    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"api/category",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setCategories(
                    response.data.data
                )
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

    //handler goes here
    const changeHandler = (e)=>{
        let {name,value} = e.target;
        setCredentials({
            ...categoryCredentials,
            [name]:value
        })    
    }

    const addCategory = (e)=>{
        e.preventDefault();
        axios.post(process.env.REACT_APP_URL+"api/category",categoryCredentials,auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                addToast(response.data.message,{
                    "appearance":'success',
                    "autoDismiss":true
                }) 
                window.location.reload();
            }
            else
            {
                addToast(response.data.message,{
                    "appearance":'error',
                    "autoDismiss":true
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const changePage = ({selected})=>{
        setCurrentPage(
            selected
        )
    }

    const deleteCategory = (e,id)=>{
        axios.delete(process.env.REACT_APP_URL+"api/category/"+id,auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                addToast(response.data.message,{
                    "appearance":'success',
                    "autoDismiss":true
                }) 
                window.location.reload();
            }
            else
            {
                addToast(response.data.message,{
                    "appearance":'error',
                    "autoDismiss":true
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    //variables goes here
    let singlePage = 6;
    let pageVisited = singlePage * currentPage;

    let totalPages = Math.ceil(categories.length / singlePage);
    let content = categories.slice(pageVisited,pageVisited+singlePage);

    return (
        <React.Fragment>
            <Container className="mt-3 mb-3">
                <Row>
                    <Col lg={12}>
                        <h5 style={{color:"black",fontWeight:"bolder"}} className="text-center">  Add Category  </h5>
                        <div style={{width:"60px",height:"4px",backgroundColor:"#4b1cac",margin:"0px auto"}}></div>
                    </Col>
                    <Col lg={4} className="d-none d-md-none d-lg-block"></Col>
                    <Col lg={4}>
                        <form method = "post" className="mt-4" onSubmit={addCategory}>
                            <div className="form-group">
                            
                                <label> Title </label>
                                <input type="text" className="form-control" name="title" value={categoryCredentials.title} placeholder="Title" onChange={(e)=>{changeHandler(e)}}/>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-md w-0 btnDesign mt-3" type="submit" name="submitCategory"> Add Category </button>
                            </div>
                        </form>
                    </Col>
                    <Col lg={4} className="d-none d-md-none d-lg-block"></Col>

                    <Col lg={12} className="mt-5">
                        <h5 style={{color:"black",fontWeight:"bolder"}} className="text-center">  Categories  </h5>
                        <div style={{width:"60px",height:"4px",backgroundColor:"#4b1cac",margin:"0px auto"}}></div>
                        <Row>
                            {
                                categories.length > 0?
                                (
                                    <>
                                        <p style={{fontWeight:"bolder"}}> {categories.length} Categories. </p>
                                        {
                                            content.map((val)=>{
                                                return (
                                                    <Col lg={2}>
                                                    <Card className="cardDesign p-2 mb-5">
                                                        
                                                        <Card.Body>
                                                          <p className="text-center"> <Link to={`/category/${val._id}`}  style={{fontWeight:"bolder",cursor:"pointer",color:"black",textDecoration:"none"}}>{val.title}</Link> </p> 
                                                            <div className="text-center">
                                                                    <button className="btn btn-md m-2" type="button" name="edit" style={{backgroundColor:"green",color:'white'}} data-bs-toggle="modal" data-bs-target={`#edit${val._id}`}> <FiEdit/> </button>
                                                                
                                                                   <button className="btn btn-md m-2" type="button" name="edit" style={{backgroundColor:"red",color:'white'}} onClick={(e)=>{deleteCategory(e,val._id)}}> <AiFillDelete/> </button>
                                                            </div>    
                                                        
                                                        </Card.Body>
                                                    </Card>
                                                        <EditCategory data={val} key={`edit${val._id}`}/>
                                                    </Col>
                                                    
                                                )
                                            })
                                        }
                                        {
                                            totalPages > currentPage + 1?
                                            (
                                                <p> Showing {(currentPage+1) * singlePage} of {categories.length} </p>
                                            ):
                                            (
                                                <p> Showing {categories.length} of {categories.length} </p>
                                            )
                                        }
                                        <ReactPaginate
                                                pageCount = {totalPages}
                                                previousLabel = "Previous"
                                                nextLabel = "Next"
                                                onPageChange = {changePage}
                                                containerClassName={"main"}
                                                previousLinkClassName={"prevStyle"}
                                                nextLinkClassName={"nextStyle"}
                                                disabledClassName={"disableButtons"}
                                                activeClassName={"pageActive"}
                                        />
                                    </>
                                ):
                                (
                                    <p className="text-center" style={{color:"black"}}> No Categories. </p>
                                )
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Category
