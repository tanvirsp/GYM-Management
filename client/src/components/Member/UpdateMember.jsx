import { useEffect, useState } from "react";
import LoadingSkeleton from "../../skeletons/LoadingSkeleton";
import MemberStore from "../../store/MemberStore";
import PackageStore from "../../store/PackageStore";
import ServiceStore from "../../store/ServiceStore";
import UploadImageStore from "../../store/UploadImageStore";
import { useNavigate, useParams } from "react-router-dom";
import FullScreenLoader from "../../layout/FullScreenLoader";
import toast from "react-hot-toast";



const UpdateMember = () => {
    const {OnChangMemberFormData, MemberFormData, MemberDetailsRequest, UpdateMemberRequest} = MemberStore();
    const {PackageDropdown,  PackageDropdownRequest} = PackageStore()
    const {ServiceDropdownRequest,  ServiceDropdown} = ServiceStore()
    const {ImageUploadRequest, ImageLoading} = UploadImageStore();

    


    //local State
    const [gymPackage, ] = useState({})
    const [gymService,] = useState([])

    
    const {id} = useParams();

           
        useEffect( ()=>{
            (async()=>{
                id && await MemberDetailsRequest(id);
            })()
        } ,[id])



       useEffect( ()=>{
        ( async()=>{

            PackageDropdown === null && await PackageDropdownRequest();
            ServiceDropdown === null && await ServiceDropdownRequest();
        })()
       }, [] )


   
       
       

       
    if(MemberFormData=== null){
        return <FullScreenLoader />
    }
    


    const handleImage = async(e) =>{
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        const result = await ImageUploadRequest(formData);
        if(result.status){
            OnChangMemberFormData("imgUrl", result.data.filename )
            
        } 
    };


    const toggleService = (obj) =>{
        const exit = MemberFormData.services.find( item =>item._id === obj._id );
            if(!exit){
                OnChangMemberFormData("services", [...MemberFormData.services, obj ])
               
            } else {
                const otherData = MemberFormData.services.filter( item =>item._id !== obj._id );
                OnChangMemberFormData("services", [...otherData])
               
            }
    
       };




    const handleSubmit = async(e)=>{
        e.preventDefault();

        console.log(MemberFormData);
        
        const result = await UpdateMemberRequest(id, MemberFormData);
        if(result.status ==="success"){
            toast.success("Member Update Successfully");
            
            // navigate("/member-details/"+id)

        } else{
            toast.error("Something Went Wrong!!")
        }
    }


    return (
        <section>

            <div className='bg-white rounded-3 p-5'>
             <h4 className="mb-5">Update GYM Member</h4>
                <form onSubmit={handleSubmit}  > 
                    <div className="row">
                        <div className="col-md-3">
                            <label className="form-label ">Member ID</label>
                            <input required onBlur = {(e)=>OnChangMemberFormData("memberID", e.target.value)} defaultValue={MemberFormData.memberID}  className="form-control p-2" />

                            <label className="form-label mt-3 ">Name</label>
                            <input required onBlur = {(e)=>OnChangMemberFormData("name", e.target.value)} defaultValue={MemberFormData.name}   className="form-control p-2" />

                        </div>
                        <div className="col-md-3">
                            <label className="form-label ">Father Name</label>
                            <input required onBlur = {(e)=>OnChangMemberFormData("fatherName", e.target.value)} defaultValue={MemberFormData.fatherName}    className="form-control p-2" />

                            <label className="form-label mt-3 ">Phone</label>
                            <input required onBlur = {(e)=>OnChangMemberFormData("phone", e.target.value)}  defaultValue={MemberFormData.phone}   className="form-control p-2" />


                        </div>
                        <div className="col-md-3">
                            <label className="form-label ">Address</label>
                            <input required onBlur = {(e)=>OnChangMemberFormData("address", e.target.value)} defaultValue={MemberFormData.address}  className="form-control p-2" />


                        </div>
                        <div className="col-md-3">
                            <label className="form-label ">Picture</label>
                            
                                { ImageLoading && <LoadingSkeleton />}  
                                {
                                MemberFormData?.imgUrl ? <div className="text-center"> <img className="form-member-pic" crossOrigin ="anonymous"  
                                                            src={`${import.meta.env.VITE_URL}/${MemberFormData.imgUrl}`} alt="Avatar" /> <br/>
                                                            <button onClick={()=>OnChangMemberFormData("imgUrl", "") } className="btn btn-danger  mt-2">Remove</button>
                                                    </div> : 
                                                    <input onChange={handleImage} name='imgUrl' type="file" className='form-control'  /> 
                                }

                        </div>
                    </div>
                    <hr />
                    <label className="form-label my-3 ">Select Package</label>
                    <div className="row">
                        {
                            PackageDropdown === null ? <p>Loading...</p>:
                            PackageDropdown.length === 0 ? <p>No Package Available</p>:
                            PackageDropdown.map( (item, index) =>{
                                return(
                                    <div key={index} className="col-md-2">
                                        <div className={MemberFormData.packageID === item._id ? "active-card": "show-card" }>
                                       
                                            <h6>{item.name}</h6>
                                            <h2>{item.price} <span>tk</span></h2>
                                            <p>{item.duration}</p>
                                            {
                                                gymPackage._id ===item._id ?  
                                                <a >SELECTED</a> :
                                                <a onClick={()=>OnChangMemberFormData("packageID", item._id)}>SELECT</a>
                                            }
                                        </div>
                                    </div>
                                )
                            } )
                        }        
                    </div>
                   <hr />
                    <label className="form-label my-3 ">Select Service [Optional]</label>
                    
                    <div className="row ">
                        {
                            ServiceDropdown === null ? <p>Loading...</p>:
                            ServiceDropdown.length === 0 ? <p>No Service Available</p>:
                            ServiceDropdown.map( (item, index) =>{
                                return(
                                    <div key={index} className="col-md-2">
                                        <div className={MemberFormData.services.some(arr => arr._id === item._id )  ? "active-card": "show-card" }>
                                        {/* <img  src={`${import.meta.env.VITE_URL}/${item.imgUrl}`} alt="thumbnail" crossOrigin ="anonymous" /> */}
                                            <h6>{item.name}</h6>
                                            <h2>{item.price} <span>tk</span></h2>
                                            <p>{item.duration}</p>
                                            
                                            {
                                                gymService.some(arr => arr._id === item._id )  ? 
                                                <a onClick={()=>toggleService(item)} >SELECTED</a> :
                                                <a onClick={()=>toggleService(item)}>SELECT</a> 
                                            }
                                           
                                        </div>
                                    </div>
                                )
                            } )
                        }        
                    </div>
                 


                    <input  className="btn btn-success mt-5 px-5" type="submit" value="Update"/>
                    
                </form>
            </div>



        </section>
    );
};

export default UpdateMember;