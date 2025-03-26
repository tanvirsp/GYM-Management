import { create } from 'zustand'
import axios from 'axios';

const DashboardStore = create( (set) =>({


    TotalTrainers: 0,
    ActiveMembers: 0,
    ExpireMembers: 0,
    TotalDuePayment: 0,
    TotalCollection: 0,
    TotalExpense: 0,
    Admins: 0,
    SalaryDue: 0,
    MonthlyReport: [],

    TotalTrainerRequest: async() =>{
        set({TotalTrainers: 0,  ActiveMembers: 0, TotalCollection: 0,  ExpireMembers: 0, Admins:0 ,  TotalDuePayment: 0,  TotalExpense: 0, SalaryDue: 0 })
        const res = await axios.get(`/api/v1/total`);
        if(res.data.status === "success"){
            set({TotalTrainers: res.data.trainers, 
                ActiveMembers: res.data.activeMembers, 
                ExpireMembers: res.data.expireMembers,
                Admins: res.data.admins,
                TotalDuePayment: res.data.totalDue,
                TotalExpense: res.data.totalExpense,
                SalaryDue: res.data.salaryDue,
                TotalCollection: res.data.totalCollection,
               })
        }

    },
    
    MonthlyReportRequest: async(year) =>{
        set({ MonthlyReport: [] })
        const res = await axios.get(`/api/v1/monthlyReport/${year}`);
        if(res.data.status === "success"){
            set({ MonthlyReport: res.data.data })
        }

    }


   

}));

export default DashboardStore;