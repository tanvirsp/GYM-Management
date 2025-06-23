import { useState } from "react";
import ReportStore from "../../store/ReportStore";
import exportFromJSON from 'export-from-json'
import moment from "moment";
import toast from "react-hot-toast";
import { Spinner } from 'react-bootstrap';



const ExpenseReportPage = () => {
    const {ExpenseTotal, ExpenseDataList, ExpenseReportRequest, ReportLoader} = ReportStore();

    const [date, setDate] = useState({
        fromDate: '',
        toDate: '',

    });

    const handleDate = (name, value) =>{
        setDate({
            ...date,
            [name]: value
        })

    }

    console.log(date);

    const handleRequest =async()=>{
        if(date.fromDate.length == 0 || date.toDate.length == 0 ){
            toast.error("Date is empty")
        } else {
            await ExpenseReportRequest(date)
        }
       
    };




    const OnExport = (exportType, data) => {
        const fileName = 'ExpenseReport'
        if(data.length>0){
            let ReportData=[]
            data.map((item)=>{
                let listItem={
                    "Amount":item['amount'],
                    "Note":item['note'],
                    "Date":moment(item['createdAt']).format('MMMM Do YYYY'),
                    "Type":item['type']['name'],
                }
                ReportData.push(listItem)
            })
            exportFromJSON({data: ReportData, fileName: fileName, exportType: exportType })
        }
    }

    return (
        <>
            <section className="bg-white p-5 rounded-3 ">
                <div className="d-flex gap-5">
                    <div className="w-25">
                            <label>Date Form</label>
                            <input onBlur={(e) =>{handleDate("fromDate", e.target.value )}}  className="p-2 mt-2 form-control" type="date" name="" id="" />
                        </div>
                    <div className="w-25">
                        <label>Date To</label>
                        <input onBlur={(e) =>{handleDate("toDate", e.target.value )}}  className="p-2 mt-2 form-control " type="date" name="" id="" />
                    </div>
                </div>
                <div>
                    <button onClick={handleRequest} className="btn btn-success  mt-5">CREATE REPORT</button>
                </div>
            </section>
             {
                ReportLoader && 
                <section className=" mt-3 p-5 rounded-3 d-flex align-items-center justify-content-center ">
                    <Spinner animation="border" variant="success" />  
                </section>
            }
            {
                ExpenseDataList.length > 0 &&
                    <section className="bg-white mt-3 p-5 rounded-3 ">
                        <h4>Total: {ExpenseTotal} </h4>
                        <button  onClick={()=>{OnExport('csv', ExpenseDataList )}} className="btn btn-success">Download CSV</button>
                        <button onClick={()=>{OnExport('xls', ExpenseDataList )}} className="btn btn-info ms-2 text-white">Download XLS</button>
                    </section>
            }
        
        
        </>
        
    );
};

export default ExpenseReportPage;