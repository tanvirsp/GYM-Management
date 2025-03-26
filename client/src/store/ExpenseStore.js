import { create } from 'zustand'
import axios from 'axios';

const ExpenseStore = create( (set) =>({

    ExpenseLoading: false,
    ExpenseList: null,
    ExpenseTotal: 0,
    ExpenseFormData: null,


    ExpenseListRequest: async(pageNumber, perPage, searchKeyword )=>{
        set({ExpenseList: null,  ExpenseTotal: 0, })
        
        try {
            const res = await axios.get(`/api/v1/expense-list/${pageNumber}/${perPage}/${searchKeyword}`);
            if(res.data.status === "success"){
                const rows = res.data.data[0]?.rows || [];
                const total = res.data.data[0]?.total[0]?.count || 0;

                set({ExpenseList: rows,  ExpenseTotal: total })
                
            } else{
                // Ensure empty state when no data is found
                set({ ExpenseList: [], ExpenseTotal: 0});
            }

        } catch (error) {
            console.error("Error fetching service list:", error);
            set({ ExpenseTypeList: [], ExpenseTypeTotal: 0 });
        }
    },


    CreateExpenseRequest: async(data) =>{
        const res = await axios.post(`/api/v1/expense`, data);
        return res["data"];
    },


    UpdateExpense: async(id, data) =>{
        const res = await axios.post(`/api/v1/expense-update/${id}`, data);
        return res["data"];
    },



    ExpenseDetailsRequest: async(id) =>{
        set({ExpenseTypeFormData: null,  Loading: true, })
        const res = await axios.get(`/api/v1/expense/${id}`);
        if(res.data.status === "success"){
            set({ExpenseFormData: res.data.data[0],  ExpenseLoading: false, })
        }

    }


}));

export default ExpenseStore;