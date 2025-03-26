import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import MemberStore from "../../store/MemberStore";
import ColumnSkeleton from "../../skeletons/TableSkeleton";
import Empty from "../Empty";
import FormatDate from "../../helper/FormatDate";
import ReactPaginate from "react-paginate";


// eslint-disable-next-line react/prop-types
const MemberPaymentList = ({userID}) => {
    const { MemberPaymentListRequest, MemberPaymentList, MemberPaymentRow } = MemberStore();

    const [perPage]= useState(10);
    const  [pageNumber, setPageNumber] = useState(1);


    useEffect( ()=>{
                (async()=>{
                    await MemberPaymentListRequest(1, perPage, userID);
    
                })()
    } ,[userID]);

    const handlePageClick = async (event) => {
        setPageNumber(event.selected + 1);
        await MemberPaymentListRequest(event.selected + 1, perPage, userID)
        
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
                    MemberPaymentList === null ? <ColumnSkeleton colSpan="5"  /> :
                    MemberPaymentList.length === 0 ? <tr> <td  colSpan = "5"> <Empty title ={"Payment"} />  </td></tr>: 
                    MemberPaymentList.map( (item, index) =>{
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
                            pageCount={MemberPaymentRow/perPage}
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

export default MemberPaymentList;