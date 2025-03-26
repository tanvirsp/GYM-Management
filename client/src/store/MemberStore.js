import { create } from 'zustand'
import axios from 'axios';


const MemberStore = create((set) =>({

    MemberLoading: false,
    MemberList: null,
    MemberTotal: 0,
    MemberDueList: null,
    MemberDueRow: 0,

    MemberPaymentList: null,
    MemberPaymentRow: 0,

    MemberFormData: null,
    MemberDueAmount: 0,


    MemberPaymentListRequest: async(pageNumber, perPage, id )=>{
        set({MemberLoading: true, MemberPaymentList: null })
        
        try {
            const res = await axios.get(`/api/v1/member-payment-list/${pageNumber}/${perPage}/${id}`);
            if(res.data.status === "success"){
                const rows = res.data.data[0]?.rows || [];
                const total = res.data.data[0]?.total[0]?.count || 0;

                set({MemberPaymentList: rows, MemberLoading: false, MemberPaymentRow: total })
                
            } else{
                // Ensure empty state when no data is found
                set({ MemberPaymentList: [], MemberPaymentRow: 0, MemberLoading: false });
            }

        } catch (error) {
            console.error("Error fetching service list:", error);
            set({ MemberPaymentList: [], MemberPaymentRow: 0, MemberLoading: false });
        }
    },




    MemberDueListRequest: async(pageNumber, perPage, id )=>{
        set({MemberLoading: true, MemberDueList: null, MemberDueAmount: 0 })
        
        try {
            const res = await axios.get(`/api/v1/member-due-list/${pageNumber}/${perPage}/${id}`);
            if(res.data.status === "success"){
                const rows = res.data.data[0]?.rows || [];
                const total = res.data.data[0]?.total[0]?.count || 0;
                const dueAmount = res.data.data[0]?.due[0]?.totalDue || 0;

                set({MemberDueList: rows, MemberLoading: false, MemberDueRow: total, MemberDueAmount:dueAmount  })
                
            } else{
                // Ensure empty state when no data is found
                set({ MemberDueList: [], MemberDueRow: 0, MemberLoading: false, MemberDueAmount: 0  });
            }

        } catch (error) {
            console.error("Error fetching service list:", error);
            set({ MemberDueList: [], MemberDueRow: 0, MemberLoading: false, MemberDueAmount: 0  });
        }
    },




    MemberListRequest: async(pageNumber, perPage, searchKeyword )=>{
        set({MemberLoading: true, MemberList: null })
        
        try {
            const res = await axios.get(`/api/v1/member-list/${pageNumber}/${perPage}/${searchKeyword}`);
            if(res.data.status === "success"){
                const rows = res.data.data[0]?.rows || [];
                const total = res.data.data[0]?.total[0]?.count || 0;

                set({MemberList: rows, MemberLoading: false, MemberTotal: total })
                
            } else{
                // Ensure empty state when no data is found
                set({ MemberList: [], MemberTotal: 0, MemberLoading: false });
            }

        } catch (error) {
            console.error("Error fetching service list:", error);
            set({ MemberList: [], MemberTotal: 0, MemberLoading: false });
        }
    },


    OnChangMemberFormData: async(key, value) => {
        set((state) => ({
            MemberFormData: {
                ...state.MemberFormData,
                [key]: value
            }
        }));
    },



    CreateMemberRequest: async(data) =>{
        const res = await axios.post(`/api/v1/member`, data);
        return res["data"];
    },


    UpdateMemberRequest: async(id, data) =>{
        const res = await axios.post(`/api/v1/member-update/${id}`, data);
        return res["data"];
    },


    // DeleteMemberRequest: async(id) =>{
    //     const res = await axios.delete(`/api/v1/member/${id}`);
    //     return res["data"];
    // },




    MemberDetailsRequest: async(id) =>{
        set({MemberFormData: null, MemberLoading: true, })
        const res = await axios.get(`/api/v1/member/${id}`);
        if(res.data.status === "success"){
            set({MemberFormData: res.data.data[0], MemberLoading: false, })
        }

    }





}));

export default MemberStore;