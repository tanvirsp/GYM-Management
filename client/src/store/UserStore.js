import { create } from 'zustand'
import axios from 'axios';
import Cookies from "js-cookie";
import { getEmail, setEmail } from '../helper/SessionHelper';




const UserStore = create( (set)=>({
    
    isLogin:()=>{

        return !!Cookies.get('token');
    },

    Loading: null,


    CreateUser: async(data) =>{
        const res = await axios.post(`/api/v1/register`, data);
        return res["data"]
    },


    UserList : null,
    UserListRequest: async() =>{
        set({UserList: null})
        const res = await axios.get(`/api/v1/users`);
        set({UserList: res["data"]["data"]})
    },


   
    LoginRequest: async(data) =>{
        set({Loading: true})
        const res = await axios.post(`/api/v1/login`, data);
        set({Loading: null})
        return res["data"]
    },





    
    Profile: null,
    ProfileRequest: async() =>{
        set({Profile: null})
        const res = await axios.get(`/api/v1/user-profile` );
        set({Profile: res["data"]["data"][0]})
    },

    

    

    ChangePasswordRequest: async(data) =>{
        const res = await axios.post(`/api/v1/change-password`, data );
        return res["data"]
    },

    
    LogoutRequest: async() =>{
    const res = await axios.get(`/api/v1/logout` );
    return res["data"]

    },



    OtpProcessing: false,

    EmailVerifyRequest: async(email) =>{
        set({OtpProcessing: true});
        setEmail(email)
        const res = await axios.get(`/api/v1/send-otp/${email}`, );
        set({OtpProcessing: false});
        return res["data"]
    },

    OtpVerifyRequest: async(otp) =>{
        const email = getEmail()
        const res = await axios.get(`/api/v1/verify-otp/${email}/${otp}`);
        return res["data"]

    }, 

    
    ResetPasswordRequest: async(newPassword) =>{
        //taking email from local store
        const email = getEmail()
        const data = {newPassword, email}
        const res = await axios.post(`/api/v1/reset-password`, data );
        return res["data"]
    },


  
    
   
    UpdateProfileRequest: async(data) =>{
        const res = await axios.post(`/api/v1/update-profile`, data );
        return res.data;
    },



    




} ))


export default UserStore;