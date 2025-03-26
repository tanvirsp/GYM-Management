const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
require("./src/Utility/CronJobs"); // Import the cron job file

const app = require("./app");

const port= process.env.RUNNING_PORT || 5000




mongoose.connect(`${process.env.DATABASE_ATLAST}`)
.then(()=>{
    console.log(`Database connection is successful ` );
    
    app.listen(port, () => {
        console.log(`Server Running on Port ${port}`)
    })
});
  


