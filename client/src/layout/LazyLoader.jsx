import '../assets/css/progress.css'

const LazyLoader = () => {
    return (
        <div  className="LoadingOverlay">
            <div className="Line-Progress">
                <div className="indeterminate"></div>
            </div>
        </div>
    );
};

export default LazyLoader;