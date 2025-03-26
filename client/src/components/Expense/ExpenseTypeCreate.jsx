import { useState } from "react";
import ExpenseTypeStore from "../../store/ExpenseTypeStore";
import toast from "react-hot-toast";


const ExpenseTypeCreate = () => {

    const {CreateExpenseTypeRequest, ExpenseTypeListRequest} = ExpenseTypeStore()


    //Collecting Data from Form Field
    const [data, setData] = useState({})

    const handleFormData =(name, value) =>{
        setData({...data, [name]: value })
    }


    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const result = await CreateExpenseTypeRequest(data);
        if(result.status ==="success"){
            toast.success("Expense Type Created Successfully");
            
            await ExpenseTypeListRequest(1, 20, 0)
            e.target.reset();

        } else{
            toast.error("Something Went Wrong!!")
        }
        
        
    }



    return (
        <div className=" p-5 bg-white rounded-3  ">
            <h4 className="mb-5">Expense Type Create</h4>
            <form onSubmit={handleSubmit}  > 
                <div>
                    <label className="form-label ">Name</label>
                    <input required onBlur = {(e)=>handleFormData("name", e.target.value)}  className="form-control p-2" />

                    <label className="form-label mt-3 ">Slug</label>
                    <input required onBlur = {(e)=>handleFormData("slug", e.target.value)}  className="form-control p-2" />

                </div>
         
                <input  className="btn btn-success mt-4" type="submit" value="Create"/>
                
            </form>
        </div>
    );
};

export default ExpenseTypeCreate;