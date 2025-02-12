    const nodemailer=require('nodemailer');
    
    const EmailSend=async (emailTo, OTPcode, emailSubject)=>{
        try {

                const  transport= nodemailer.createTransport({
                host:"zpjamalpur.com",
                port: 465,
                secure: true,
                auth:{user:"noreply@zpjamalpur.com", pass:"}%cI}O)MOSBP"},
                tls:{rejectUnauthorized:true}
            })


            

           

            const mailOption={
                from:'Zilla Porishad <noreply@zpjamalpur.com>',
                to:emailTo,
                subject:emailSubject,
                html: `Your PIN Number is : ${OTPcode}`
            }
            
            await transport.sendMail(mailOption);

        
        } catch (error) {
            console.log(error)
        }
       
    }

    module.exports=EmailSend;