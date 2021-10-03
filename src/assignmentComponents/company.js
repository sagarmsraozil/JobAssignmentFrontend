import React,{useState,useEffect} from 'react';
import {Container,Row,Col,Card} from 'react-bootstrap';
import useCommon from '../customHook/useCommon'
import axios from 'axios';
import {useToasts} from 'react-toast-notifications';
import ReactPaginate from 'react-paginate';
import {FiEdit} from 'react-icons/fi';
import {AiFillDelete} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.jpg';
import EditCompany from './editCompany';


const Company = (props) => {
    const {} = props;
    const {auth} = useCommon();
    const {addToast} = useToasts();

    //state goes here
    let [companyDetails,setCompanyDetails] = useState({
        "title":"",
        "status":true,
        "description":undefined,
        "image":undefined,
        "categoryId":undefined,
        'errors':{}
    })
    let [categories,setCategories] = useState([]);
    let [companies,setCompanies] = useState([]);
    let [currentPage,setCurrentPage] = useState(0);

    //effect goes here
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

    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"api/company",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setCompanies(response.data.data)
            }
            else
            {
                setCompanies([])
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])


    //handler goes here
    const changeHandler = (e)=>{
        let {name,value} = e.target;
       
        if(value === "")
        {
            value = undefined
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

    const addCompany = (e)=>{
        e.preventDefault();

        let fd = new FormData();
        fd.append('title',companyDetails.title);
        fd.append('status',companyDetails.status);
        fd.append('description',companyDetails.description);
        fd.append('image',companyDetails.image);
        fd.append('categoryId',companyDetails.categoryId);

        axios.post(process.env.REACT_APP_URL+"api/company",fd,auth.config)
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

    const changePage  = ({selected})=>{
        setCurrentPage(
            selected
        )
    }

    const deleteCompany = (e,id)=>{
        axios.delete(process.env.REACT_APP_URL+"api/company/"+id,auth.config)
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
    let singlePage = 4;
    let pageVisited = singlePage * currentPage;
    let totalPages = Math.ceil(companies.length / singlePage);
    let content = companies.slice(pageVisited, pageVisited+singlePage);
    
    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col lg={12} className="mt-3 mb-3">
                        <h5 style={{color:"black",fontWeight:"bolder"}} className="text-center">  Add Company  </h5>
                        <div style={{width:"60px",height:"4px",backgroundColor:"#4b1cac",margin:"0px auto"}}></div>
                    </Col>

                    <Col lg={4} className="d-none d-md-none d-lg-block"></Col>
                    <Col lg={4}>
                        <form method = "post" onSubmit={addCompany}>
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
                                <button className="btn btn-md w-0 btnDesign mt-3" type="submit" name="submitCompany"> Add Company </button>
                            </div>
                        </form>
                    </Col>
                    <Col lg={4} className="d-none d-md-none d-lg-block"></Col>

                    <Col lg={12} className="mt-5">
                        <h5 style={{color:"black",fontWeight:"bolder"}} className="text-center">  Companies  </h5>
                        <div style={{width:"60px",height:"4px",backgroundColor:"#4b1cac",margin:"0px auto"}}></div>
                        <Row>
                            {
                                companies.length > 0?
                                (
                                    <>
                                        <p style={{fontWeight:"bolder"}}> {companies.length} Categories. </p>
                                        {
                                            content.map((val)=>{
                                                return (
                                                    <Col lg={3}>
                                                    <Card className="cardDesign p-2 mb-5" style={{height:"450px"}}>
                                                        <div className="imgBlock">
                                                            {
                                                                val.image == "no-img.jpg"?
                                                                (
                                                                    <img src ={logo} className="d-block" alt="image"/>
                                                                ):
                                                                (
                                                                    <img src ={`${process.env.REACT_APP_URL}${val.image}`} className="d-block" alt="image"/>
                                                                )
                                                            }
                                                        </div>
                                                        <Card.Body>
                                                          <p className="text-center"> <Link to={`/company/${val._id}`}  style={{fontWeight:"bolder",cursor:"pointer",color:"black",textDecoration:"none"}}>{val.title}</Link> </p> 
                                                          <p> <strong> Status: </strong> {val.status == true? <>True</>:<>False</>}  </p>
                                                          {
                                                              val.categoryId&&
                                                              (
                                                                <p> <strong> Category: </strong> {val.categoryId.title}  </p>
                                                              )
                                                          }
                                                          {
                                                              val.description&&
                                                              (
                                                                <p> <strong> Desription: </strong> {val.description}  </p>
                                                              )
                                                          }
                                                            <div className="text-center">
                                                                    <button className="btn btn-md m-2" type="button" name="edit" style={{backgroundColor:"green",color:'white'}} data-bs-toggle="modal" data-bs-target={`#editCompany${val._id}`}> <FiEdit/> </button>
                                                                
                                                                   <button className="btn btn-md m-2" type="button" name="edit" style={{backgroundColor:"red",color:'white'}} onClick={(e)=>{deleteCompany(e,val._id)}}> <AiFillDelete/> </button>
                                                            </div>    
                                                        
                                                        </Card.Body>
                                                    </Card>
                                                     <EditCompany data={val} key={`editCompany${val._id}`}/>
                                                    </Col>
                                                    
                                                )
                                            })
                                        }
                                        {
                                            totalPages > currentPage + 1?
                                            (
                                                <p> Showing {(currentPage+1) * singlePage} of {companies.length} </p>
                                            ):
                                            (
                                                <p> Showing {companies.length} of {companies.length} </p>
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
                                    <p className="text-center" style={{color:"black"}}> No Companies. </p>
                                )
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Company
