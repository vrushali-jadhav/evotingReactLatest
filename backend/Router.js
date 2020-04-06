const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

var otp;
const high = 999999;
const low = 111111;
var email;
class Router {
    constructor(app,db){
        this.login(app,db);
        this.isLoggedIn(app,db);
        this.otpPost(app,db);
        this.registerPost(app,db);
    }

    registerPost(app,db)
    {
        app.post('/registerpost', function(req, res) {
            email = req.body.email;
            var username = req.body.username;
            var fname = req.body.fname;
            var lname = req.body.lname;
            var dob = req.body.dob;
            var gender = req.body.gender;
            var salt = bcrypt.genSaltSync(10);
            var encryptedpassword = bcrypt.hashSync(req.body.password, salt);
            console.log(email,username, encryptedpassword, fname, lname, dob, gender);
            var sql = `INSERT INTO users(username,gender, password, firstname, lastname, emailid, dob, emailverified) VALUES(?,?,?,?,?,?,?,?)`;
        
            db.query(sql, [ username, gender, encryptedpassword, fname, lname, email, dob, 0 ], function(error, results) {
                if (error) {
                    console.log('An error ocurred...', error);
                    res.json({
                        code: 400,
                        sucees:false,
                        msg: 'An error ocurred..'
                    });
                    return;
                } else {
                    console.log('Success');
        
                    otp = Math.floor(Math.random() * (high - low) + low);
                    console.log(otp);
                    const data = 'Please Verify your email with the the One-time password given: '.concat(otp.toString());
                    console.log(data);
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'electronicballet@gmail.com',
                            pass: '25623360'
                        }
                    });
        
                    var mailOptions = {
                        from: 'electronicballet@gmail.com',
                        to: email,
                        subject: 'Email Verification - ElectronicBallet',
                        text: data
                    };
                    var successflag = true;
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log(error);
                            successflag=false;
                            // res.json({
                            //     code: 400,
                            //     sucees:false,
                            //     msg: 'An error ocurred..'
                            // });
                            // return;

                        } else {
                            // res.json({
                            //     code: 200,
                            //     sucees:true,
                            //     msg: 'An error ocurred..'
                            // });
                            console.log('Email sent: ' + info.response);
                            res.json({
                                code: 200,
                                success:true,
                                msg: 'success'
                            });
                            console.log('Success sign-up');
    
                            return;
                            console.log("hello high bye bye");
                            // return;
                        }
                    });

                    console.log("hello high bye bye2");
                    if(successflag){

                        res.json({
                            code: 200,
                            success:true,
                            msg: 'success'
                        });
                        console.log('Success sign-up');

                        return;
                    }else{
                      
                        res.json({
                            code: 400,
                            success:false,
                            msg: 'An error occured'
                        });
                        console.log('an error occured sign-up');
                        return;
                    }
                   
                }
            });
        });
    }

    otpPost(app,db){
        app.post('/otppost', function(req, res) {
            var otpposted = req.body.otp;
            if (otpposted == otp) {
                console.log('here');
        
                var sql = `UPDATE users SET emailverified = '1' WHERE emailid = ?`;
                email =req.body.email
                db.query(sql, [ email ], function(error, results) {
                    if (error) {
                        console.log('error occurred', error);
                        res.json({
                            code:400,
                            success: false,
                           msg: 'An error occured..'
                       });
                       return;
                    } else {
                        console.log("usernaame"+req.body.username);
                        res.json({
                            code:200,
                            success: true,
                            username: req.body.username,
                            msg: 'Otp successfully verified..'
                       });
                        console.log('Success sign-up');
                        return;
                    }
                });
               
            } else {
                res.json({
                    success: false,
                   msg: 'An error occured..'
               });
               return;
            }
        });
    }

    isLoggedIn(app,db)
    {
        app.post('/isLoggedIn', (req,res) => {
            if(req.session.userID){
                let cols = [req.session.userID];
                db.query('select * from users where id =? LIMIT 1', (err,data,fields) => {
                    if(data && data.length===1)
                    {
                        res.json({
                            success: true,
                            username: data[0].username
                        });
                       return true;
                    }
                    else{
                        res.json({
                            success: false,
                           msg: 'An error occured..'
                       });
                       return;
                    }
                });
            }
            else{
                res.json({
                    success: false,
                   msg: 'An error occured..'
               });
               return;
            }
        });
    }

    login(app,db)
    {
        app.post('/login', (req,res) => {
            let username = req.body.username;
            let password = req.body.password;
            username = username.toLowerCase();

            let cols= [username];
             db.query('SELECT * FROM users where username = ? LIMIT 1', cols, (err, data, fields)=> 
             {
                if(err)
                {
                    res.json({
                         success: false,
                        msg: 'An error occured..'
                    });
                    return;
                }
                if(data && data.length===1)
                {
                     bcrypt.compare(password, data[0].password, (bcryptErr, verfied) => {
                        if(verfied){
                            req.session.userID = data[0].id;
                            res.json({
                                success: true,
                                username: data[0].username
                            });
                            return;
                        }
                        else
                        {
                            res.json({
                                success: false,
                                msg: 'Invalid password'
                            });
                            return;
                        }
                    });
                }
                else{
                    res.json({
                        success: false,
                        msg: 'User not found'
                    });
                }
            });
        });
    }
}
module.exports = Router;
