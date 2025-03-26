/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import MemberStore from "../../store/MemberStore";
import PaymentStore from "../../store/PaymentStore";
import toast from "react-hot-toast";
import FullScreenLoader from "../../layout/FullScreenLoader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const PaymentForm = ({userID}) => {
    const {MemberDueList, MemberDetailsRequest, MemberDueListRequest } = MemberStore();
    const {PaymentLoading, CreatePaymentRequest} = PaymentStore();
    const navigate = useNavigate();

    useEffect( ()=>{
                (async()=>{
                    MemberDueList === null && await MemberDueListRequest(1, 20, userID);
                })()
    },[]);


  

    const {register, reset, watch, handleSubmit, formState: { errors }  } = useForm();

    const onSubmit = async(data) => {
        const allData = {...data, userID }
        console.log(allData);
        

         const res = await CreatePaymentRequest(allData);
         if(res.status==="success"){
             reset();
            toast.success("Payment Added successfully");
            navigate(`/member-details/${userID}`)
         
        }
   
      }

      if(PaymentLoading){
          return <FullScreenLoader />
      }

     const UnpaidDue = MemberDueList?.filter( (item) => item.status ==="due" );

    
      

    return (
        <div className=" p-5 bg-white rounded-3 border  ">
            <h4 className="mb-5">Make Payment</h4>
            <form onSubmit={handleSubmit(onSubmit)}>   
            
                <label className="form-label">Amount</label>
                <input className="form-control" {...register("amount", { required: true })}  />
                {errors.title && <span className="error-message">This field is required</span>}

                <div className="form-check mt-3">
                    <input {...register("haveDue")}  className="form-check-input" type="checkbox" id="haveDue"/>
                    <label className="form-check-label" htmlFor="haveDue">
                        Have Some Due
                    </label>
                </div>
                {
                   watch("haveDue") === true &&
                   <select multiple  {...register("dueIDs")}  className="form-select" aria-label="Default select example">
                        <option value="0">Select Your Due</option>
                       {
                        UnpaidDue.map( (item, index) =>  <option key={index} value={item._id}>{item.amount} tk</option>)
                       }
                       
                    </select>
                }
               
                <label  className="form-label mt-3">Expire Date</label>
                <input  {...register("expireDate")} type="date"  className="form-control p-3" />

                <label className="form-label mt-3">Description</label>
                <input className="form-control" {...register("note", { required: true })}  />
                {errors.des && <span className="error-message">This field is required</span>}
            
            
                <input className="btn btn-success mt-4" type="submit" value="Pay Now"/>
                
            </form>
        </div>
    );
};

export default PaymentForm;