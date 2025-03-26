import { useForm } from "react-hook-form";
import TrainerStore from "../../store/TrainerStore";
import { useEffect, useState } from "react";
import SalaryStore from '../../store/SalaryStore';
import toast from "react-hot-toast";
import ExpenseTypeStore from "../../store/ExpenseTypeStore";


const AdvanceSalaryForm = () => {
    const {TrainerDropdownRequest, TrainerDropdown, TrainerDetailsRequest, ResetTrainerData} = TrainerStore();
    const {AdvanceSalaryCreate} = SalaryStore();
    const {ExpenseTypeDropdownRequest, ExpenseTypeDropdown} = ExpenseTypeStore()
    const [userID, setUserID] = useState(0);
    
    const {register, reset,  handleSubmit} = useForm();


    useEffect(()=>{
        (async()=>{
            await ResetTrainerData();
            TrainerDropdown === null && await TrainerDropdownRequest();
            await ExpenseTypeDropdownRequest();
        })()
    } ,[]);

    

    const onSubmit = async(data) => {
        const allData = {...data, userID }
      
        const result = await AdvanceSalaryCreate(allData);
        if(result.status === "success"){
            await TrainerDetailsRequest(userID)
            toast.success("Advance Salary added successfully");
            reset()
        } else {
            toast.error("Something went wrong")
        }
       
      };



      
    const handleTrainerId = async(id) =>{
        await TrainerDetailsRequest(id)
        setUserID(id)  
    };



    return (
        <div className=" p-5 bg-white rounded-3 border  ">
            <h4 className="mb-5">Pay Advance Salary</h4>
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
                <label className="form-label mt-3 ">Advance Amount </label>
                <input required  {...register("amount")}  className="form-control p-2" />

                <label className="form-label mt-3 ">Note</label>
                <input required  {...register("note")}  className="form-control p-2" />


                
              
                
                

           
                
              
            
                <input className="btn btn-success mt-4" type="submit" value="Pay Now"/>
                
            </form>
        </div>
    );
};

export default AdvanceSalaryForm;