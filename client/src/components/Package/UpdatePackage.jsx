
import PackageStore from "../../store/PackageStore";
// import toast from "react-hot-toast";
import UploadImageStore from "../../store/UploadImageStore";
import LoadingSkeleton from "../../skeletons/LoadingSkeleton";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import FullScreenLoader from "../../layout/FullScreenLoader";


const UpdatePackage = () => {
    const {PackageFormData, OnChangPackageFormData, PackageListRequest, PackageDetailsRequest, UpdatePackageRequest} = PackageStore();
    const {ImageUploadRequest, ImageLoading} = UploadImageStore();
    const navigate = useNavigate();

    const {id} = useParams();


    //updating data
    useEffect( ()=>{
        (async()=>{
            id && await PackageDetailsRequest(id);
        })()
    } ,[id])



    if(PackageFormData=== null){
        return <FullScreenLoader />
    }
    



    const handleImage = async(e) =>{
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        const result = await ImageUploadRequest(formData);
        if(result.status){
            OnChangPackageFormData("imgUrl", result.data.filename )
            
        } 
    };
   

    const handleSubmit = async(e)=>{
        e.preventDefault();
       
        const result = await UpdatePackageRequest(id, PackageFormData);
        if(result.status ==="success"){
            toast.success("Package Update Successfully");
            
            await PackageListRequest(1, 20, 0)
            e.target.reset();
            navigate("/package-list")

        } else{
            toast.error("Something Went Wrong!!")
        }
    }

  
    return (
        <div className=" p-5 bg-white rounded-3  ">
            <h4 className="mb-5">Update Package</h4>
            <form onSubmit={handleSubmit}  > 
                <div className="row">
                    <div className="col-md-3">
                        <label className="form-label ">Package Name</label>
                        <input required onBlur = {(e)=>OnChangPackageFormData("name", e.target.value)} defaultValue={PackageFormData.name}  className="form-control p-2" />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label ">Package Price</label>
                        <input required onBlur = {(e)=>OnChangPackageFormData("price", e.target.value)} defaultValue={PackageFormData.price}   className="form-control p-2" />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label ">Package Duration</label>
                        <input required onBlur = {(e)=>OnChangPackageFormData("duration", e.target.value)} defaultValue={PackageFormData.duration}  className="form-control p-2" />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label ">Package Thumbnail</label>
                        
                            { ImageLoading && <LoadingSkeleton />}  
                            {
                            PackageFormData.imgUrl ? <div className="text-center"> <img className="form-member-pic" crossOrigin ="anonymous"  
                                                        src={`${import.meta.env.VITE_URL}/${PackageFormData.imgUrl}`} alt="Avatar" /> <br/>
                                                        <button onClick={()=>OnChangPackageFormData("imgUrl", "") } className="btn btn-danger  mt-2">Remove</button>
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

export default UpdatePackage;