const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
  username:{
    type:String,
    require:true
  }
  ,
  password:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  phone:{
    type:Number,
    require:true
  },
  instore:[{type:Object,exp:String}]
})

module.exports = mongoose.model('Posts',PostSchema)
