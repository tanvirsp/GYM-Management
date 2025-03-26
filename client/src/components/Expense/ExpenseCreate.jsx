import toast from "react-hot-toast";
import { useEffect } from "react";
import ExpenseTypeStore from "../../store/ExpenseTypeStore";
import { useForm } from "react-hook-form";
import ExpenseStore from "../../store/ExpenseStore";


const ExpenseCreate = () => {
    
    const {ExpenseTypeDropdownRequest, ExpenseTypeDropdown} = ExpenseTypeStore();
    const {CreateExpenseRequest, ExpenseListRequest } = ExpenseStore();

    const { register,  handleSubmit, reset,   } = useForm()
    


    useEffect(()=>{
        (async()=>{
            await ExpenseTypeDropdownRequest();
        })()
    } ,[])
            


    const onSubmit = async(data) => {
        
        const result = await CreateExpenseRequest(data);
        if(result.status ==="success"){
            toast.success("Expense Created Successfully");
            
            await ExpenseListRequest(1, 20, 0)
            reset();
            

        } else{
            toast.error("Something Went Wrong!!")
        }
    }

   

 

  
    return (
        <div className=" p-5 bg-white rounded-3  ">
            <h4 className="mb-5">Add New Expense</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-3">
                        <label className="form-label ">Expense Amount</label>
                        <input  {...register("amount")} required className="form-control p-2" />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Expense Type</label>
                        <select  {...register("typeID")}  className="form-select" defaultValue={0}  aria-label="Default select example">
                            <option value="0" >Choose Expense Type</option>
                            {
                                ExpenseTypeDropdown === null ? <option>Loading...</option>:
                                ExpenseTypeDropdown.length === 0 ? <option>No Expense Type Available</option>:
                                ExpenseTypeDropdown.map( (item, index) => <option key={index} value={item._id}>{item.name}</option> )
                            }

                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label ">Note</label>
                        <input required  {...register("note")} className="form-control p-2" />
                    </div>
                    
                    
                </div>
                
            

                <input  className="btn btn-success mt-4" type="submit" value="Create New Service"/>
                
            </form>
        </div>
    );
};

export default ExpenseCreate;