

import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import ImagePlaceholder from "../assets/images/image.json";


const DetailsSkeleton = () => {
    return (
        <section  className="container ">
        
            <div className="row  bg-white p-5 rounded-3 my-2">
                <div className="col-md-5">
                    <div> 
                        <Skeleton count={4} />
                    </div>
                </div>
                <div className="col-md-5">
                    <div> 
                        <Skeleton count={4} />
                    </div>
                </div>
                <div className="col-md-2">
                    <div> 
                        <Lottie className="w-50 m-auto" animationData={ImagePlaceholder} loop={true} />
                    </div>
                </div>
            </div>
        
            <div className="row bg-white p-5 rounded-3 my-2">
                <div className='col-md-6'>
                    <Skeleton count={5} />
                </div>
                <div className='col-md-6'>
                    <Skeleton count={5} />
                </div>
            </div>
            <div className="row bg-white p-5 rounded-3 my-2">
                <div className='col-md-6'>
                    <Skeleton count={5} />
                </div>
                <div className='col-md-6'>
                    <Skeleton count={5} />
                </div>
            </div>
            <div className="row bg-white p-5 rounded-3 my-2">
                <div className='col-md-6'>
                    <Skeleton count={5} />
                </div>
                <div className='col-md-6'>
                    <Skeleton count={5} />
                </div>
            </div>
            <div className="row bg-white p-5 rounded-3 my-2">
                <div className='col-md-6'>
                    <Skeleton count={5} />
                </div>
                <div className='col-md-6'>
                    <Skeleton count={5} />
                </div>
            </div>
        
        
       
        </section>
    );
};

export default DetailsSkeleton;