import { create } from 'zustand'
import axios from 'axios';


const SalaryStore = create((set) =>({
    SalaryLoading: false,
    SalaryList: null,
    SalaryRow: 0,
    AdvanceList: null,
    AdvanceRow: 0,

    SalaryCreate: async(data) =>{
        set({SalaryLoading: true })
        const res = await axios.post(`/api/v1/create-salary`, data);
        set({SalaryLoading: false })
        return res["data"];
    },

   AdvanceSalaryCreate: async(data) =>{
        set({SalaryLoading: true })
        const res = await axios.post(`/api/v1/create-advance-salary`, data);
        set({SalaryLoading: false })
        return res["data"];
    },



    SalaryListRequest: async(pageNumber, perPage, id )=>{
        set({SalaryLoading: true, SalaryList: null, })
        
        try {
            const res = await axios.get(`/api/v1/salary-list/${pageNumber}/${perPage}/${id}`);
            if(res.data.status === "success"){
                const rows = res.data.data[0]?.rows || [];
                const total = res.data.data[0]?.total[0]?.count || 0;
                

                set({SalaryList: rows, SalaryLoading: false, SalaryRow: total  })
                
            } else{
                // Ensure empty state when no data is found
                set({ SalaryList: [], SalaryRow: 0, MemberLoading: false  });
            }

        } catch (error) {
            console.error("Error fetching service list:", error);
            set({ SalaryList: [], SalaryRow: 0, MemberLoading: false  });
        }
    },

    AdvanceListRequest: async(pageNumber, perPage, id )=>{
        set({SalaryLoading: true, AdvanceList: null, })
        
        try {
            const res = await axios.get(`/api/v1/advance-list/${pageNumber}/${perPage}/${id}`);
            if(res.data.status === "success"){
                const rows = res.data.data[0]?.rows || [];
                const total = res.data.data[0]?.total[0]?.count || 0;
                

                set({AdvanceList: rows, SalaryLoading: false, AdvanceRow: total  })
                
            } else{
                // Ensure empty state when no data is found
                set({ AdvanceList: [], AdvanceRow: 0, SalaryLoading: false  });
            }

        } catch (error) {
            console.error("Error fetching service list:", error);
            set({ AdvanceList: [], AdvanceRow: 0, SalaryLoading: false  });
        }
    },



}));

export default SalaryStore;