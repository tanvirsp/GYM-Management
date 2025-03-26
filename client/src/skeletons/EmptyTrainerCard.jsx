import alertIcon from '../assets/images/alert-icon.jpg'

const EmptyTrainerCard = () => {
    return (
        <div className="bg-white p-5 rounded-3 text-center">
            <img width="150px" src={alertIcon} alt="Warning" />
            <h5 className='mt-3'>Choose a trainer from trainer list dropdown</h5>
        </div>
    );
};

export default EmptyTrainerCard;