import { create } from 'zustand'
import axios from 'axios';

const ReportStore = create( (set) =>({

    IncomeTotal: 0,
    InconeDataList: [],
    ReportLoader: false,
   
    IncomeReportRequest: async(date)=>{
        set({IncomeTotal: 0, InconeDataList: [], ReportLoader: true })
        try {
            const res = await axios.post(`/api/v1/incomeReport`, date);
            if(res.data.status === "success"){
                const rows = res.data.data[0]?.Rows || [];
                const total = res.data.data[0]?.Total[0]?.TotalAmount || 0;

                set({InconeDataList: rows, IncomeTotal: total, ReportLoader: false })
                
            } else{
                // Ensure empty state when no data is found
                set({IncomeTotal: 0, InconeDataList: [] , ReportLoader: false})
            }
        } catch (error) {
            console.error("Error fetching service list:", error);
            set({IncomeTotal: 0, InconeDataList: [], ReportLoader: false })
        }

    },


    ExpenseTotal: 0,
    ExpenseDataList: [],
   
    ExpenseReportRequest: async(date)=>{
        set({ExpenseTotal: 0, ExpenseDataList: [], ReportLoader: true })
        try {
            const res = await axios.post(`/api/v1/expenseReport`, date);
            if(res.data.status === "success"){
                const rows = res.data.data[0]?.Rows || [];
                const total = res.data.data[0]?.Total[0]?.TotalAmount || 0;

                set({ExpenseDataList: rows, ExpenseTotal: total , ReportLoader: false})
                
            } else{
                // Ensure empty state when no data is found
                set({ExpenseTotal: 0, ExpenseDataList: [], ReportLoader: false })
            }
        } catch (error) {
            console.error("Error fetching service list:", error);
            set({ExpenseTotal: 0, ExpenseDataList: [], ReportLoader: false })
        }

    },



    DueTotal: 0,
    DueDataList: [],
   
    DueReportRequest: async(date)=>{
        set({DueTotal: 0, DueDataList: [], ReportLoader: true })
        try {
            const res = await axios.post(`/api/v1/dueReport`, date);
            if(res.data.status === "success"){
                const rows = res.data.data[0]?.Rows || [];
                const total = res.data.data[0]?.Total[0]?.TotalAmount || 0;

                set({DueDataList: rows, DueTotal: total, ReportLoader: false })
                
            } else{
                // Ensure empty state when no data is found
                set({DueTotal: 0, DueDataList: [], ReportLoader: false })
            }
        } catch (error) {
            console.error("Error fetching service list:", error);
            set({DueTotal: 0, DueDataList: [], ReportLoader: false })
        }

    },



 



}));

export default ReportStore;