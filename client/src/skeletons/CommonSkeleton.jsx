import Skeleton from "react-loading-skeleton";


const CommonSkeleton = () => {
    return (
        <div className="row bg-white border rounded-3 p-4 mt-3 mx-1">
            <div className="col-md-4">
                <Skeleton count={5} />
            </div>
            <div className="col-md-4">
                <Skeleton count={5} />
            </div>
            <div className="col-md-4">
                <Skeleton count={5} />
            </div>
        </div>
    );
};

export default CommonSkeleton;