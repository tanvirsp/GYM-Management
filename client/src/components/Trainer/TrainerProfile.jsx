import TrainerStore from "../../store/TrainerStore";
import { MdLocationPin } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { Table } from "react-bootstrap";



import EmptyTrainerCard from "../../skeletons/EmptyTrainerCard";
import FormatDate from "../../helper/FormatDate";

const TrainerProfile = () => {
    const { TrainerFormData} = TrainerStore();
  

    
    if(TrainerFormData=== null){
        return <EmptyTrainerCard />
    }
    

    
    const {memberID, name, address, loginStatus, imgUrl, createdAt, phone, salary,} = TrainerFormData



    return (
        <div className="bg-white p-5 rounded-3">
          
            <div className="profile">
            <img  crossOrigin ="anonymous"  src={`${import.meta.env.VITE_URL}/${imgUrl}`} alt="Avatar" />
                <h4>{name}</h4>
                <p className="member-id">Member ID: {memberID}</p>
            </div>
           
            <div className="contact-info">
                    <div className="address">
                        <MdLocationPin />
                        <p> {address}  </p>
                    </div>
                    <div  className="phone">
                        <BiSolidPhoneCall />
                        <p> {phone}</p>
                    </div> 
            </div>
            <Table >
                <tbody>
                    <tr>
                        <td><p>Basic Salary: </p></td>
                        <td>{salary.monthlySalary}</td>
                    </tr>
                    <tr>
                        <td><p>Salary Due: </p></td>
                        <td>{salary.dueAmount}</td>
                    </tr>
                    <tr>
                        <td><p>Salary Advance: </p></td>
                        <td>{salary.advanceAmount}</td>
                    </tr>
                    <tr>
                        <td><p>Status :</p> </td>
                        <td> {loginStatus ?  
                                <span className="active-service">Active</span>:  
                                <span className="hold-service">Suspend</span>   }
                        </td> 
                        
                    </tr>
                </tbody>

            </Table>
            <div className="mt-3">
                <div className="date-info">
                    <p>Joining Date : <b> {FormatDate(createdAt)}</b> </p>
                </div>
               
            </div>
            

               

            

        </div>
    );
};

export default TrainerProfile;