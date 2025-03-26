import { useEffect, useState } from "react";
import {
  BarChart,  Bar,  XAxis,  YAxis,  CartesianGrid,  Tooltip,   Rectangle,  ResponsiveContainer} from "recharts";
import DashboardStore from "../../store/DashboardStore";
import { RiCheckboxBlankFill } from "react-icons/ri";


const EarningGraphChart = () => {

  const {MonthlyReportRequest, MonthlyReport} = DashboardStore();


  const currentYear = new Date().getFullYear();
  const startYear = 2024// Change this to any starting year
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i).reverse(); // Reverse to show current year first

  const [selectedYear, setSelectedYear] = useState(currentYear)

   useEffect(()=>{
          (async()=>{
              await MonthlyReportRequest(selectedYear)
          })();
      } ,[selectedYear]);



    const handleYear = async(year)=>{
      setSelectedYear(year);
    }


  
    return (
      <div className='bg-white rounded-3 p-5'>
           <div className="w-25 ms-auto mb-3 me-4">
              <select onChange={(e)=>handleYear(e.target.value)} className="form-select">
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
           </div>

        <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={MonthlyReport}
              margin={{
                top: 5,
                right: 30,
                left: 30,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="expense"
                fill="gray"
                activeBar={<Rectangle fill="gray" stroke="gray" />}
              />
              <Bar
                dataKey="income"
                fill="#018D46"
                activeBar={<Rectangle fill="#018D46" stroke="#018D46" />}
              />
            </BarChart>
        </ResponsiveContainer>
        <div className="d-flex align-items-center justify-content-center">
          <p className="text-center ms-2"> <RiCheckboxBlankFill /> Expense</p>
          <p className="text-center text-success"> <RiCheckboxBlankFill /> Earning</p>
        </div>
        
      </div>
       
        
            
        
    );
};

export default EarningGraphChart;