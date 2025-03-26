import SalaryForm from "../../components/Salary/SalaryForm";
import TrainerProfile from "../../components/Trainer/TrainerProfile";


const SalaryCreatePage = () => {
    return (
        <section>
            <div className="row">
                <div className="col-md-7">
                    <SalaryForm />

                </div>
                <div className="col-md-5">
                    
                    <TrainerProfile />
                </div>
            </div>
            
        </section>
    );
};

export default SalaryCreatePage;