/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SalaryStore from "../../store/SalaryStore";
import ReactPaginate from "react-paginate";
import { Table } from "react-bootstrap";
import FormatDate from "../../helper/FormatDate";
import Empty from "../Empty";
import CommonSkeleton from "../../skeletons/CommonSkeleton";

const AdvanceList = ({userID}) => {
    const { AdvanceListRequest, AdvanceRow, AdvanceList } = SalaryStore();
    

    const [perPage]= useState(10);
    const  [pageNumber, setPageNumber] = useState(1);


    useEffect( ()=>{
                (async()=>{
                    AdvanceList === null && await AdvanceListRequest(1, perPage, userID);
    
                })()
    } ,[userID]);



    const handlePageClick = async (event) => {
        setPageNumber(event.selected + 1);
        await AdvanceListRequest(event.selected + 1, perPage, userID)
        
    };



    return (
        <div>
            <Table hover className="align-middle text-center">
                <thead className="table-light">
                <tr>
                    <th>Sl</th>
                    <th>Date</th>
                    <th>Advance</th>
                    <th>Paid</th>
                    <th>Note</th>
                </tr>
                </thead>
                <tbody>
                {
                    AdvanceList === null ? <CommonSkeleton colSpan="5"  /> :
                    AdvanceList.length === 0 ? <tr> <td  colSpan = "5"> <Empty title ={"Payment"} />  </td></tr>: 
                    AdvanceList.map( (item, index) =>{
                        return(
                                <tr key={index}>
                                        <td className="text-center"> { ((pageNumber - 1) * perPage) + (index+1)}</td>
                                    
                                    <td>{ FormatDate(item.createdAt)  }</td>
                                    <td>{item.type==="advance" ? item.amount : ""}</td>
                                    <td className="text-danger">{item.type==="paid-advance" ? - item.amount : ""}</td>
                                   
                                    <td>{item.note}</td>
                                    
                                </tr>
                        )
                    })
                        }
                </tbody>
            </Table>
            {
             
                <div className="mt-2 d-flex justify-content-end">
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
                            pageCount={AdvanceRow/perPage}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </nav>
                
                </div>
                }
        </div>
    );
};

export default AdvanceList;