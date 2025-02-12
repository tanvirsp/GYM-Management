const express = require('express');
const router = express.Router()


const upload = require('../Middleware/uploader.js');
const AuthVerification = require('../Middleware/AuthVerification.js');

const UserController = require("../Controllers/UserController.js");

const PackageController = require("../Controllers/PackageController")
const ServiceController = require("../Controllers/ServiceController.js");
const TrainerController = require("../Controllers/TrainerController.js");
const MemberController = require("../Controllers/MemberController.js");
const ExpenseTypeController = require("../Controllers/ExpenseTypeController.js");
const ExpenseController = require("../Controllers/ExpenseController.js");
const DueController = require("../Controllers/DueController.js");
const PaymentController = require("../Controllers/PaymentController.js");



router.post("/file-upload", upload.single('image'),  async(req, res) =>{
    try {
        
      res.status(200).send({status: true, data: req.file});
    } catch (error) {
        res.status(400).send({status: false,  message: error.message})
        
    }
  });



  




//User API


//User API
router.post('/register',  UserController.CreateUser);
router.post('/login', UserController.LoginUser);
router.get('/logout', UserController.LogoutUser);
router.get("/send-otp/:email", UserController.SendOtp )
router.get("/verify-otp/:email/:otp", UserController.VerifyOTP );
router.post("/reset-password", UserController.ResetPassword );
router.post("/change-password", AuthVerification, UserController.ChangePassword );
router.get("/user-profile", AuthVerification,  UserController.Profile );
router.post("/update-profile", AuthVerification, UserController.ProfileUpdate );
router.get("/users", AuthVerification, UserController.UserList );




//Package API
router.post('/package', PackageController.CreatePackage )
router.get('/package-dropdown', PackageController.PackageDropdown )
router.get('/package-list/:pageNo/:perPage/:searchKeyword', PackageController.PackageList )
router.get('/package/:id', PackageController.PackageDetails )
router.post('/package-update/:id', PackageController.UpdatePackage )
router.delete('/package/:id', PackageController.DeletePackage )


//Service API
router.post('/service', ServiceController.CreateService )
router.get('/service-dropdown', ServiceController.ServiceDropdown )
router.get('/service-list/:pageNo/:perPage/:searchKeyword', ServiceController.ServiceList )
router.get('/service/:id', ServiceController.ServiceDetails )
router.post('/service-update/:id', ServiceController.ServiceUpdate )
router.delete('/service/:id', ServiceController.ServiceDelete )





//Trainer API
router.post('/trainer', TrainerController.CreateTrainer )
router.get('/trainer-dropdown', TrainerController.TrainerDropdown )
router.get('/trainer-list/:pageNo/:perPage/:searchKeyword', TrainerController.TrainerList )
router.get('/trainer/:id', TrainerController.TrainerDetailsByID )
router.post('/trainer-update/:id', TrainerController.UpdateTrainer )




//Member API
router.post('/member', MemberController.CreateMember )
router.get('/member-list/:pageNo/:perPage/:searchKeyword', MemberController.MemberList )
router.post('/member/:id', MemberController.MemberUpdate )
router.get('/member-update/:id', MemberController.MemberDetailsByID )


//Expense Type API
router.post('/expense-type', ExpenseTypeController.CreateExpenseType )
router.get('/expense-type-dropdown', ExpenseTypeController.ExpenseTypeDropdown )
router.get('/expense-type-list/:pageNo/:perPage/:searchKeyword', ExpenseTypeController.ExpenseTypeList )
router.get('/expense-type/:id', ExpenseTypeController.ExpenseTypeDetails)
router.post('/expense-type-update/:id', ExpenseTypeController.ExpenseTypeUpdate)

//Expense  API
router.post('/expense', ExpenseController.CreateExpense )
router.get('/expense-list/:pageNo/:perPage/:searchKeyword', ExpenseController.ExpenseList )
router.get('/expense/:id', ExpenseController.ExpenseDetails)
router.post('/expense-update/:id', ExpenseController.ExpenseUpdate)



//Due Payment  API
router.post('/due', DueController.CreateDue )
router.get('/due-list/:pageNo/:perPage/:searchKeyword', DueController.DueList )
router.get('/due/:id', DueController.DueByID)
router.post('/due-update/:id', DueController.DueUpdate)



// Imcome API
router.post('/payment', PaymentController.CreatePayment )
router.get('/payment-list/:pageNo/:perPage/:searchKeyword', PaymentController.PaymentList )
router.get('/payment-by-id/:id', PaymentController.PaymentByID)
router.post('/payment-update/:id', PaymentController.PaymentUpdate)














module.exports = router



