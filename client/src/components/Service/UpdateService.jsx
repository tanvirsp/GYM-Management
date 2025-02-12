
import UploadImageStore from "../../store/UploadImageStore";
import LoadingSkeleton from "../../skeletons/LoadingSkeleton";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import FullScreenLoader from "../../layout/FullScreenLoader";
import ServiceStore from "../../store/ServiceStore";


const UpdateService = () => {
    const { ServiceFormData, OnChangServiceFormData, ServiceListRequest, ServiceDetailsRequest, UpdateServiceRequest} = ServiceStore();
    const {ImageUploadRequest, ImageLoading} = UploadImageStore();
    const navigate = useNavigate();

    const {id} = useParams();


    //updating data
    useEffect( ()=>{
        (async()=>{
            id && await ServiceDetailsRequest(id);
        })()
    } ,[id])

    console.log(ServiceFormData);



    if(ServiceFormData=== null){
        return <FullScreenLoader />
    }
    



    const handleImage = async(e) =>{
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        const result = await ImageUploadRequest(formData);
        if(result.status){
            OnChangServiceFormData("imgUrl", result.data.filename )
            
        } 
    };
   

    const handleSubmit = async(e)=>{
        e.preventDefault();
       
        const result = await UpdateServiceRequest(id, ServiceFormData);
        if(result.status ==="success"){
            toast.success("Service Update Successfully");
            
            await ServiceListRequest(1, 20, 0)
            e.target.reset();
            navigate("/service-list")

        } else{
            toast.error("Something Went Wrong!!")
        }
    }

  
    return (
        <div className=" p-5 bg-white rounded-3  ">
            <h4 className="mb-5">Update Service</h4>
            <form onSubmit={handleSubmit}  > 
                <div className="row">
                    <div className="col-md-3">
                        <label className="form-label ">Package Name</label>
                        <input required onBlur = {(e)=>OnChangServiceFormData("name", e.target.value)} defaultValue={ServiceFormData.name}  className="form-control p-2" />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label ">Package Price</label>
                        <input required onBlur = {(e)=>OnChangServiceFormData("price", e.target.value)} defaultValue={ServiceFormData.price}   className="form-control p-2" />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label ">Package Duration</label>
                        <input required onBlur = {(e)=>OnChangServiceFormData("duration", e.target.value)} defaultValue={ServiceFormData.duration}  className="form-control p-2" />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label ">Package Thumbnail</label>
                        
                            { ImageLoading && <LoadingSkeleton />}  
                            {
                            ServiceFormData.imgUrl ? <div className="text-center"> <img className="form-member-pic" crossOrigin ="anonymous"  
                                                        src={`${import.meta.env.VITE_URL}/${ServiceFormData.imgUrl}`} alt="Avatar" /> <br/>
                                                        <button onClick={()=>OnChangServiceFormData("imgUrl", "") } className="btn btn-danger  mt-2">Remove</button>
                                                </div> : 
                                                <input onChange={handleImage} name='imageUrl' type="file" className='form-control'  /> 
                            }

                    </div>
                </div>
                
            

                <input  className="btn btn-info mt-4" type="submit" value="Update Package"/>
                
            </form>
        </div>
    );
};

export default UpdateService;