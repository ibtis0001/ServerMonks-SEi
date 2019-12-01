const express = require('express');
const router = express.Router();
const Post = require('../model/Post')
const nodemailer = require('nodemailer')




router.patch('/user/:username',async (req,res)=>{
  try{
    const update = await Post.updateOne(
      {username:req.params.username},
      {$set:{username:req.body.username}}
    );
    res.json(update)
  }catch(err){
    res.json({mag:err})
  }
})



router.patch('/user/add/:username',async (req,res)=>{
  try{
    const update = await Post.updateOne(
      {username:req.params.username},
      {$push:{instore:req.body.instore}}
    );
    res.json(update)
  }catch(err){
    res.json({mag:err})
  }
})





router.get('/database',async (req,res)=>{
  try{
    const posts  = await Post.find()
    res.json({posts})
  }catch(err){
    res.json({"msg":err})
  }

})

router.get('/login/:auth',async (req,res)=>{
  try{

    const result = await Post.find({"email":req.params.auth})
    res.send(result)
    console.log(result);
  }catch(err){
    res.json({msg:err})
  }

})

router.post('/home/login',async (req,res)=>{
  const post = new Post({
    username:req.body.username,
    password:req.body.password,
    email:req.body.email,
    phone:'0'+req.body.phone,
    instoer:req.body.instoer
  });
  try{

    const Savepost = await post.save()
    console.log(Savepost);
    const options = {
    pool: true,
    host: "smtp-relay.gmail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: "designerhubdev@gmail.com",
      pass: "DesHup1234"
    }
  }
    //let transporter = nodemailer.createTransport(options,null)//
    let transporter = nodemailer.createTransport({
      service:'Gmail',
      auth:{
        user:"designerhubdev@gmail.com",
        pass:"DesHup1234"
      }
    })

    // console.log(transporter);
    var currentdate = new Date();
  var datetime = "Last Sync: " + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/"
                  + currentdate.getFullYear() + " @ "
                  + currentdate.getHours() + ":"
                  + currentdate.getMinutes() + ":"
                  + currentdate.getSeconds();
    var message = {
      from: "designerhubdev@gmail.com",
      to: `${req.body.email}`,
      subject: ' New Reg',
      text: `hey ${req.body.username}`,
      html: `<p> hey ${req.body.username} Its a thank you for dealing with Dishub  <br/> on ${datetime}</p>`

    };
    transporter.sendMail(message,(err,info)=>{
      console.log('err',err);
      console.log('info',info);
    })
    res.send({msg:'ok'})
    res.json(Savepost)

  }catch(err){
    res.json({mes:err })
  }

});










router.post('/admin/SendMail/ac',(req,res)=>{
  const options = {
  pool: true,
  host: "smtp-relay.gmail.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "designerhubdev@gmail.com",
    pass: "DesHup1234"
  }
}
  //let transporter = nodemailer.createTransport(options,null)//
  let transporter = nodemailer.createTransport({
    service:'Gmail',
    auth:{
      user:"designerhubdev@gmail.com",
      pass:"DesHup1234"
    }
  })

  // console.log(transporter);
  var currentdate = new Date();
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
  var message = {
    from: "designerhubdev@gmail.com",
    to: "alfisalmohammed@gmail.com",
    subject: `Server Monks - approvel on Item ${req.body.fname}`,
    text: 'hello',
    html: `<p>Dear ${req.body.fname} Your Requist on the Item ${req.body.fname} is Aproved <br/> on ${datetime}</p>`
  };
  transporter.sendMail(message,(err,info)=>{
    console.log('err',err);
    console.log('info',info);
  })
  res.send({msg:'ok'})

})

module.exports = router
