import { useForm } from "react-hook-form";


const CreatePayment = () => {

    const {register, reset, handleSubmit, formState: { errors }  } = useForm();

    const onSubmit = async(data) => {
        console.log(data);

        //  const res = await CreatePackageRequest(data);
        //  if(res.status==="success"){
        //     await AllPackageRequest();
        //     toast.success("Package Added successfully");
        //     reset()
         
        // }
   
      }

    return (
        <div className=" p-5 bg-white rounded-3 border  ">
            <h4 className="mb-5">Make Payment</h4>
            <form onSubmit={handleSubmit(onSubmit)}>   
            
                <label className="form-label">Amount</label>
                <input className="form-control" {...register("amount", { required: true })}  />
                {errors.title && <span className="error-message">This field is required</span>}

                <label className="form-label mt-3">memberID</label>
                <input className="form-control" {...register("memberID", { required: true })}  />
                {errors.price && <span className="error-message">This field is required</span>}

                <label  className="form-label mt-3">Expire Date</label>
                <input  {...register("expireDate")} type="expireDate"  className="form-control p-3" />

                <label className="form-label mt-3">Description</label>
                <input className="form-control" {...register("des", { required: true })}  />
                {errors.des && <span className="error-message">This field is required</span>}
            
            
                <input className="btn btn-success mt-4" type="submit" value="Create New Package"/>
                
            </form>
        </div>
    );
};

export default CreatePayment;