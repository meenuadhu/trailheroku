const express = require('express');
const Retaildata = require('./src/model/Retaildata');
const RetailCoursedata = require('./src/model/RetailCoursedata');
const InstitutionalCoursedata = require('./src/model/InstitutionalCoursedata');
const CorporateCoursedata = require('./src/model/CorporateCoursedata');
var nodemailer = require('nodemailer');

//const User = require('./src/model/user');
const cors = require('cors');
var app = new express();
app.use(cors());
app.use(express.json());


app.post('/insert',function(req,res){
    console.log(req.body);
       
    var item=

    {
    name:req.body.applicant.name,
    phone:req.body.applicant.phone,
    email:req.body.applicant.email,
    employed:req.body.applicant.employed,
    highest_qualification:req.body.applicant.qualification,
    messsage:req.body.applicant.message,
    //downloaded:req.body.retail.downloaded

     }

 var retail=Retaildata(item);
 try{
 retail.save();
 sendConfirmationMail(item, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent");
      res.send(info);
    }
  });
 }
 catch(err){

    console.log(err+"not connected");
 }
});

app.get('/display',function(req,res){
    

    console.log("Inside display server");
    try{
    Retaildata.find()
                .then(function(data){
                    console.log(data);
                    res.send(data);
                   
                });
            }
            catch(err){
                console.log(err+"dispal...");
            }
});

//sent mail---------------------
const sendConfirmationMail = (user, callback) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "projectfsd711@gmail.com",
        pass: "ictakweb02@"
      }
    });

    const mailOptions = {
        from: `"ICTAK", "projectfsd711@gmail.com"`,
        to: `<${user.email}>`,
        subject: "Brochure download link",
        html: "<h3>Greetings from ICTAK</h3><p></p>"
      };
      
      transporter.sendMail(mailOptions, callback);
     
  }
  
 //End Send mail------------------------------------------- 

 app.post('/addRetailCourse',function(req,res){
  console.log(req.body.course.name+"Inside Server of addRetailcourse");
     
  var item=  {
  
  name:req.body.course.name,
  category:req.body.course.category,
  about:req.body.course.about,
  objective:req.body.course.objective,
  sponserimage:req.body.course.sponserimage,
  knowledgeParterimage:req.body.course.knowledgeParterimage,
  internshipPartnerimage:req.body.course.internshipPartnerimage,
  courseDelivery:req.body.course.courseDelivery,
  agenda:req.body.course.agenda,
  highlights:req.body.course.highlights,
  eligibility:req.body.course.eligibility,
  age:req.body.course.age,
  test:req.body.course.test,
  courseFee:req.body.course.courseFee,
  refundPolicy:req.body.course.refundPolicy,
  importantDates:req.body.course.importantDates,
  img1:req.body.course.img1,
  img2:req.body.course.img2,
  questionPaperLink:req.body.course.questionPaperLink,
  status:req.body.course.status,
  brochureTitle:req.body.course.brochureTitle
    

   }

//------------Check for the catogery-----------


if(item.category==="Retail"){
  console.log(item.name+"....inserted");
  var retail=RetailCoursedata(item);
  try{
  retail.save();
  
  }
  catch(err){
    console.log("Cannot insert retail course data "+err);
  }

}//endif
else if(item.category==="Institutional"){
  console.log(item.name+"....inserted in Institutioal");
  var retail=InstitutionalCoursedata(item);
  try{
  retail.save();
  
  }
  catch(err){
    console.log("Cannot insert instutional course data "+err);
  }

}//end else if

else if(item.category==="Corporate"){
  console.log(item.name+"....inserted in Institutioal");
  var retail=CorporateCoursedata(item);
  try{
  retail.save();
  
  }
  catch(err){
    console.log("Cannot insert corporate course data "+err);
  }

}//end else if



 });

 //----------------------------End---------------------------------------
 //---------------Get Retail data----------------------------------------
app.get('/getRetailCourseData',function(req,res){
    

  console.log("Inside display server");
  try{
  RetailCoursedata.find()
              .then(function(data){
                  console.log(data);
                  res.send(data);
                 
              });
          }
          catch(err){
              console.log(err+"dispal...");
          }
});
//________________________________End___________________________________________
//--------------------------------Start get Institutional data-----------------
app.get('/getInstitutionalCourseData',function(req,res){
    

  console.log("Inside display server");
  try{
  InstitutionalCoursedata.find()
              .then(function(data){
                  console.log(data);
                  res.send(data);
                 
              });
          }
          catch(err){
              console.log(err+"dispal...");
          }
});
//_______________________________________________________________________________________
//--------------------------------Start get Corporate data-----------------
app.get('/getCorporateCourseData',function(req,res){
    

  console.log("Inside display server");
  try{
  CorporateCoursedata.find()
              .then(function(data){
                  console.log(data);
                  res.send(data);
                 
              });
          }
          catch(err){
              console.log(err+"dispal...");
          }
});
//______________________________End_____________________________________



// -----------------------------get single course details-------------


app.get('/getRetailCourseDetails/:name',  (req, res) => {

  console.log("Inside Single Course Details :");
  const name = req.params.name;
  RetailCoursedata.findOne({"name":name})
  .then((course)=>{
    console.log("Single Course Details :"+course.name+"---"+course);
      res.send(course);
  });
})




app.listen(3000, function(){
    console.log('listening to port 3000');
});