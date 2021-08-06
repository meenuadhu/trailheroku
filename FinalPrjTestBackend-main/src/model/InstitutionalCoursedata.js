const mongoose=require('mongoose');
// mongoose.connect("mongodb://localhost:27017/ictak")
// .then (() => console.log ('MongoDB connected.'))
 mongoose.connect("mongodb+srv://userone:userone@projectfiles.oottq.mongodb.net/ICTAKWEBINFO?retryWrites=true&w=majority")
 .then (() => console.log ('MongoDB connected.')) 

   


const Schema=mongoose.Schema;
const InstitutionalCourseSchema=new Schema({
   
    name:String,
  category:String,
  about:String,
  objective:String,
  sponserimage:String,
  knowledgeParterimage:String,
  internshipPartnerimage:String,
  courseDelivery:String,
  agenda:String,
  highlights:String,
  eligibility:String,
  age:String,
  test:String,
  courseFee:String,
  refundPolicy:String,
  importantDates:String,
  img1:String,
  img2:String,
  questionPaperLink:String,
  status:String,
  brochureTitle:String
   
});

var InstitutionalCourse=mongoose.model('institutionalCourse',InstitutionalCourseSchema);
module.exports=InstitutionalCourse;