import { useEffect } from "react";
import EarningGraphChart from "../components/Dashboard/EarningGraphChart";
import GroupCard from "../components/Dashboard/GroupCard";
import UsersChart from "../components/Dashboard/UsersChart";
import UserStore from "../store/UserStore";
import MemberDashboard from "../components/Dashboard/MemberDashboard";
import TrainerDashboard from "../components/Dashboard/TrainerDashboard";


const DashboardPage = () => {
    const {Profile, ProfileRequest} = UserStore();

    useEffect(()=>{
        (async()=>{
            Profile === null && await ProfileRequest()


        })()
    },[])
    if(Profile === null){
        return <p>Loading...</p>
    }


   
    return (
    <>
    {
        Profile.role==="admin"? 
        <section>
        <GroupCard />
        <div className="row mt-4">
            <div className="col-md-8">
                    <EarningGraphChart />
            </div>
            <div className="col-md-4">
                <div className='bg-white rounded-3 p-5'>
                    <UsersChart />
                    <p className="text-center">Users</p>
                </div>
            </div>
        </div>
    </section> :
    Profile.role==="trainer" ? 
        <TrainerDashboard />:
        <MemberDashboard />
           
    }


       
    </>
    );
};

export default DashboardPage;