import ExpenseTypeCreate from "../../components/Expense/ExpenseTypeCreate";
import ExpenseTypeList from "../../components/Expense/ExpenseTypeList";



const ExpenseTypePage = () => {
    return (
        <div className="row">
            <div className="col-md-4">
                <ExpenseTypeCreate />

            </div>
            <div className="col-md-8">
                
                <ExpenseTypeList />
            </div>
        </div>
    );
};

export default ExpenseTypePage;