import { create } from 'zustand'
import axios from 'axios';

const TrainerStore = create( (set) =>({

    TrainerLoading: false,
    TrainerList: null,
    TrainerTotal: 0,
    TrainerFormData: null,
    TrainerDropdown: null,


    TrainerListRequest: async(pageNumber, perPage, searchKeyword )=>{
        set({TrainerLoading: true, TrainerList: null })
        
        try {
            const res = await axios.get(`/api/v1/trainer-list/${pageNumber}/${perPage}/${searchKeyword}`);
            if(res.data.status === "success"){
                const rows = res.data.data[0]?.rows || [];
                const total = res.data.data[0]?.total[0]?.count || 0;

                set({TrainerList: rows, TrainerLoading: false, TrainerTotal: total })
                
            } else{
                // Ensure empty state when no data is found
                set({ TrainerList: [], TrainerTotal: 0, TrainerLoading: false });
            }

        } catch (error) {
            console.error("Error fetching service list:", error);
            set({ TrainerList: [], TrainerTotal: 0, TrainerLoading: false });
        }

    },


    OnChangTrainerFormData: async(key, value) => {
        set((state) => ({
            TrainerFormData: {
                ...state.TrainerFormData,
                [key]: value
            }
        }));
    },


    CreateTrainerRequest: async(data) =>{
        const res = await axios.post(`/api/v1/create-trainer`, data);
        return res["data"];
    },


    UpdateTrainerRequest: async(id, data) =>{
        const res = await axios.post(`/api/v1/trainer-update/${id}`, data);
        return res["data"];
    },

    DeleteTrainerRequest: async(id) =>{
        const res = await axios.delete(`/api/v1/trainer/${id}`);
        return res["data"];
    },



    TrainerDetailsRequest: async(id) =>{
        set({TrainerFormData: null, TrainerLoading: true, })
        const res = await axios.get(`/api/v1/trainer/${id}`);
        if(res.data.status === "success"){
            set({TrainerFormData: res.data.data[0], TrainerLoading: false, })
        }

    },

    TrainerDropdownRequest: async() =>{
        set({TrainerDropdown: null, TrainerLoading: true, })
        const res = await axios.get(`/api/v1/trainer-dropdown`, );
        if(res.data.status === "success"){
            set({TrainerDropdown: res.data.data, TrainerLoading: false, })
        }
    },

    ResetTrainerData: async() =>{
        set({TrainerFormData: null})
    }


}));

export default TrainerStore;