const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');


//must change your port to this for deployment else it wont work
const PORT = process.env.PORT;

//serves all our static files from the build directory.
app.use(express.static(path.join(__dirname, "build")));

// After all routes
// This code essentially serves the index.html file on any unknown routes.
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT);

const Home = require('./roots/Home')
const app = express();
app.use(cors())
// import route
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/',Home);



mongoose.connect('mongodb+srv://moe:Aa7788000@moe-pxfnp.gcp.mongodb.net/test?retryWrites=true&w=majority'
,{ useUnifiedTopology: true },
()=>{
  console.log('Server is up')
})


const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log(`app is up on PORT ${PORT}`));
