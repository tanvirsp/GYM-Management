import { useForm } from "react-hook-form";
import UserStore from "../../store/UserStore";
import toast from "react-hot-toast";
import { useEffect } from "react";



const CreateUser = () => {
    const {CreateUser, UserListRequest} = UserStore();
    const {register, reset, handleSubmit, formState: { errors }  } = useForm();




    useEffect(()=>{
        (async()=>{
          

        })()
    } ,[])



    const onSubmit = async(data) => {
        
        const result = await CreateUser(data);
        if(result.status ==="success") {
            toast.success("User Created Successfully");
            await UserListRequest();


            reset();
        } else {
            toast.error(result.data)
        }
        
    }



      
    return (
        <div className=" p-5 bg-white rounded-3 border">
          <h5 className="mb-5 text-center">Create New Admin User</h5>
             <form onSubmit={handleSubmit(onSubmit)}>
               
                <label className="form-label">Name</label>
                <input className="form-control" {...register("name", { required: true })} />
                {errors.name && <span className="error-message">This field is required</span>}

                <label className="form-label mt-4">Email</label>
                <input type="email" className="form-control" {...register("email", { required: true })} />
                {errors.email && <span className="error-message">This field is required</span>}

                <label className="form-label mt-4">Password</label>
                <input type="password" className="form-control" {...register("password", { required: true })} />
                {errors.email && <span className="error-message">This field is required</span>}

                <label className="form-label mt-4">Mobile</label>
                <input type="tel" className="form-control" {...register("mobile", { required: true })} />
                {errors.mobile && <span className="error-message">This field is required</span>} 

              
                

       


                <div className="text-end">
                  <input className="btn btn-success mt-4" type="submit" value="Create"/>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;