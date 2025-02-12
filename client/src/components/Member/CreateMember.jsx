import { useEffect, useState } from 'react';
import PackageStore from '../../store/PackageStore';
import MemberStore from '../../store/MemberStore';
import { useForm } from 'react-hook-form';
import UploadImageStore from '../../store/UploadImageStore';
import toast from 'react-hot-toast';
import LoadingSkeleton from '../../skeletons/LoadingSkeleton';
import { Table } from 'react-bootstrap';

const CreateMember = () => {

    const { PackageDetailsRequest, PackageDetails} = PackageStore() ;
   const {CreateMemberRequest} = MemberStore()

   const [due, setDue] =useState(0);
   const [pay, setPay] =useState(0);
   const [imageData, setImageData] = useState({})

   const {  register, handleSubmit, watch,  formState: { errors }   } = useForm();

    //Global Store
    const{AllPackageRequest, AllPackage} = PackageStore();
    const {ImageUploadRequest, ImageLoading} = UploadImageStore()

    useEffect(()=>{
        (async()=>{
            AllPackage === null && await AllPackageRequest()
        } )()
    } ,[])


    const handleGymPackage = async(e) =>{
        await PackageDetailsRequest(e.target.value)
    }

    


    //totol Pay
    let total = 0
    if(PackageDetails){
        total = Number(PackageDetails?.price);
        
    }
    if(watch("treadmill")){
        total +=  Number(100 )
    }
    if(watch("locker")){
        total +=  Number(200 )
      
    }

    
    const handlePay = (value)=>{
        setDue(total - Number(value))   
        setPay(Number (value))   
    }

    const handleDiscount = (value)=>{
        const totalPay = pay + Number(value);
        const newDue = total - totalPay;
        setDue(newDue)
  
    }


    
    const handleImage = async(e) =>{
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        const result = await ImageUploadRequest(formData);
        if(result.status){
            setImageData({
                [e.target.name]: result.data.filename
            })
        } 
    };
   


    const onSubmit = async(data) => {
        const allData = {
            ...data,
            paidAmount: pay,
            totalAmount: total,
            due,
            ...imageData,
            packageID: PackageDetails._id
        }

        console.log(allData);
        const res = await CreateMemberRequest(allData);
        if(res.status ==="success"){
            toast.success("New Member Added Successfully")
        } else {
            toast.error("Somethint went wrong")
        }
    }




    return (
        <section >
           
           
           <form onSubmit={handleSubmit(onSubmit)} > 
                <div className="bg-white p-5 rounded-3">
                    <h5 className="my-3 text-center">Personal Information</h5>
                
                    <div className="row">
                        <div className="col-md-4">
                            <label  className="form-label mt-3 ">Upload Your Picture</label>
                            { ImageLoading && <LoadingSkeleton />}  
                            {
                            imageData.imageUrl ? <div className="text-center"> <img className="form-member-pic" crossOrigin ="anonymous"  
                                                        src={`${import.meta.env.VITE_URL}/${imageData?.imageUrl}`} alt="Avatar" /> <br/>
                                                        <button onClick={()=>setImageData({}) } className="btn btn-danger  mt-2">Remove</button>
                                                </div> : 
                                                <input onChange={handleImage} name='imageUrl' type="file" className='form-control'  /> 
                            }

                        
                            

                        </div>
                        <div className="col-md-4">
                            <label  className="form-label mt-3 ">Your Name</label>
                            <input type="text" className="form-control p-2" {...register("name")} />
                             
                            <label  className="form-label mt-3 ">Member ID</label>
                            <input type="text" className="form-control p-2" {...register("memberID")} />

                            <label  className="form-label mt-3">Father's Name</label>
                            <input type="text"  className="form-control p-2"  {...register("fatherName")}/>

                        </div>
                        <div className="col-md-4">
                            <label  className="form-label mt-3">Contact Number</label>
                            <input type="tel"  className="form-control p-2" {...register("contactNumber")} />

                            <label  className="form-label mt-3">Address</label>
                            <input type="text"  className="form-control p-2" {...register("address")} />

                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 mt-4 rounded-3">
                    <h5 className="my-3 text-center">Service Information</h5>
                    <div className="row">
                        <div className="col-md-3">
                            <label  className="form-label "> Membership Package</label>
                            <select onChange={handleGymPackage} className="form-select p-3 " defaultValue="0"  aria-label="Default select example">
                            <option  value="0">Choose A Package</option>
                                {
                                    AllPackage === null ? <option>Loading</option> :
                                    AllPackage.length === 0 ?<option>No Package Available</option> :
                                    AllPackage.map( (item, index) => <option key={index} value={item._id}>{item.title} [{item.price}tk]</option> )
                                }
                            </select>
                        </div>
                        <div className="col-md-3">

                            <label  className="form-label ">Services</label>
                            <select onChange={handleGymPackage} className="form-select p-3 " defaultValue="0"  aria-label="Default select example">
                            <option  value="0">Choose A Package</option>
                                {
                                    AllPackage === null ? <option>Loading</option> :
                                    AllPackage.length === 0 ?<option>No Package Available</option> :
                                    AllPackage.map( (item, index) => <option key={index} value={item._id}>{item.title} [{item.price}tk]</option> )
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label  className="form-label "> Choose Trainer</label>
                            <select {...register("trainer")}  className="form-select p-3" defaultValue="0" aria-label="Default select example">
                                <option value="0">No Trainer</option>
                                <option value="1">Suzon</option>
                                <option value="2">Rubel</option>
                                <option value="3">Mahmudul</option>
                                <option value="3">Alif</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label  className="form-label ">Expire Date</label>
                            <input  {...register("expireDate")} type="date"  className="form-control p-3" />
                        </div>
                    </div>
                
                </div>

    {/* Billing information */}
                <div className="bg-white p-5 rounded-3 mt-3">

                    <h6 className="mb-4">Billing Information</h6>
                    <Table  bordered  >
                        <thead className="table-success">
                            <tr className="text-center ">
                                <th><b>Sl</b></th>
                                <th><b>Membership Plan</b></th>
                                <th className="w-25"><b>Tk</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>{PackageDetails?.title}</td>
                                <td>{PackageDetails?.price}</td>
                            </tr>
                            {
                                watch("treadmill") && 
                                <tr>
                                    <td>2</td>
                                    <td>Treadmill</td>
                                    <td>100</td>
                                </tr>
                            }
                            {
                                 watch("locker") && 
                                 <tr>
                                    <td>3</td>
                                    <td>Locker</td>
                                    <td>200</td>
                                </tr>
                            }
                           

                            <tr>
                                <td colSpan="2" className="text-end"><b>Total </b></td>
                                <td><b>{total}</b></td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="text-end"><b>Payable</b></td>
                                <td><b>
                                    <input onChange={(e)=>handlePay(e.target.value)} className="form-control" />
                                </b></td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="text-end"><b>Discount</b></td>
                                <td><b>
                                    <input onChange={(e)=>handleDiscount(e.target.value)} className="form-control" />
                                </b></td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="text-end"><b>Due</b></td>
                                <td><b>{due}</b></td>
                            </tr>
                            
                        </tbody>
                        </Table>

                    <input type="submit" value="PAY NOW" className="btn btn-success w-100 p-3  "/>
                </div>  

           </form>
        </section>
    );
};

export default CreateMember;