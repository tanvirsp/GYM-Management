/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import LazyLoader from "../../layout/LazyLoader";
import toast from "react-hot-toast";
import ExpenseTypeStore from "../../store/ExpenseTypeStore";



const ExpenseTypeEditModal = (props) => {
    // Golbal State
    const {UpdateExpenseType, ExpenseTypeListRequest,  ExpenseTypeDetailsRequest, ExpenseTypeFormData, Loading } = ExpenseTypeStore();
    
    
    const [data, setData] = useState({})

    useEffect( ()=>{
        ( async()=>{
           props.id && await ExpenseTypeDetailsRequest(props.id);
        })()
    },[props.id])

   

    
    if(Loading){
        return <LazyLoader />
    }


    const handleFormData = (name, value)=>{
        setData({
            ...data,
            [name]: value
        })
    }

    
    const handleSubmit =async(e)=>{
        e.preventDefault();
        
        const res = await UpdateExpenseType(props.id, data);
        if(res.status==="success"){
            await ExpenseTypeListRequest(1, 20, "0");
            toast.success("Expense Type Update successfully");
            props.onHide();
        }

    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
      
            <Modal.Body>
                <div className=" p-5 ">
                    <h4 className="mb-3">Edit Expense Type</h4>
                    <form onSubmit={handleSubmit}>
                        
                        <label className="form-label ">Name</label>
                        <input required onBlur = {(e)=>handleFormData("name", e.target.value)} defaultValue={ExpenseTypeFormData?.name}  className="form-control p-2" />

                        <label className="form-label mt-3 ">Slug</label>
                        <input required onBlur = {(e)=>handleFormData("slug", e.target.value)} defaultValue={ExpenseTypeFormData?.slug}   className="form-control p-2" />

  
                        <div className="text-end">
                            <input className="btn btn-success mt-4" type="submit" value="Update"/>
                        </div>
                    </form>
                </div>

            </Modal.Body>
            
            </Modal>
    );
};


export default ExpenseTypeEditModal;