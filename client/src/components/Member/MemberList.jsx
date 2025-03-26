import { useEffect, useState } from "react";
import MemberStore from "../../store/MemberStore";
import { Table } from "react-bootstrap";
import ColumnSkeleton from "../../skeletons/TableSkeleton";
import Empty from "../Empty";
import FullScreenLoader from "../../layout/FullScreenLoader";
import ReactPaginate from "react-paginate";
import { GrView } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";


const MemberList = () => {
    const {MemberListRequest, MemberList, MemberTotal, MemberLoading} = MemberStore();

     const [perPage, setPerPage]= useState(20);
    const  [pageNumber, setPageNumber] = useState(1);
    const [searchKeyword,setSearchKeyword]=useState("0");




    useEffect(()=>{
        (async()=>{
            MemberList === null && await MemberListRequest(1, perPage, searchKeyword);
        })()
    } ,[]);

     
    if(MemberLoading=== null){
        return <FullScreenLoader />
    }


    const perPageOnChange=async (e) => {
        setPerPage(parseInt(e.target.value));
        setPageNumber(1)
        await MemberListRequest(1, parseInt(e.target.value), searchKeyword)
    };


    const handlePageClick = async (event) => {
        setPageNumber(event.selected + 1);
        await MemberListRequest(event.selected + 1, perPage, searchKeyword)
        
    };

    const searchKeywordOnChange=async (e) => {
        setSearchKeyword(e.target.value)
        if ((e.target.value).length === 0) {
            setSearchKeyword("0")
            await MemberListRequest(1, perPage, "0")
        }
    };


    const searchData=async (e) => {
        e.preventDefault();
        await MemberListRequest(1, perPage, searchKeyword)
    }




    return (
        <>
            <section className=" list-bar">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Total Package: {MemberTotal}</h5>
                    </div>
                    <div className="col-2">
                        
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
        
        
            <section className="bg-white p-4 rounded-3 mt-4 table-responsive">
                <Table hover className="align-middle text-center">
                    <thead className="table-light">
                    <tr>
                        <th>Sl</th>
                        <th>Avatar</th>
                        <th>Member Name</th>
                        <th>ID</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Payment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        MemberList === null ? <ColumnSkeleton colSpan="7"  /> :
                        MemberList.length === 0 ? <tr> <td  colSpan = "7"> <Empty title ={"member"} />  </td></tr>: 
                        MemberList.map( (item, index) =>{
                            return(
                                    <tr key={index}>
                                         <td className="text-center"> { ((pageNumber - 1) * perPage) + (index+1)}</td>
                                        <td>
                                            <img className="rounded" width="75px" crossOrigin ="anonymous"  src={`${import.meta.env.VITE_URL}/${item.profile.imgUrl}`} alt="Avatar" /> 
                                        </td>
                                        <td>{item.profile.name}</td>
                                        <td>{item.memberID}</td>
                                        <td>{item.profile.phone}</td>
                                        <td>{ item.status === "1" ? 
                                            <span className="active-service">Active</span>  : 
                                            item.status === "0" ?
                                            <span className="expired-service">Exipred</span>  :
                                            <span className="hold-service">Hold</span>  
                                            
                                            
                                            } 
                                        </td>
                                        <td>
                                            <Link to={`/member-details/${item.userID}`}  className="action-view-button"> <GrView /> </Link>
                                            <Link to={`/update-member/${item.userID}`}  className="action-edit-button"> <AiOutlineEdit /> </Link>
                                             
                                        </td>
                                        <td>
                                            <Link to={`/new-payment/${item.userID}`} className="btn btn-warning">Make Payment </Link>
                                        </td>
                                    </tr>
                            )
                        })
                    }
                    
                    </tbody>
                </Table>

                {
                    MemberTotal > 20 &&
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
                                pageCount={MemberTotal/perPage}
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

export default MemberList;