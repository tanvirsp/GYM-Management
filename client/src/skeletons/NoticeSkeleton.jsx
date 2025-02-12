import Lottie from "lottie-react";
import Skeleton from "react-loading-skeleton";
import ImagePlaceholder from "../assets/images/image.json";


const NoticeSkeleton = () => {
    return (
        <div className="container ">
        <div className="bg-white p-4 rounded-3">
            <Skeleton count={2} />
        </div>

        <div className="mt-4 bg-white p-4 rounded-3 ">
           
            <Lottie className="w-25 m-auto" animationData={ImagePlaceholder} loop={true} />
            <Skeleton count={10} />
        </div>
        
    </div>
    );
};

export default NoticeSkeleton;