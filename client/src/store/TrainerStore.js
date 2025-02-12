import { create } from 'zustand'
import axios from 'axios';

const TrainerStore = create( (set) =>({

    TrainerLoading: false,
    TrainerList: [],
    TrainerTotal: 0,
    TrainerFormData: null,


    TrainerListRequest: async(pageNumber, perPage, searchKeyword )=>{
        set({TrainerLoading: true, TrainerList: null })
        
        const res = await axios.get(`/api/v1/Trainer-list/${pageNumber}/${perPage}/${searchKeyword}`);
        if(res.data.status === "success"){
            set({TrainerList: res.data.data[0].rows, TrainerLoading: false, TrainerTotal: res.data.data[0].total[0].count })
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
        const res = await axios.post(`/api/v1/trainer`, data);
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

    }


}));

export default TrainerStore;