import AdvanceSalaryForm from "../../components/Salary/AdvanceSalaryForm";
import TrainerProfile from "../../components/Trainer/TrainerProfile";


const AdvanceSalaryPage = () => {
    return (
        <section>
            <div className="row">
                <div className="col-md-7">
                    <AdvanceSalaryForm />

                </div>
                <div className="col-md-5">
                    <TrainerProfile />
                </div>
            </div>
            
        </section>
    );
};

export default AdvanceSalaryPage;