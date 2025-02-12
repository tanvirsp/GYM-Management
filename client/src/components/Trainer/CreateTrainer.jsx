import UploadImageStore from "../../store/UploadImageStore";
import LoadingSkeleton from "../../skeletons/LoadingSkeleton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TrainerStore from "../../store/TrainerStore";


const CreateTrainer = () => {
    
    const{CreateTrainerRequest, TrainerListRequest} =TrainerStore();



    const {ImageUploadRequest, ImageLoading} = UploadImageStore();
    const navigate = useNavigate();


    //Collecting Data from Form Field
    const [data, setData] = useState({})

    const handleFormData =(name, value) =>{
        setData({...data, [name]: value })
    }


        

    //Image Upload function and State
    const [imageData, setImageData] = useState("")

    const handleImage = async(e) =>{
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        const result = await ImageUploadRequest(formData);
        if(result.status){
            setImageData({
                [e.target.name]: result.data.filename
            })
            
        } 
    };
   



    const handleSubmit = async(e)=>{
        e.preventDefault();
        const allData = {...data, ...imageData}
              
       
        const result = await CreateTrainerRequest(allData);
        if(result.status ==="success"){
            toast.success("Trainer Created Successfully");
            
            await TrainerListRequest(1, 20, 0)
            e.target.reset();
            navigate("/trainer-list")

        } else{
            toast.error("Something Went Wrong!!")
        }
    }


  
    return (
        <div className=" p-5 bg-white rounded-3  ">
            <h4 className="mb-5">Add New Trainer</h4>
            <form onSubmit={handleSubmit}  > 
                <div className="row">
                    <div className="col-md-4">
                        <label className="form-label ">Trainer ID</label>
                        <input required onBlur = {(e)=>handleFormData("trainerID", e.target.value)}  className="form-control p-2" />

                        <label className="form-label mt-3 ">Trainer Name</label>
                        <input required onBlur = {(e)=>handleFormData("name", e.target.value)}  className="form-control p-2" />

                        <label className="form-label mt-3 ">Father Name</label>
                        <input required onBlur = {(e)=>handleFormData("fatherName", e.target.value)}   className="form-control p-2" />

                        

                        
                    </div>
                    <div className="col-md-4">
                        <label className="form-label ">Phone</label>
                        <input required onBlur = {(e)=>handleFormData("phone", e.target.value)}   className="form-control p-2" />

                        <label className="form-label mt-3 ">Address</label>
                        <input required onBlur = {(e)=>handleFormData("address", e.target.value)} className="form-control p-2" />

                        <label className="form-label mt-3">Working Time</label>
                        <select onChange={(e)=>handleFormData("workingTime", e.target.value)}   className="form-control  form-select" >
                            <option value="0" >Select Working Time</option>
                            <option value="7AM-1PM">7AM- 1PM</option>
                            <option value="7PM-10PM">7PM -10PM</option>
                        </select>
                       

                       
                    </div>
                    
                    <div className="col-md-4">
                        <label className="form-label">Profile Image</label>
                        
                            { ImageLoading && <LoadingSkeleton />}  
                            {
                            imageData?.imgUrl ? <div className="text-center"> <img className="form-member-pic" crossOrigin ="anonymous"  
                                                        src={`${import.meta.env.VITE_URL}/${imageData.imgUrl}`} alt="Avatar" /> <br/>
                                                        <button onClick={()=>setImageData("imgUrl", "") } className="btn btn-danger  mt-2">Remove</button>
                                                </div> : 
                                                <input onChange={handleImage} name='imgUrl' type="file" className='form-control'  /> 
                            }

                    </div>
                </div>
                
            

                <input  className="btn btn-success mt-4" type="submit" value="Add A Trainer"/>
                
            </form>
        </div>
    );
};

export default CreateTrainer;