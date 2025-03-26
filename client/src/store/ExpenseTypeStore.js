import { create } from 'zustand'
import axios from 'axios';

const ExpenseTypeStore = create( (set) =>({

    Loading: false,
    ExpenseTypeList: null,
    ExpenseTypeTotal: 0,
    ExpenseTypeDropdown: null,


    ExpenseTypeDropdownRequest:  async()=>{
        set({ExpenseTypeDropdown: null,  });
        const res = await axios.get(`/api/v1/expense-type-dropdown`);
        if(res.data.status === "success"){
            set({ExpenseTypeDropdown: res.data.data})
        }

    },


    ExpenseTypeListRequest: async(pageNumber, perPage, searchKeyword )=>{
        set({ExpenseTypeList: null,  ExpenseTypeTotal: 0, })
        
        try {
            const res = await axios.get(`/api/v1/expense-type-list/${pageNumber}/${perPage}/${searchKeyword}`);
            if(res.data.status === "success"){
                const rows = res.data.data[0]?.rows || [];
                const total = res.data.data[0]?.total[0]?.count || 0;

                set({ExpenseTypeList: rows,  ExpenseTypeTotal: total })
                
            } else{
                // Ensure empty state when no data is found
                set({ ExpenseTypeList: [], ExpenseTypeTotal: 0});
            }

        } catch (error) {
            console.error("Error fetching service list:", error);
            set({ ExpenseTypeList: [], ExpenseTypeTotal: 0 });
        }
    },


    CreateExpenseTypeRequest: async(data) =>{
        const res = await axios.post(`/api/v1/expense-type`, data);
        return res["data"];
    },


    UpdateExpenseType: async(id, data) =>{
        const res = await axios.post(`/api/v1/expense-type-update/${id}`, data);
        return res["data"];
    },



    ExpenseTypeDetailsRequest: async(id) =>{
        set({ExpenseTypeFormData: null,  Loading: true, })
        const res = await axios.get(`/api/v1/expense-type/${id}`);
        if(res.data.status === "success"){
            set({ExpenseTypeFormData: res.data.data[0],  Loading: false, })
        }

    }


}));

export default ExpenseTypeStore;