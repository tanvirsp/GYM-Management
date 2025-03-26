
import ChangePasswordForm from "../../components/Users/ChangePasswordForm";
import ProfileDetails from "../../components/Users/ProfileDetails";


const ProfilePage = () => {
    return (
        <div className="container">
        <div className="row">
            <div className="col-md-6">
                <ProfileDetails />

            </div>
            <div className="col-md-6">
                <ChangePasswordForm />
                
            </div>

        </div>
    </div>
    );
};

export default ProfilePage;