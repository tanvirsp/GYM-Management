import { useEffect, useState } from 'react';
import PackageStore from '../../store/PackageStore';
import MemberStore from '../../store/MemberStore';
import UploadImageStore from '../../store/UploadImageStore';
import toast from 'react-hot-toast';
import LoadingSkeleton from '../../skeletons/LoadingSkeleton';
import ServiceStore from '../../store/ServiceStore';
import { Table } from 'react-bootstrap';

const CreateMember = () => {

   
   const {CreateMemberRequest, MemberListRequest} = MemberStore()
   const {PackageDropdown,  PackageDropdownRequest} = PackageStore()
   const {ServiceDropdownRequest,  ServiceDropdown} = ServiceStore()
   const {ImageUploadRequest, ImageLoading} = UploadImageStore();

//local State
    const [gymPackage, setGymPackage] = useState({})
    const [gymService, setGymService] = useState([])

    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [payValue, setPayValue] = useState(0);
   


   useEffect( ()=>{
    ( async()=>{
        PackageDropdown === null && await PackageDropdownRequest();
        ServiceDropdown === null && await ServiceDropdownRequest();
    })()
   }, [] )




//Set Total Price in State
   useEffect(()=>{     
        if(gymPackage._id || gymPackage.length > 0){
            const packageAmount = Number(gymPackage.price) || 0
            const serviceAmount =  gymService.reduce( (pre, curr) => pre + Number(curr.price),  0 )
            setTotal(packageAmount +  serviceAmount); 
        }

   } ,[gymService, gymPackage]);



   const handleDiscountValue = (e) =>{
        setDiscount( Number(e.target.value))
   }

   const handleAmountPayValue = (e) =>{
        setPayValue( Number(e.target.value))
   }



   const handlePackage = (obj)=>{
        setGymPackage(obj);
   }



   const toggleService = (obj) =>{
    const exit = gymService.find( item =>item._id === obj._id );
        if(!exit){
            setGymService([...gymService, obj ])
           
        } else {
            const otherData = gymService.filter( item =>item._id !== obj._id );
            setGymService([...otherData])
           
        }

   }

   
   
    //Collecting Data from Form Field
    const [data, setData] = useState({})

    const handleFormData =(name, value) =>{
        setData({...data, [name]: value })
    }


    
    //Image Upload function and State
    const [imageData, setImageData] = useState("")

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

   
   
   const handleSubmit = async(e)=>{
    e.preventDefault();
    const allData = {...data, 
        ...imageData,
         packageID: gymPackage._id,
         services: gymService,
         amountPay: payValue,
         due: (total - discount) - payValue
        }
   
    const result = await CreateMemberRequest(allData);
        if(result.status ==="success"){
            toast.success("New Member Created Successfully");
            
            await MemberListRequest(1, 20, 0)
            e.target.reset();
        } else{
            toast.error("Something Went Wrong!!")
        }
    };
    


    return (
        <section>

            <div className='bg-white rounded-3 p-5'>
             <h4 className="mb-5">Add GYM Member</h4>
                <form onSubmit={handleSubmit}  > 
                    <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3" >Personal Information:</legend>
                        <div className="row">
                            <div className="col-md-3">
                                <label className="form-label ">Member ID</label>
                                <input required onBlur = {(e)=>handleFormData("memberID", e.target.value)}  className="form-control p-2" />

                                <label className="form-label mt-3 ">Name</label>
                                <input required onBlur = {(e)=>handleFormData("name", e.target.value)}  className="form-control p-2" />

                            </div>
                            <div className="col-md-3">
                                <label className="form-label ">Father Name</label>
                                <input required onBlur = {(e)=>handleFormData("fatherName", e.target.value)}   className="form-control p-2" />

                                <label className="form-label mt-3 ">Phone</label>
                                <input required onBlur = {(e)=>handleFormData("phone", e.target.value)}   className="form-control p-2" />


                            </div>
                            <div className="col-md-3">
                                <label className="form-label ">Address</label>
                                <input required onBlur = {(e)=>handleFormData("address", e.target.value)} className="form-control p-2" />

                                <label className="form-label mt-3 ">Expire Date</label>
                                <input required type="date" onBlur = {(e)=>handleFormData("expireDate", e.target.value)}  className="form-control p-2" />

                            </div>
                            <div className="col-md-3">
                                <label className="form-label ">Picture</label>
                                
                                    { ImageLoading && <LoadingSkeleton />}  
                                    {
                                    imageData?.imgUrl ? <div className="text-center"> <img className="form-member-pic" crossOrigin ="anonymous"  
                                                                src={`${import.meta.env.VITE_URL}/${imageData.imgUrl}`} alt="Avatar" /> <br/>
                                                                <button onClick={()=>setImageData("imgUrl", "") } className="btn btn-danger  mt-2">Remove</button>
                                                        </div> : 
                                                        <input onChange={handleImage} name='imgUrl' type="file" className='form-control'  /> 
                                    }

                            </div>
                        </div>
                    </fieldset>
                
                    <fieldset className="border rounded-3 mt-3 p-3">
                        <legend className="float-none w-auto px-3" >Login Information:</legend>
                        <div className="row">
                            <div className="col-md-3">
                                <label className="form-label ">Email</label>
                                <input required onBlur = {(e)=>handleFormData("email", e.target.value)}  className="form-control p-2" />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label ">Password</label>
                                <input required onBlur = {(e)=>handleFormData("password", e.target.value)}  className="form-control p-2" />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="border rounded-3 mt-3 p-3">
                        <legend className="float-none w-auto px-3" >Package Information:</legend>
                        <div className="row">
                            {
                                PackageDropdown === null ? <p>Loading...</p>:
                                PackageDropdown.length === 0 ? <p>NO Package Available</p>:
                                PackageDropdown.map( (item, index) =>{
                                    return(
                                        <div key={index} className="col-md-2">
                                            <div className={gymPackage._id ===item._id ? "active-card": "show-card" }>
                                            {/* <img  src={`${import.meta.env.VITE_URL}/${item.imgUrl}`} alt="thumbnail" crossOrigin ="anonymous" /> */}
                                                <h6>{item.name}</h6>
                                                <h2>{item.price} <span>tk</span></h2>
                                                <p>{item.duration}</p>
                                                {
                                                    gymPackage._id ===item._id ?  
                                                    <a >SELECTED</a> :
                                                    <a onClick={()=>handlePackage(item)}>SELECT</a>
                                                }
                                            </div>
                                        </div>
                                    )
                                } )
                            }        
                        </div>

                    </fieldset>
                    <fieldset className="border rounded-3 mt-3 p-3">
                        <legend className="float-none w-auto px-3" >Service Information [Optional]:</legend>
                        <div className="row ">
                            {
                                ServiceDropdown === null ? <p>Loading...</p>:
                                ServiceDropdown.length === 0 ? <p>NO Package Available</p>:
                                ServiceDropdown.map( (item, index) =>{
                                    return(
                                        <div key={index} className="col-md-2">
                                            <div className={gymService.some(arr => arr._id === item._id )  ? "active-card": "show-card" }>
                                            
                                                <h6>{item.name}</h6>
                                                <h2>{item.price} <span>tk</span></h2>
                                                <p>{item.duration}</p>
                                                
                                                {
                                                    gymService.some(arr => arr._id === item._id )  ? 
                                                    <a onClick={()=>toggleService(item)} >SELECTED</a> :
                                                    <a onClick={()=>toggleService(item)}>SELECT</a> 
                                                }
                                            
                                            </div>
                                        </div>
                                    )
                                } )
                            }        
                        </div>
                    </fieldset>
                    <fieldset className="border rounded-3 mt-3 p-3">
                        <legend className="float-none w-auto px-3" >Billing Information:</legend>
     
                            <Table bordered >
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Package/Service Information</th>
                                        <th>Amount [taka]</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        gymPackage._id && 
                                        <tr>
                                            <td>01</td>
                                            <td>{gymPackage.name}</td>
                                            <td>{gymPackage.price}</td>
                                        </tr>
                                    }
                                    {
                                        gymService.length > 0 && 
                                        gymService.map( (item, index) =>{
                                            return (
                                                <tr key={index}>
                                                    <td>0{index +2 }</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td colSpan={2} className='text-end total-col'><b>Total:</b></td>
                                        <td className='total-col'>{total}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className='text-end discount-col'><b>Discount</b></td>
                                        <td className='discount-col' ><input onChange={handleDiscountValue} type="number" name="" id="" className='form-control' /></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className='text-end '><b>Total Pay</b></td>
                                        <td>{total -  discount }</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className='text-end'><b>Amount Pay</b></td>
                                        <td><input onChange={handleAmountPayValue} type="number" name="" id="" className='form-control' /></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className='text-end'><b>Due</b></td>
                                        <td>{  (total - discount) - payValue}</td>
                                    </tr>
                                </tbody>
                            </Table>
                     
                    </fieldset>
                      

                    <input  className="btn btn-success mt-5 px-5" type="submit" value="Create New Member"/>
                    
                </form>
            </div>



        </section>
           
           
           
    );
};

export default CreateMember;