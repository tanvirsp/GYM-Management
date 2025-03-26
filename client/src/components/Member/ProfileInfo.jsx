import MemberStore from "../../store/MemberStore";
import { MdLocationPin } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { Table } from "react-bootstrap";
import FullScreenLoader from "../../layout/FullScreenLoader";
import FormatDate from "../../helper/FormatDate";
import { Link } from "react-router-dom";
import UserStore from "../../store/UserStore";



const ProfileInfo = () => {
    const {MemberFormData, MemberDueAmount} = MemberStore();
    const {Profile} = UserStore();

    

    if(MemberFormData === null){
        return <FullScreenLoader />
    }

    


    return (
        <div className="bg-white p-5 rounded-3">
          
            <div className="profile">
                <img  crossOrigin ="anonymous"  src={`${import.meta.env.VITE_URL}/${MemberFormData.imgUrl}`} alt="Avatar" />
                <h4>{MemberFormData.name}</h4>
                <p className="member-id">Member ID: {MemberFormData.memberID}</p>
            </div>
           
            <div className="contact-info">
                    <div className="address">
                        <MdLocationPin />
                        <p> {MemberFormData.address}</p>
                    </div>
                    <div  className="phone">
                        <BiSolidPhoneCall />
                        <p> {MemberFormData.phone}</p>
                    </div> 
            </div>
            <Table >
                <tbody>
                    <tr>
                        <td><p>Package : </p></td>
                        <td><span className="active-service">{MemberFormData.package.name}</span></td>
                    </tr>
                    <tr>
                        <td><p>Services :</p> </td>
                        <td>{
                                MemberFormData.services.length ===0 ? <span>No Service</span> :
                                MemberFormData.services.map( (item, index) => <span key={index} className="active-service" >{item.name}</span> )
                            } 
                        </td>
                    </tr>
                    <tr>
                        <td><p>Status :</p> </td>
                        <td>{ MemberFormData.status ==="1" ? 
                            <span className="active-service">Active</span>  : 
                             MemberFormData.status ==="0" ?
                            <span className="expired-service">Exipred</span> :
                            <span className="hold-service">Hold</span> 
                         } 
                        </td>
                    </tr>
                </tbody>

            </Table>
            <div className="d-flex mt-3">
                <div className="date-info">
                    <p>Expire Date : {FormatDate(MemberFormData.expireDate)}</p>
                    <p>Joining Date : {FormatDate(MemberFormData.createdAt)}</p>
                </div>
                <div className="action-info">
                    {
                        Profile.role ==="admin" &&
                        <div>
                            <Link to={`/new-payment/${MemberFormData.userID}`} className="btn btn-primary rounded-5 w-100">Make Payment</Link>
                            <button className="btn btn-danger rounded-5 w-100 mt-2">Due : {MemberDueAmount} tk</button>
                        </div>
                    }

                   
                </div>
                
            </div>
            

               

            

        </div>
    );
};

export default ProfileInfo;