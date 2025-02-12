import '../assets/css/progress.css'

const FullScreenLoader = () => {
    return (
        <div className=" LoadingOverlay">
            <div className="Line-Progress">
                <div className="indeterminate"></div>
            </div>
        </div>
    );
};

export default FullScreenLoader;