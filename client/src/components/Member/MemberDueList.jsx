import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import MemberStore from "../../store/MemberStore";
import ColumnSkeleton from "../../skeletons/TableSkeleton";
import Empty from "../Empty";
import FormatDate from "../../helper/FormatDate";
import ReactPaginate from "react-paginate";


// eslint-disable-next-line react/prop-types
const MemberDueList = ({userID}) => {
    const {MemberDueListRequest, MemberDueList, MemberDueRow } = MemberStore();

    const [perPage]= useState(10);
    const  [pageNumber, setPageNumber] = useState(1);


    useEffect( ()=>{
                (async()=>{
                   await MemberDueListRequest(1, perPage, userID);
    
                })()
    } ,[userID]);

    const handlePageClick = async (event) => {
        setPageNumber(event.selected + 1);
        await MemberDueListRequest(event.selected + 1, perPage, userID)
        
    };




    return (
        <div>
            <Table hover className="align-middle text-center">
                <thead className="table-light">
                <tr>
                    <th>Sl</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Note</th>
                </tr>
                </thead>
                <tbody>
                {
                    MemberDueList === null ? <ColumnSkeleton colSpan="5"  /> :
                    MemberDueList.length === 0 ? <tr> <td  colSpan = "5"> <Empty title ={"Due"} />  </td></tr>: 
                    MemberDueList.map( (item, index) =>{
                        return(
                                <tr key={index}>
                                        <td className="text-center"> { ((pageNumber - 1) * perPage) + (index+1)}</td>
                                    
                                    <td>{ FormatDate(item.createdAt)  }</td>
                                    <td>{item.amount}</td>
                                    <td>{item.status == "due" ? <span className="text-danger">Due</span>: <span className="text-success">Paid</span>}</td>
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
                            pageCount={MemberDueRow/perPage}
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

export default MemberDueList;