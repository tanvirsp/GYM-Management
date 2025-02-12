import ReactPaginate from "react-paginate";
import { IoSearchOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TableSkeleton from "../../skeletons/TableSkeleton";
import Empty from "../Empty";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { DeleteAlert } from "../../helper/DeleteAlert";
import toast from "react-hot-toast";
import FullScreenLoader from "../../layout/FullScreenLoader";
import TrainerStore from "../../store/TrainerStore";
import { GrView } from "react-icons/gr";




const TrainerList = () => {
    const {TrainerListRequest, TrainerList, TrainerTotal, DeleteTrainerRequest, TrainerLoading} = TrainerStore();
    const [perPage, setPerPage]= useState(20);
    const  [pageNumber, setPageNumber] = useState(1);
    const [searchKeyword,setSearchKeyword]=useState("0");
    

    


    useEffect(()=>{
        (async()=>{
           await TrainerListRequest(1, perPage, searchKeyword);
        })()
    } ,[])



    
    if(TrainerLoading=== null){
        return <FullScreenLoader />
    }


  

    const handleDelete = async(id)=>{
        const result = await DeleteAlert();
        if(result.isConfirmed){
            const deleteResult= await DeleteTrainerRequest(id);
            if(deleteResult.status ==="success"){
                toast.success("This Package delete successfully")
                await TrainerListRequest(1, perPage,searchKeyword);

            }else if(deleteResult.status ==="associate"){
                toast.error("This Package is associated with member")

            } else {
                toast.error("Something went wrong!!")
            }


           
        }

    }



  
    const handlePageClick = async (event) => {

        setPageNumber(event.selected + 1);
        await TrainerListRequest(event.selected + 1, perPage, searchKeyword)
        
    };


    const perPageOnChange=async (e) => {
        setPerPage(parseInt(e.target.value));
        setPageNumber(1)
        await TrainerListRequest(1, parseInt(e.target.value), searchKeyword)
    };



    const searchKeywordOnChange=async (e) => {
        setSearchKeyword(e.target.value)
        if ((e.target.value).length === 0) {
            setSearchKeyword("0")
            await TrainerListRequest(1, perPage, "0")
        }
    };

    const searchData=async (e) => {
        e.preventDefault();
        await TrainerListRequest(1, perPage, searchKeyword)
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
                    <h5>Total Package: {TrainerTotal}</h5>
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
                        <th>Trainer Name</th>
                        <th>Avater</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Working Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        TrainerList === null ? <TableSkeleton colSpan="5" /> : 
                        TrainerList.length === 0 ? <tr><td  colSpan = "5"> <Empty title={"Service"} /> </td></tr> : 
                        TrainerList.map( (item, index) =>{
                            return (
                                <tr key={index}>
                                    <td className="text-center"> { ((pageNumber - 1) * perPage) + (index+1)}</td>
                                    <td >
                                        <p>{item.name}</p>
                                        <small>Trainer ID: {item.trainerID}</small>
                                    </td>
                                    <td >
                                        <img src={`${import.meta.env.VITE_URL}/${item?.imgUrl}`} alt="Avatar" width="80px"  crossOrigin ="anonymous" />
                                    </td>
                                    <td>{item.phone}</td>
                                    <td>
                                        {item.status == 1? <p className="action-edit-button d-inline p-2" >Active</p>: <p className="d-inline p-2 action-delete-button">Suspend</p> }
                                        </td>
                                    <td>
                                        <Link to={`/update-trainer/${item._id}`}  className="action-edit-button"> <AiOutlineEdit /> </Link>
                                        <Link onClick={()=>handleDelete(item._id)} className="action-view-button" > <GrView /> </Link>
                                    </td>

                                </tr> 
                            )
                        } )
                    }
                </tbody>


            </Table>
            {
                TrainerTotal > 20 &&
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
                            pageCount={TrainerTotal/perPage}
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

export default TrainerList;