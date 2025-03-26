
import { Tab, Tabs } from 'react-bootstrap';
import UserStore from '../../store/UserStore';
import ProfileInfo from '../Member/ProfileInfo';
import MemberPaymentList from '../Member/MemberPaymentList';
import MemberDueList from '../Member/MemberDueList';
import { useEffect } from 'react';
import MemberStore from '../../store/MemberStore';

const MemberDashboard = () => {
    const {Profile} = UserStore();
    const {MemberDetailsRequest} = MemberStore();
   
    useEffect(()=>{
        (async()=>{
            await MemberDetailsRequest(Profile._id)

        })()
    } ,[])

    
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
                                <MemberPaymentList userID={Profile._id} />    
                            </Tab>

                            <Tab eventKey="due" title="Due Payment">
                                <MemberDueList userID={Profile._id} />
                            </Tab>
                        
                        </Tabs>
                        
                    </div>
                </div>
           </div>
            
        </section>
    );
};

export default MemberDashboard;