import { useEffect } from "react";
import UserStore from "../../store/UserStore";
import TrainerProfile from "../Trainer/TrainerProfile";
import { Tab, Tabs } from "react-bootstrap";
import SalaryList from "../Trainer/SalaryList";
import AdvanceList from "../Trainer/AdvanceList";
import TrainerStore from "../../store/TrainerStore";

const TrainerDashboard = () => {
    const {Profile} = UserStore();
    const {TrainerDetailsRequest, TrainerFormData} = TrainerStore();
   
    useEffect(()=>{
        (async()=>{
            TrainerFormData === null && await TrainerDetailsRequest(Profile._id)

        })()
    } ,[])


    return (
        <section>
           <div className="row">
                <div className="col-md-4">
                    <TrainerProfile   />
                </div>
                <div className="col-md-8">
                <div className="common-bg-full">
                        <Tabs
                            defaultActiveKey="transaction"
                            id="uncontrolled-tab-example"
                            className="mb-1"
                            >
                            <Tab eventKey="transaction" title="Salary History">
                                <SalaryList userID={Profile._id} />    
                            </Tab>

                            <Tab eventKey="due" title="Advance History">
                                <AdvanceList userID={Profile._id} />
                            </Tab>
                        
                        </Tabs>
                        
                    </div>
                </div>
           </div>
            
        </section>
    );
};

export default TrainerDashboard;