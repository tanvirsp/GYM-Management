import { useEffect } from "react";
import MemberStore from "../../store/MemberStore";
import { Table } from "react-bootstrap";
import ColumnSkeleton from "../../skeletons/TableSkeleton";
import Empty from "../Empty";
import { FaRegEdit } from "react-icons/fa";


const MemberList = () => {
    const {MemberListRequest, MemberList} = MemberStore();


    useEffect(()=>{
        (async()=>{
            MemberList === null && await MemberListRequest();
        })()
    } ,[])


    return (
        <section className="bg-white p-4 rounded-3 mt-4">
            <Table hover className="align-middle text-center">
                <thead className="table-warning">
                <tr>
                    <th>Sl</th>
                    <th>Avatar</th>
                    <th>Member Name</th>
                    <th>ID</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    MemberList === null ? <ColumnSkeleton colSpan="6"  /> :
                    MemberList.length === 0 ? <tr> <td  colSpan = "6"> <Empty title ={"member"} />  </td></tr>: 
                    MemberList.map( (item, index) =>{
                        return(
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img className="rounded" width="75px" crossOrigin ="anonymous"  src={`${import.meta.env.VITE_URL}/${item.imageUrl}`} alt="Avatar" /> 
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.memberID}</td>
                                    <td>{item.contactNumber}</td>
                                    <td>{item.status == "1" ? <span className="text-success">Active</span>: <span className="text-danger">Expired</span>}</td>
                                    <td> <button className="btn btn-success"> <FaRegEdit /> </button> </td>
                                </tr>
                        )
                    })
                }
                
                </tbody>
            </Table>
        </section>
    );
};

export default MemberList;