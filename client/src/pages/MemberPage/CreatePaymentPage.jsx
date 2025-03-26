import { useParams } from "react-router-dom";
import PaymentForm from "../../components/Member/PaymentForm";
import ProfileInfo from "../../components/Member/ProfileInfo";
import { useEffect } from "react";
import MemberStore from "../../store/MemberStore";


const CreatePaymentPage = () => {
    const {id} = useParams()
    const {MemberDetailsRequest, MemberFormData} = MemberStore();
     
        
    useEffect( ()=>{
            (async()=>{
                MemberFormData === null && await MemberDetailsRequest(id);

            })()
    } ,[id]);


    return (
        <div className="row">
            
            <div className="col-md-4">
                <ProfileInfo />
            </div>
            <div className="col-md-8">
                <PaymentForm userID ={id} />
            </div>
        </div>
    );
};

export default CreatePaymentPage;