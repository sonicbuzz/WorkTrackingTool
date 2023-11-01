import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import reqlog from 'morgan';
import uservalid from './loginvalidate.js';
const app = express();
const publicDir = path.join(process.cwd(),'public');

app.use(reqlog('dev')); // logger middleware
//app.use(logger);
app.use(bodyParser.urlencoded({extended:true}));  // bodyparser middleware. without this req will not have a body.

app.use(express.static(publicDir)); 


app.listen(3000, ()=>{
    console.log("Server is running");
});

app.get('/', (req,res)=>{
   res.sendFile(path.join(publicDir,'index.html'));
   
});

app.post('/login', (req,res)=>{
    const validationResult = uservalid(req.body.username,req.body.passcode);
    if (validationResult === 1) {
        console.log(`Received login request with username: ${req.body.username} and passcode: ${req.body.passcode}`);
        res.status(200).send('Login successful.');
    } else if (validationResult === 0) {
        console.log(`Received login request with username: ${req.body.username} and passcode: ${req.body.passcode}`);
        res.status(200).send('Invalid Password.');
    } else if (validationResult === 'User not found') {
        console.log(`Received login request with username: ${req.body.username} and passcode: ${req.body.passcode}`);
        res.status(200).send('User not found.');
    }
});

/*function logger(req,res,next) {  // custom middleware function
    console.log('Request Method :', req.method);
    console.log ('Request URL: ', req.url);
    next(); // next() is important to place inside the middleware. Otherwise request will not reach the route handlers.
} */