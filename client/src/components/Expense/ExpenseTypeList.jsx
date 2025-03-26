import { Table } from "react-bootstrap";
import ExpenseTypeStore from "../../store/ExpenseTypeStore";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Empty from "../Empty";
import TableSkeleton from "../../skeletons/TableSkeleton";
import { Link } from "react-router-dom";

import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import toast from "react-hot-toast";



const ExpenseTypeList = () => {

    const {ExpenseTypeTotal, ExpenseTypeList, ExpenseTypeListRequest, UpdateExpenseType  } = ExpenseTypeStore();

    const [perPage, setPerPage]= useState(20);
    const  [pageNumber, setPageNumber] = useState(1);
    const [searchKeyword,setSearchKeyword]=useState("0");


  const [editRowId, setEditRowId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", slug: "" });

    

    useEffect(()=>{
        (async()=>{
            await ExpenseTypeListRequest(1, perPage, searchKeyword);
        })()
    } ,[])



      // Enable editing mode
    const handleEdit = async(id, name, slug) => {
        setEditRowId(id);
        setEditValues({ name, slug });
    };

    const handleSave = async(id)=>{
        const result = await UpdateExpenseType(id, editValues);
        if(result.status ==="success"){
            setEditRowId(null)
            toast.success("Updated Successfully");

            await ExpenseTypeListRequest(1, 20, "0");

        }else {
            toast.error("Somthing went wrong")
        }
        

    }


      // Handle input change
    const handleChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
    };
        

    const searchData=async (e) => {
        e.preventDefault();
        await ExpenseTypeListRequest(1, perPage, searchKeyword)
    };


    const searchKeywordOnChange=async (e) => {
        setSearchKeyword(e.target.value)
        if ((e.target.value).length === 0) {
            setSearchKeyword("0")
            await ExpenseTypeListRequest(1, perPage, "0")
        }
    };


    const perPageOnChange=async (e) => {
        setPerPage(parseInt(e.target.value));
        setPageNumber(1)
        await ExpenseTypeListRequest(1, parseInt(e.target.value), searchKeyword)
    };


    const handlePageClick = async (event) => {

        setPageNumber(event.selected + 1);
        await ExpenseTypeListRequest(event.selected + 1, perPage, searchKeyword)
        
    };




    return (
        <>
        <section className="list-bar">
            <div className="row">
                <div className="col-md-5">
                    <h6>Total Expense Type: {ExpenseTypeTotal}</h6>
                </div>
               
                <div className="col-3">
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
                            <input onChange={searchKeywordOnChange}  className='form-control' required type="text" name="search" placeholder='Expense Type Name ' />
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
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    ExpenseTypeList === null ? <TableSkeleton colSpan="5" /> : 
                    ExpenseTypeList.length === 0 ? <tr><td  colSpan = "5"> <Empty title={"Expense Type"} /> </td></tr> : 
                    ExpenseTypeList.map( (item, index) =>{
                        return (
                            <tr key={index}>
                                <td className="text-center"> { ((pageNumber - 1) * perPage) + (index+1)}</td>
                                <td> 
                                    {
                                    editRowId === item._id ? 
                                        <input name="name" className="form-control"  value={editValues.name} onChange={handleChange} /> : item.name
                                    }

                                </td>
                                <td>
                                    {
                                    editRowId === item._id ? 
                                        <input  name="slug"  className="form-control"  value={editValues.slug} onChange={handleChange} /> : item.slug
                                    }
                                </td>
                                <td>
                                    {
                                        editRowId ===  item._id? 
                                            <div>
                                                <Link onClick={() => handleSave(item._id)}   className="action-edit-button"> Update Now</Link>
                                                <Link onClick={() => setEditRowId(null)  }   className="action-delete-button"> Cancel</Link>
                                            </div> :
                                        <div>
                                            <Link onClick={() => handleEdit(item._id, item.name, item.slug)}   className="action-edit-button"> <AiOutlineEdit /> </Link>
                                            {/* <Link className="action-delete-button" > <MdOutlineDeleteForever /> </Link> */}

                                        </div>
                                    }
                                    
                                    
                                    
                                </td>

                            </tr> 
                        )
                    } )
                }
                   
                </tbody>


            </Table>
           
            {
                ExpenseTypeTotal > 20 &&
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
                            pageCount={ExpenseTypeTotal/perPage}
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

export default ExpenseTypeList;