import { create } from 'zustand'
import axios from 'axios';


const PaymentStore = create((set) =>({
    PaymentLoading: false,

    CreatePaymentRequest: async(data) =>{
        set({PaymentLoading: true })
        const res = await axios.post(`/api/v1/payment`, data);
        set({PaymentLoading: false })
        return res["data"];
    },



}));

export default PaymentStore;