
import UploadImageStore from "../../store/UploadImageStore";
import LoadingSkeleton from "../../skeletons/LoadingSkeleton";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import FullScreenLoader from "../../layout/FullScreenLoader";
import TrainerStore from "../../store/TrainerStore";


const UpdateTrainer = () => {
    const { TrainerFormData, OnChangTrainerFormData,TrainerListRequest, TrainerDetailsRequest, UpdateTrainerRequest} = TrainerStore();
    const {ImageUploadRequest, ImageLoading} = UploadImageStore();
    const navigate = useNavigate();

    const {id} = useParams();


    //updating data
    useEffect( ()=>{
        (async()=>{
            id && await TrainerDetailsRequest(id);
        })()
    } ,[id])

    



    if(TrainerFormData=== null){
        return <FullScreenLoader />
    }
    



    const handleImage = async(e) =>{
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        const result = await ImageUploadRequest(formData);
        if(result.status){
            OnChangTrainerFormData("imgUrl", result.data.filename )
            
        } 
    };
   

    const handleSubmit = async(e)=>{
        e.preventDefault();
       
        const result = await UpdateTrainerRequest(id, TrainerFormData);
        if(result.status ==="success"){
            toast.success("Service Update Successfully");
            
            await TrainerListRequest(1, 20, 0)
            e.target.reset();
            navigate("/trainer-list")

        } else{
            toast.error("Something Went Wrong!!")
        }
    }

  
    return (
        <div className=" p-5 bg-white rounded-3  ">
            <h4 className="mb-5">Update Trainer Profile</h4>
            <form onSubmit={handleSubmit}  >

                <div className="row">
                    <div className="col-md-4">
                        <label className="form-label ">Trainer ID</label>
                        <input required onBlur = {(e)=>OnChangTrainerFormData("gymID", e.target.value)} defaultValue={TrainerFormData.gymID}  className="form-control p-2" />

                        <label className="form-label mt-3 ">Trainer Name</label>
                        <input required onBlur = {(e)=>OnChangTrainerFormData("name", e.target.value)} defaultValue={TrainerFormData.name}  className="form-control p-2" />

                        <label className="form-label mt-3 ">Father Name</label>
                        <input required onBlur = {(e)=>OnChangTrainerFormData("fatherName", e.target.value)} defaultValue={TrainerFormData.fatherName}   className="form-control p-2" />

                        

                        
                    </div>
                    <div className="col-md-4">
                        <label className="form-label ">Phone</label>
                        <input required onBlur = {(e)=>OnChangTrainerFormData("phone", e.target.value)}  defaultValue={TrainerFormData.phone}  className="form-control p-2" />

                        <label className="form-label mt-3 ">Address</label>
                        <input required onBlur = {(e)=>OnChangTrainerFormData("address", e.target.value)} defaultValue={TrainerFormData.address} className="form-control p-2" />

                        <label className="form-label mt-3">Working Time</label>
                        <select onChange={(e)=>OnChangTrainerFormData("workingTime", e.target.value)}  defaultValue={TrainerFormData.workingTime}  className="form-control  form-select" >
                            <option value="0" >Select Working Time</option>
                            <option value="7AM-1PM">7AM- 1PM</option>
                            <option value="7PM-10PM">7PM -10PM</option>
                        </select>

                        <label className="form-label mt-3 ">Salary</label>
                        <input required onBlur = {(e)=>OnChangTrainerFormData("salary", e.target.value)} defaultValue={TrainerFormData.salaryDetails.monthlySalary} className="form-control p-2" />
                       

                       
                    </div>
                    
                    <div className="col-md-4">
                        <label className="form-label">Profile Image</label>
                        
                            { ImageLoading && <LoadingSkeleton />}  
                            {
                            TrainerFormData?.imgUrl ? <div className="text-center"> <img className="form-member-pic" crossOrigin ="anonymous"  
                                                        src={`${import.meta.env.VITE_URL}/${TrainerFormData.imgUrl}`} alt="Avatar" /> <br/>
                                                        <button onClick={()=>OnChangTrainerFormData("imgUrl", "") } className="btn btn-danger  mt-2">Remove</button>
                                                </div> : 
                                                <input onChange={handleImage} name='imgUrl' type="file" className='form-control'  /> 
                            }

                    </div>
                </div>
                
            

                <input  className="btn btn-info mt-4" type="submit" value="Update Trainer Info"/>
                
            </form>
        </div>
    );
};

export default UpdateTrainer;