import ReactPaginate from "react-paginate";
import { IoSearchOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TableSkeleton from "../../skeletons/TableSkeleton";
import Empty from "../Empty";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { DeleteAlert } from "../../helper/DeleteAlert";
import toast from "react-hot-toast";
import FullScreenLoader from "../../layout/FullScreenLoader";
import ServiceStore from "../../store/ServiceStore";




const ServiceList = () => {
    const {ServiceListRequest, ServiceList, ServiceTotal, DeleteServiceRequest, ServiceLoading} = ServiceStore();
    const [perPage, setPerPage]= useState(20);
    const  [pageNumber, setPageNumber] = useState(1);
    const [searchKeyword,setSearchKeyword]=useState("0");
    


    useEffect(()=>{
        (async()=>{
           await ServiceListRequest(1, perPage, searchKeyword);
        })()
    } ,[])



    
    if(ServiceLoading=== null){
        return <FullScreenLoader />
    }


  

    const handleDelete = async(id)=>{
        const result = await DeleteAlert();
        if(result.isConfirmed){
            const deleteResult= await DeleteServiceRequest(id);
            if(deleteResult.status ==="success"){
                toast.success("This Package delete successfully")
                await ServiceListRequest(1, perPage,searchKeyword);

            }else if(deleteResult.status ==="associate"){
                toast.error("This Package is associated with member")

            } else {
                toast.error("Something went wrong!!")
            }


           
        }

    }



  
    const handlePageClick = async (event) => {

        setPageNumber(event.selected + 1);
        await ServiceListRequest(event.selected + 1, perPage, searchKeyword)
        
    };


    const perPageOnChange=async (e) => {
        setPerPage(parseInt(e.target.value));
        setPageNumber(1)
        await ServiceListRequest(1, parseInt(e.target.value), searchKeyword)
    };



    const searchKeywordOnChange=async (e) => {
        setSearchKeyword(e.target.value)
        if ((e.target.value).length === 0) {
            setSearchKeyword("0")
            await ServiceListRequest(1, perPage, "0")
        }
    };

    const searchData=async (e) => {
        e.preventDefault();
        await ServiceListRequest(1, perPage, searchKeyword)
    }


    const textSearch = (e) => {
        const rows = document.querySelectorAll('tbody tr')
        rows.forEach(row => {
            row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
        })
    };


   



    return (
       <>
        <section className=" list-bar">
            <div className="row">
                <div className="col-md-4">
                    <h5>Total Service: {ServiceTotal}</h5>
                </div>
                <div className="col-2">
                    <input onKeyUp={textSearch} placeholder="Text Filter" className="form-control"/>
                </div>
                <div className="col-2">
                    <select onChange={perPageOnChange}  className="form-control  form-select" >
                        <option value="20">20 Per Page</option>
                        <option value="30">30 Per Page</option>
                        <option value="50">50 Per Page</option>
                        <option value="100">100 Per Page</option>
                        <option value="100">200 Per Page</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <form onSubmit = {searchData }className='search-form'>
                            <input onChange={searchKeywordOnChange}  className='form-control' required type="text" name="search" placeholder='Enter Your Phone' />
                            <button> <IoSearchOutline /> </button>
                    </form>
                </div>
            </div>
        </section>

        <section className="bg-white p-3 rounded-3 mt-3 ">
            <Table striped  className="align-middle" >
                <thead >
                    <tr >
                        <th className="text-center">Sl</th>
                        <th>Package Name</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ServiceList === null ? <TableSkeleton colSpan="5" /> : 
                        ServiceList.length === 0 ? <tr><td  colSpan = "5"> <Empty title={"Service"} /> </td></tr> : 
                        ServiceList.map( (item, index) =>{
                            return (
                                <tr key={index}>
                                    <td className="text-center"> { ((pageNumber - 1) * perPage) + (index+1)}</td>
                                    <td >{item.name}</td>
                                    <td >
                                        <img src={`${import.meta.env.VITE_URL}/${item?.imgUrl}`} alt="Avatar" width="80px"  crossOrigin ="anonymous" />
                                    </td>
                                    <td>{item.price}</td>
                                    <td>{item.duration}</td>
                                    <td>
                                        <Link to={`/update-service/${item._id}`}  className="action-edit-button"> <AiOutlineEdit /> </Link>
                                        <Link onClick={()=>handleDelete(item._id)}  className="action-delete-button" > <MdOutlineDeleteForever /> </Link>
                                    </td>

                                </tr> 
                            )
                        } )
                    }
                </tbody>


            </Table>
            {
                ServiceTotal > 20 &&
                <div className="mt-2 d-flex justify-content-between">
                    <nav >
                        <ReactPaginate
                            previousLabel="<"
                            nextLabel=">"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            pageCount={ServiceTotal/perPage}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </nav>
                   
                </div>
            }
            
           

        </section>
       
       </>
    );
};

export default ServiceList;