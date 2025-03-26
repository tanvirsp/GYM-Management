import { create } from 'zustand'
import axios from 'axios';

const ServiceStore = create( (set) =>({

    ServiceLoading: false,
    ServiceList: null,
    ServiceTotal: 0,
    ServiceFormData: null,
    ServiceDropdown: null,


    ServiceDropdownRequest:  async()=>{
        set({PackageDropdown: null, PackageLoading: true, });
        const res = await axios.get(`/api/v1/service-dropdown`);
        if(res.data.status === "success"){
            set({ServiceDropdown: res.data.data, ServiceLoading: false, })
        }

    },


    ServiceListRequest: async(pageNumber, perPage, searchKeyword )=>{
        set({ServiceLoading: true, ServiceList: null,  ServiceTotal: 0, })
        
        try {
            const res = await axios.get(`/api/v1/service-list/${pageNumber}/${perPage}/${searchKeyword}`);
            if(res.data.status === "success"){
                const rows = res.data.data[0]?.rows || [];
                const total = res.data.data[0]?.total[0]?.count || 0;

                set({ServiceList: rows, ServiceLoading: false, ServiceTotal: total })
                
            } else{
                // Ensure empty state when no data is found
                set({ ServiceList: [], ServiceTotal: 0, ServiceLoading: false });
            }

        } catch (error) {
            console.error("Error fetching service list:", error);
            set({ ServiceList: [], ServiceTotal: 0, ServiceLoading: false });
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