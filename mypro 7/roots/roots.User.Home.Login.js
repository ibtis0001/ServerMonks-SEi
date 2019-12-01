const express = require('express');
const router = express.Router();


router.get('/home/login',(req,res)=>{
  res.send('hello form login ')
})

module.exports = router
