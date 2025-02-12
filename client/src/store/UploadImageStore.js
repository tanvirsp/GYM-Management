import { create } from 'zustand'
import axios from 'axios';

const UploadImageStore = create( (set) =>({

    ImageLoading: false,
    ImageUploadRequest: async(data) =>{
        set({ImageLoading: true,})
        const res = await axios.post(`/api/v1/file-upload`, data);
        set({ImageLoading: false,})
        return res["data"];
    },




}));

export default UploadImageStore;