import { Table } from "react-bootstrap";
import UserStore from "../../store/UserStore";
import RowSkeleton from '../../skeletons/RowSkeleton';
import Empty from "../Empty";
import { useEffect } from "react";
import avater from "../../assets/images/avater.jpg"
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { MdOutlineDeleteForever } from "react-icons/md";




const UserList = () => {
    const {UserList, UserListRequest, } = UserStore();

    
    


    useEffect(()=>{
        (async()=>{
            UserList === null && await UserListRequest();

        })()
    } ,[])

   

    
    return (
        <div className="p-4 bg-white rounded-3 border table-responsive ">
            <h5 className="mb-5">Users</h5>
            <Table className="align-middle  ">
            <thead className="table-success">
                <tr>
                    <th>Sl</th>
                    <th>Name</th>
                    <th>Avatar</th>
                    <th>Status</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Role</th>
                    <th>Action</th>
                    

                </tr>
            </thead>
            <tbody >
            {
                    UserList === null ? <RowSkeleton /> :
                    UserList?.length === 0 ? <tr> <td  colSpan = "6"> <Empty title ={"User"} />  </td></tr> :
                    UserList.map( (item, index) => {
                        return ( 
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    {
                                        item.imgUrl ? <img className="rounded" width="75px" crossOrigin ="anonymous"  src={`${import.meta.env.VITE_URL}/${item.imgUrl}`} alt="Avatar" /> :
                                        <img className="rounded" width="75px"  src={avater} alt="Image" />
                                    }
                                </td>
                                <td>
                                    <span className={item.loginStatus ? "btn btn-outline-success" :  "btn btn-outline-danger"   }>
                                        {item.loginStatus ? "Active" : "Suspend"}
                                    </span>
                                </td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.role}</td>
                                <td>
                                    <Link  className="action-view-button"> <GrView /> </Link>
                                    <Link  className="action-delete-button" > <MdOutlineDeleteForever />  </Link>
                                </td>
                            </tr>
                        )

                    })
                }
                
                </tbody>
        
        </Table>
   
   
   </div>
    );
};

export default UserList;