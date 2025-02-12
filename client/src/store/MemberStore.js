import { create } from 'zustand'
import axios from 'axios';

const MemberStore = create( (set) =>({

    MemberLoading: false,
    MemberList: null,
    MemberListRequest: async()=>{
        set({MemberLoading: true, MemberList: null })
        
        const res = await axios.get(`/api/v1/members`);
        if(res.data.status === "success"){
            set({MemberList: res.data.data, MemberLoading: false, })
        }
    },

    CreateMemberRequest: async(data) =>{
        const res = await axios.post(`/api/v1/member`, data);
        return res["data"];
    },

    
    
    MemberDetails: null,
    MemberDetailsRequest: async(id) =>{
        set({MemberDetails: null, MemberLoading: true})
        const res = await axios.get(`/api/v1/package/${id}`);
        if(res.data.status === "success"){
            set({MemberDetails: res.data.data[0], MemberLoading: false, })
        }

    }



}));

export default MemberStore;