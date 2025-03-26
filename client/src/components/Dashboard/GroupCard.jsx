import { useEffect } from "react";
import DashboardStore from "../../store/DashboardStore";


const GroupCard = () => {
    const {TotalTrainers, ActiveMembers,ExpireMembers,SalaryDue,  Admins, TotalDuePayment, TotalCollection, TotalExpense, TotalTrainerRequest} = DashboardStore();

    useEffect(()=>{
        (async()=>{
            await TotalTrainerRequest()
        })();
    } ,[])

    return (
        <section className="row g-4">
             <div className="col-md-3">
                <div className='d-card'>
                    <label>Total Earning:</label>
                    <h3 className="d-title">{TotalCollection} <span>tk</span></h3>
                    <span className="d-tag">(Current Month)</span>
                </div>
            </div>
            <div className="col-md-3 ">
                <div className='d-card'>
                    <label>Total Expense: </label>
                    <h3 className="d-title">{TotalExpense} <span>tk</span></h3>
                    <span className="d-tag">(Current Month)</span>
                </div>
            </div>
            <div className="col-md-3">
                <div className='d-card'>
                    <label>Total Due Payment: </label>
                    <h3 className="d-title" >{TotalDuePayment} <span>tk</span></h3>
                    <span className="d-tag">(Current Month)</span>

                </div>
            </div>
            <div className="col-md-3 ">
                <div className='d-card'>
                    <label>Due Salary: </label>
                    <h3 className="d-title">{SalaryDue} <span>tk</span></h3>
                    <span className="d-tag">(Current Month)</span>
                </div>
            </div>

            <div className="col-md-3">
                <div className='d-card'>
                    <label>GYM Trainer: </label>
                    <h3 className="d-title">{TotalTrainers}</h3>
                </div>
            </div>
            <div className="col-md-3">
                <div className='d-card'>
                    <label>GYM Active Member: </label>
                    <h3 className="d-title">{ActiveMembers}</h3>

                </div>
            </div>
            <div className="col-md-3">
                <div className='d-card'>
                    <label>GYM Expire Member: </label>
                    <h3 className="d-title">{ExpireMembers}</h3>

                </div>
            </div>
            <div className="col-md-3">
                <div className='d-card'>
                    <label>Admin Users: </label>
                    <h3 className="d-title">{Admins}</h3>

                </div>
            </div>
            
           
            
            
        </section>
    );
};

export default GroupCard;