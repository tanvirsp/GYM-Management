import ServiceStore from "../../store/ServiceStore";
import UploadImageStore from "../../store/UploadImageStore";
import LoadingSkeleton from "../../skeletons/LoadingSkeleton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const CreateService = () => {
    const { CreateServiceRequest, ServiceListRequest} = ServiceStore();
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
       
        const result = await CreateServiceRequest(allData);
        if(result.status ==="success"){
            toast.success("Service Created Successfully");
            
            await ServiceListRequest(1, 20, 0)
            e.target.reset();
            navigate("/service-list")

        } else{
            toast.error("Something Went Wrong!!")
        }
    }


  
    return (
        <div className=" p-5 bg-white rounded-3  ">
            <h4 className="mb-5">Add New Service</h4>
            <form onSubmit={handleSubmit}  > 
                <div className="row">
                    <div className="col-md-3">
                        <label className="form-label ">Service Name</label>
                        <input required onBlur = {(e)=>handleFormData("name", e.target.value)}  className="form-control p-2" />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label ">Service Price</label>
                        <input required onBlur = {(e)=>handleFormData("price", e.target.value)}   className="form-control p-2" />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label ">Service Duration</label>
                        <input required onBlur = {(e)=>handleFormData("duration", e.target.value)} className="form-control p-2" />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Service Thumbnail</label>
                        
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
                
            

                <input  className="btn btn-success mt-4" type="submit" value="Create New Service"/>
                
            </form>
        </div>
    );
};

export default CreateService;