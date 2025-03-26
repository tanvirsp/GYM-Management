/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SalaryStore from "../../store/SalaryStore";
import ReactPaginate from "react-paginate";
import { Table } from "react-bootstrap";
import FormatDate from "../../helper/FormatDate";
import Empty from "../Empty";
import CommonSkeleton from "../../skeletons/CommonSkeleton";

const SalaryList = ({userID}) => {
    const { SalaryListRequest, SalaryList, SalaryRow } = SalaryStore();
    

    const [perPage]= useState(10);
    const  [pageNumber, setPageNumber] = useState(1);


    useEffect( ()=>{
                (async()=>{
                    SalaryList === null && await SalaryListRequest(1, perPage, userID);
    
                })()
    } ,[userID]);



    const handlePageClick = async (event) => {
        setPageNumber(event.selected + 1);
        await SalaryListRequest(event.selected + 1, perPage, userID)
        
    };



    return (
        <div>
            <Table hover className="align-middle text-center">
                <thead className="table-light">
                <tr>
                    <th>Sl</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Note</th>
                </tr>
                </thead>
                <tbody>
                {
                    SalaryList === null ? <CommonSkeleton colSpan="5"  /> :
                    SalaryList.length === 0 ? <tr> <td  colSpan = "5"> <Empty title ={"Payment"} />  </td></tr>: 
                    SalaryList.map( (item, index) =>{
                        return(
                                <tr key={index}>
                                        <td className="text-center"> { ((pageNumber - 1) * perPage) + (index+1)}</td>
                                    
                                    <td>{ FormatDate(item.createdAt)  }</td>
                                    <td>{item.amount}</td>
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
                            pageCount={SalaryRow/perPage}
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

export default SalaryList;