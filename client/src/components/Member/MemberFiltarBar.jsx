import { IoSearchOutline } from "react-icons/io5";


const MemberFiltarBar = () => {

      
    const handleSearch = async(e) =>{
        e.preventDefault();
      
        e.target.reset();
    };


    return (
        <section className="bg-white p-4 rounded-3">
            <div className="row">
                <div className="col-md-6">
                    <label >Total GYM Member:</label>
                    <h6> Total</h6>
                </div>
               
                <div className="col-md-3">   
                    <label>Filter By Status:</label>
                    <select     className='form-select'>
                        <option value="" >All</option>
                        <option value="0" >Active</option>
                        <option value="1" >Expired</option>
                       
                    </select>
                </div>
    
                
                <div className="col-md-3">
                    <label>Search by Member ID Number:</label>
                    <form onSubmit = {handleSearch }className='search-form'>
                            <input  className='form-control' required type="text" name="search" placeholder='Enter Your Member ID' />
                            <button> <IoSearchOutline /> </button>
                    </form>
                </div>
                

            </div>
        </section>
    );
};

export default MemberFiltarBar;