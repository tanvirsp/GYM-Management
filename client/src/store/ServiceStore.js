import { create } from 'zustand'
import axios from 'axios';

const ServiceStore = create( (set) =>({

    ServiceLoading: false,
    ServiceList: [],
    ServiceTotal: 0,
    ServiceFormData: null,


    ServiceListRequest: async(pageNumber, perPage, searchKeyword )=>{
        set({ServiceLoading: true, ServiceList: null })
        
        const res = await axios.get(`/api/v1/service-list/${pageNumber}/${perPage}/${searchKeyword}`);
        if(res.data.status === "success"){
            set({ServiceList: res.data.data[0].rows, ServiceLoading: false, ServiceTotal: res.data.data[0].total[0].count })
        }
    },


    OnChangServiceFormData: async(key, value) => {
        set((state) => ({
            ServiceFormData: {
                ...state.ServiceFormData,
                [key]: value
            }
        }));
    },



    CreateServiceRequest: async(data) =>{
        const res = await axios.post(`/api/v1/service`, data);
        return res["data"];
    },


    UpdateServiceRequest: async(id, data) =>{
        const res = await axios.post(`/api/v1/service-update/${id}`, data);
        return res["data"];
    },

    DeleteServiceRequest: async(id) =>{
        const res = await axios.delete(`/api/v1/service/${id}`);
        return res["data"];
    },



    ServiceDetailsRequest: async(id) =>{
        set({ServiceFormData: null, ServiceLoading: true, })
        const res = await axios.get(`/api/v1/service/${id}`);
        if(res.data.status === "success"){
            set({ServiceFormData: res.data.data[0], ServiceLoading: false, })
        }

    }


}));

export default ServiceStore;