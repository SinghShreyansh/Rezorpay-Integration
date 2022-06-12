// Inside app.js 
const express = require('express');
const Razorpay = require('razorpay'); 
const bodyparser = require("body-parser");

  
// This razorpayInstance will be used to
// access any resource from razorpay
const razorpayInstance = new Razorpay({
  
    // Replace with your key_id
    key_id: "rzp_test_8q4HUG7HQkYDGJ",
  
    // Replace with your key_secret
    key_secret: "s5zxDjW6GnAV3WRDJf0qWj6Q"
});
  
const app = express();
const PORT = process.env.PORT || '5000';

app.use(bodyparser.json());

app.get("/", (req, res) => {
    res.sendFile("index.html", {root: __dirname});
})

  
// Here we will create two routes one 
// /createOrder and other /verifyOrder 
// Replace these comments with the code 
// provided later in step 2 & 8 for routes
app.post('/createOrder', (req, res)=>{ 
    // console.log(req.body);
    // return res.json({"msg":"hello"})
  
    // STEP 1:
    const {amount,currency,receipt, notes}  = req.body;      
          
    // STEP 2:    
    razorpayInstance.orders.create({amount, currency, receipt, notes}, 
        (err, order)=>{
          
          //STEP 3 & 4: 
          if(!err)
            res.json(order)
          else
            res.send(err);
        }
    )
});
  
app.listen(PORT, ()=>{
    console.log("Server is Listening on Port ", PORT);
});