import { useEffect } from "react";
import ProfileInfo from "../../components/Member/ProfileInfo";
import MemberStore from "../../store/MemberStore";
import { useParams } from "react-router-dom";
import FullScreenLoader from "../../layout/FullScreenLoader";
import { Tab, Tabs } from "react-bootstrap";
import MemberPaymentList from "../../components/Member/MemberPaymentList";
import MemberDueList from "../../components/Member/MemberDueList";


const MemberDetailsPage = () => {

    const {MemberDetailsRequest, MemberFormData} = MemberStore();

    const {id} = useParams();
    
    useEffect( ()=>{
            (async()=>{
                await MemberDetailsRequest(id);

            })()
    } ,[id]);



    if(MemberFormData=== null){
        return <FullScreenLoader />
    }


    return (
        <section>
           <div className="row">
                <div className="col-md-4">
                    <ProfileInfo />
                </div>
                <div className="col-md-8">
                    <div className="common-bg-full">
                        <Tabs
                            defaultActiveKey="transaction"
                            id="uncontrolled-tab-example"
                            className="mb-1"
                            >
                            <Tab eventKey="transaction" title="Transaction History">
                                <MemberPaymentList userID={id} />    
                            </Tab>

                            <Tab eventKey="due" title="Due Payment">
                                <MemberDueList userID={id} />
                            </Tab>
                        
                        </Tabs>
                        
                    </div>
                </div>
           </div>
            
        </section>
    );
};

export default MemberDetailsPage;