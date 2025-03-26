import { useParams } from "react-router-dom";
import TrainerProfile from "../../components/Trainer/TrainerProfile";
import { Tab, Tabs } from "react-bootstrap";
import SalaryList from "../../components/Trainer/SalaryList";
import AdvanceList from "../../components/Trainer/AdvanceList";
import { useEffect } from "react";
import TrainerStore from "../../store/TrainerStore";

const TrainerDetailsPage = () => {
    const {id} = useParams();
    const {TrainerDetailsRequest} = TrainerStore();

      useEffect(()=>{
            (async()=>{
                id && await TrainerDetailsRequest(id)
    
            })()
        } ,[id])
        
    return (
        <section>
           <div className="row">
                <div className="col-md-4">
                    <TrainerProfile userID={id}  />
                </div>
                <div className="col-md-8">
                <div className="common-bg-full">
                        <Tabs
                            defaultActiveKey="transaction"
                            id="uncontrolled-tab-example"
                            className="mb-1"
                            >
                            <Tab eventKey="transaction" title="Salary History">
                                <SalaryList userID={id} />    
                            </Tab>

                            <Tab eventKey="due" title="Advance History">
                                <AdvanceList userID={id} />
                            </Tab>
                        
                        </Tabs>
                        
                    </div>
                </div>
           </div>
            
        </section>
    );
};

export default TrainerDetailsPage;