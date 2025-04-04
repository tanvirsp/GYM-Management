const express = require('express');
const router = express.Router()


const upload = require('../Middleware/uploader.js');
const AuthVerification = require('../Middleware/AuthVerification.js');
const VerifyAdmin = require('../Middleware/VerifyAdmin.js');

const UserController = require("../Controllers/UserController.js");

const PackageController = require("../Controllers/PackageController")
const ServiceController = require("../Controllers/ServiceController.js");
const TrainerController = require("../Controllers/TrainerController.js");
const MemberController = require("../Controllers/MemberController.js");
const ExpenseTypeController = require("../Controllers/ExpenseTypeController.js");
const ExpenseController = require("../Controllers/ExpenseController.js");
const DueController = require("../Controllers/DueController.js");
const PaymentController = require("../Controllers/PaymentController.js");
const SalaryController = require("../Controllers/SalaryController.js");
const DashboardController = require("../Controllers/DashboardController.js");



router.post("/file-upload", upload.single('image'),  async(req, res) =>{
    try {
        
      res.status(200).send({status: true, data: req.file});
    } catch (error) {
        res.status(400).send({status: false,  message: error.message})
        
    }
  });



 



//User API


//User API
router.post('/register', AuthVerification, VerifyAdmin,  UserController.CreateUser);
router.post('/login', UserController.LoginUser);
router.get('/logout', UserController.LogoutUser);
router.get("/send-otp/:email", UserController.SendOtp )
router.get("/verify-otp/:email/:otp", UserController.VerifyOTP );
router.post("/reset-password", UserController.ResetPassword );
router.post("/change-password", AuthVerification, UserController.ChangePassword );
router.get("/user-profile", AuthVerification, UserController.Profile );
router.post("/update-profile", AuthVerification, UserController.ProfileUpdate );
router.get("/users", AuthVerification, UserController.UserList );




//Package API
router.post('/package', AuthVerification, VerifyAdmin, PackageController.CreatePackage )
router.get('/package-dropdown', AuthVerification, VerifyAdmin,  PackageController.PackageDropdown )
router.get('/package-list/:pageNo/:perPage/:searchKeyword',  AuthVerification, VerifyAdmin,  PackageController.PackageList )
router.get('/package/:id',  PackageController.PackageDetails )
router.post('/package-update/:id', AuthVerification, VerifyAdmin,  PackageController.UpdatePackage )
router.delete('/package/:id',  AuthVerification, VerifyAdmin,  PackageController.DeletePackage )


//Service API
router.post('/service',  AuthVerification, VerifyAdmin,  ServiceController.CreateService )
router.get('/service-dropdown', ServiceController.ServiceDropdown )
router.get('/service-list/:pageNo/:perPage/:searchKeyword',  AuthVerification, VerifyAdmin,  ServiceController.ServiceList )
router.get('/service/:id', ServiceController.ServiceDetails )
router.post('/service-update/:id', AuthVerification, VerifyAdmin,  ServiceController.ServiceUpdate )
router.delete('/service/:id',  AuthVerification, VerifyAdmin,  ServiceController.ServiceDelete )




//Member API
router.post('/member', AuthVerification, VerifyAdmin,  MemberController.CreateMember )
router.get('/member-list/:pageNo/:perPage/:searchKeyword', MemberController.MemberList)
router.post('/member-update/:id', AuthVerification, MemberController.MemberUpdate )
router.get('/member/:id', AuthVerification, MemberController.MemberDetailsByID )
router.get('/member-payment-list/:pageNo/:perPage/:id', AuthVerification,  MemberController.MemberPaymentList)
router.get('/member-due-list/:pageNo/:perPage/:id', AuthVerification, MemberController.MemberDueList)





//Trainer API
router.post('/create-trainer', AuthVerification, VerifyAdmin,  TrainerController.CreateTrainer )
router.get('/trainer-dropdown', TrainerController.TrainerDropdown )
router.get('/trainer-list/:pageNo/:perPage/:searchKeyword', TrainerController.TrainerList )
router.get('/trainer/:id', TrainerController.TrainerDetailsByID )
router.post('/trainer-update/:id',  AuthVerification, TrainerController.UpdateTrainer )




//Salary API
router.post('/create-salary',  AuthVerification, VerifyAdmin,  SalaryController.CreateSalary )
router.post('/create-advance-salary',  AuthVerification, VerifyAdmin,  SalaryController.CreateAdvanceSalary )
router.get('/salary-list/:pageNo/:perPage/:id', AuthVerification, SalaryController.SalaryList )
router.get('/advance-list/:pageNo/:perPage/:id', AuthVerification, SalaryController.AdvanceList )





//Expense Type API
router.post('/expense-type', AuthVerification, VerifyAdmin, ExpenseTypeController.CreateExpenseType )
router.get('/expense-type-dropdown', ExpenseTypeController.ExpenseTypeDropdown )
router.get('/expense-type-list/:pageNo/:perPage/:searchKeyword',  AuthVerification, VerifyAdmin, ExpenseTypeController.ExpenseTypeList )
router.get('/expense-type/:id', AuthVerification, VerifyAdmin, ExpenseTypeController.ExpenseTypeDetails)
router.post('/expense-type-update/:id',  AuthVerification, VerifyAdmin, ExpenseTypeController.ExpenseTypeUpdate)



//Expense  API
router.post('/expense',  AuthVerification, VerifyAdmin, ExpenseController.CreateExpense )
router.get('/expense-list/:pageNo/:perPage/:searchKeyword', ExpenseController.ExpenseList )
router.get('/expense/:id', AuthVerification, VerifyAdmin, ExpenseController.ExpenseDetails)
router.post('/expense-update/:id', AuthVerification, VerifyAdmin, ExpenseController.ExpenseUpdate)



//Due Payment Admin  API
router.post('/due',  AuthVerification, VerifyAdmin, DueController.CreateDue )
router.get('/due-list/:pageNo/:perPage/:searchKeyword', DueController.DueList )
router.get('/due/:id', AuthVerification, DueController.DueByID)
router.post('/due-update/:id',  AuthVerification, VerifyAdmin, DueController.DueUpdate)



// Payment API 
router.post('/payment', AuthVerification, VerifyAdmin, PaymentController.CreatePayment )
router.get('/payment-list/:pageNo/:perPage/:searchKeyword', AuthVerification, PaymentController.PaymentList )
router.get('/payment-by-id/:id',  AuthVerification, PaymentController.PaymentByID)
router.post('/payment-update/:id',  AuthVerification, VerifyAdmin, PaymentController.PaymentUpdate)



// Dashboard API 
router.get('/total',  AuthVerification, VerifyAdmin, DashboardController.Total );
router.get('/monthlyReport/:year',  AuthVerification, VerifyAdmin, DashboardController.MonthlyReport );



















module.exports = router



