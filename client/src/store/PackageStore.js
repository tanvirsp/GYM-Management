import { create } from 'zustand'
import axios from 'axios';

const PackageStore = create( (set) =>({

    PackageLoading: false,
    PackageList: null,
    PackageTotal: 0,
    PackageFormData: null,
    PackageDropdown: null,


    PackageDropdownRequest:  async()=>{
        set({PackageDropdown: null, PackageLoading: true, });
        const res = await axios.get(`/api/v1/package-dropdown`);
        if(res.data.status === "success"){
            set({PackageDropdown: res.data.data, PackageLoading: false, })
        }

    },



    PackageListRequest: async(pageNumber, perPage, searchKeyword )=>{
        set({PackageLoading: true, PackageList: null })
        
        try {
            const res = await axios.get(`/api/v1/package-list/${pageNumber}/${perPage}/${searchKeyword}`);
            if(res.data.status === "success"){
                const rows = res.data.data[0]?.rows || [];
                const total = res.data.data[0]?.total[0]?.count || 0;

                set({PackageList: rows, PackageLoading: false, PackageTotal: total })
                
            } else{
                // Ensure empty state when no data is found
                set({ PackageList: [], PackageTotal: 0, PackageLoading: false });
            }

        } catch (error) {
            console.error("Error fetching service list:", error);
            set({ PackageList: [], PackageTotal: 0, PackageLoading: false });
        }
    },


    OnChangPackageFormData: async(key, value) => {
        set((state) => ({
            PackageFormData: {
                ...state.PackageFormData,
                [key]: value
            }
        }));
    },



    CreatePackageRequest: async(data) =>{
        const res = await axios.post(`/api/v1/package`, data);
        return res["data"];
    },


    UpdatePackageRequest: async(id, data) =>{
        const res = await axios.post(`/api/v1/package-update/${id}`, data);
        return res["data"];
    },

    DeletePackageRequest: async(id) =>{
        const res = await axios.delete(`/api/v1/package/${id}`);
        return res["data"];
    },



    PackageDetailsRequest: async(id) =>{
        set({PackageFormData: null, PackageLoading: true, })
        const res = await axios.get(`/api/v1/package/${id}`);
        if(res.data.status === "success"){
            set({PackageFormData: res.data.data[0], PackageLoading: false, })
        }

    },

  

}));

export default PackageStore;