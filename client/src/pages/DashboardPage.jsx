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
                <div className="col">
                        <EarningGraphChart />
                </div> 
            </div>
        </section> :
        Profile.role==="trainer" ? 
            <TrainerDashboard /> :
            <MemberDashboard />   
    }


       
    </>
    );
};

export default DashboardPage;