import { useForm } from "react-hook-form";
import TrainerStore from "../../store/TrainerStore";
import { useEffect, useState } from "react";
import SalaryStore from '../../store/SalaryStore';
import toast from "react-hot-toast";
import ExpenseTypeStore from '../../store/ExpenseTypeStore';


const SalaryForm = () => {
    const {TrainerDropdownRequest, TrainerDropdown, TrainerDetailsRequest, ResetTrainerData} = TrainerStore();
    const {ExpenseTypeDropdownRequest, ExpenseTypeDropdown} = ExpenseTypeStore()
    const {SalaryCreate} = SalaryStore();
    const [userID, setUserID] = useState(0);
    
    const {register, reset, watch, handleSubmit,  } = useForm();


    useEffect(()=>{
        (async()=>{
            await ResetTrainerData()
            TrainerDropdown === null && await TrainerDropdownRequest()
            await ExpenseTypeDropdownRequest();
        })()
    } ,[]);


    const handleTrainerId = async(id) =>{
        await TrainerDetailsRequest(id)
        setUserID(id)
        
    }

    const onSubmit = async(data) => {
        const allData = {...data, userID }
        const result = await SalaryCreate(allData);
        if(result.status === "success"){
            toast.success("Salary added successfully");

            await TrainerDetailsRequest(userID)
            reset()
        } else {
            toast.error("Something went wrong")
        }
       
      }




    return (
        <div className=" p-5 bg-white rounded-3 border  ">
            <h4 className="mb-5">Pay Salary</h4>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label className="form-label">Expense Type</label>
                <select  {...register("typeID")}  className="form-select" defaultValue={0}  aria-label="Default select example">
                    <option value="0" >Choose Expense Type</option>
                    {
                        ExpenseTypeDropdown === null ? <option>Loading...</option>:
                        ExpenseTypeDropdown.length === 0 ? <option>No Expense Type Available</option>:
                        ExpenseTypeDropdown.map( (item, index) => <option key={index} value={item._id}>{item.name}</option> )
                    }

                </select> 
            
                <label className="form-label mt-3">Trainer List</label>
                <select onChange={(e)=>handleTrainerId(e.target.value)}  className="form-select" defaultValue={0}  aria-label="Default select example">
                    <option value="0" >Choose Trainer</option>
                    {
                        TrainerDropdown === null ? <option>Loading...</option>:
                        TrainerDropdown.length === 0 ? <option>No Trainer Available</option>:
                        TrainerDropdown.map( (item, index) => <option key={index} value={item._id}>{item.name}</option> )
                    }

                </select>
                <label className="form-label mt-3 ">Amount (Cash)</label>
                <input required  {...register("amount")}  className="form-control p-2" />

                
                <div className="form-check mt-3">
                    <input {...register("payFormAdvance")}  className="form-check-input" type="checkbox" id="haveDue"/>
                    <label className="form-check-label" htmlFor="haveDue">
                        Pay from Advance
                    </label>
                </div>

                {
                   watch("payFormAdvance") === true &&
                   <div>
                        <label className="form-label mt-3 ">Advance Amount</label>
                        <input required  {...register("advanceAmount")}  className="form-control p-2" />
                   </div>
                   
                }

                <label className="form-label mt-3 ">Note</label>
                <input required  {...register("note")}  className="form-control p-2" />

                
                

           
                
              
            
                <input className="btn btn-success mt-4" type="submit" value="Pay Now"/>
                
            </form>
        </div>
    );
};

export default SalaryForm;