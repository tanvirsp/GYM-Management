import { useEffect, useState } from "react";
import UserStore from "../../store/UserStore";
import toast from "react-hot-toast";
import avater from "../../assets/images/avater.jpg"
import UploadImageStore from "../../store/UploadImageStore";

const ProfileDetails = () => {

    const {Profile, ProfileRequest, UpdateProfileRequest} = UserStore();
    const {ImageUploadRequest} = UploadImageStore();
    const [profileData, setProfileData] = useState({});


    useEffect(()=>{
        (async ()=>{
            Profile === null && await ProfileRequest()
        })()
    },[])

    console.log(profileData);


    const handleImageUpload = async(e) =>{
        e.preventDefault();
 
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        const result = await ImageUploadRequest(formData);
        if(result.status){
            setProfileData({...profileData,[e.target.name]: result.data.filename })   
        } else {
            toast.error("Something Wrong")
        } 
    };


    
    const handleFormData = (name, value)=>{
        setProfileData({
            ...profileData,
            [name]: value
        })
        
    };



    const handleSubmit = async(e) =>{
        e.preventDefault();
        const result = await UpdateProfileRequest(profileData);
        if(result.status ==="success"){
            toast.success("Profile Update Successfully");
            await ProfileRequest()
        } else {
            toast.error("Something Went Wrong");
            
        }
    };



    return (
        <section className=' bg-white p-5 rounded-2 '>
           
            <div className='text-center'>
                {
                    Profile?.imgUrl ? <img className='profile-image'  crossOrigin ="anonymous"  src={ `${import.meta.env.VITE_URL}/${Profile?.imgUrl}`  } alt="Profile" /> : 
                    <img className='profile-image'  src={avater} alt="Image" />
                }

                <div className='my-4 text-start '>
                    <label>Upload Your Profile Picture</label><br />
                    <input className="form-control" type="file" name="imgUrl"onChange={handleImageUpload}/>
                </div>

            </div>
            

            <form onSubmit={handleSubmit} >

                <label>Your Name</label>
                <input onBlur={(e)=>handleFormData("name", e.target.value)} defaultValue={Profile?.name} className='form-control mb-3 p-2' type="text" />

                <label >Your Email </label>
                <input disabled defaultValue={Profile?.email} className='form-control mb-3 p-2' type="email" />

                <label >Role </label>
                <input disabled defaultValue={Profile?.role} className='form-control mb-3 p-2'  />
                
                <label>Address </label>
                <input onBlur={(e)=>handleFormData("address", e.target.value)} defaultValue={Profile?.address} className='form-control mb-3 p-2' type="text" />

                <label>District </label>
                <input onBlur={(e)=>handleFormData("district", e.target.value)} defaultValue={Profile?.district} className='form-control mb-3 p-2' type="text" />

                <label>Mobile </label>
                <input onBlur={(e)=>handleFormData("mobile", e.target.value)} defaultValue={Profile?.mobile} className='form-control mb-3 p-2' type="tel" />

                <input className='btn btn-success w-100 p-3 rounded-2 mt-2' type="submit" value="Update Profile" />


            </form>

   
        </section>
    );
};

export default ProfileDetails;