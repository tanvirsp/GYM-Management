import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import ImagePlaceholder from "../assets/images/image.json";

const PersonCardSkeleton = () => {
    return (
        <div className="row">
            <div className="col-md-3">
                <div className="person-card">
                    <Lottie className="w-50 m-auto" animationData={ImagePlaceholder} loop={true} />
                    <Skeleton count={7} />
                </div>
            </div>
            <div className="col-md-3">
                <div className="person-card">
                    <Lottie className="w-50 m-auto" animationData={ImagePlaceholder} loop={true} />
                    <Skeleton count={7} />
                </div>
            </div>
            <div className="col-md-3">
                <div className="person-card">
                    <Lottie className="w-50 m-auto" animationData={ImagePlaceholder} loop={true} />
                    <Skeleton count={7} />
                </div>
            </div>
            <div className="col-md-3">
                <div className="person-card">
                    <Lottie className="w-50 m-auto" animationData={ImagePlaceholder} loop={true} />
                    <Skeleton count={7} />
                </div>
            </div>
        </div>
        
    );
};

export default PersonCardSkeleton;