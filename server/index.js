const express = require('express');
const bodyParser = require('body-parser');
const mc = require( `./controllers/messages_controller` );
const session = require('express-session');
require('dotenv').config();

const createInitialSession = require('./middlewares/session');
const filter = require('./middlewares/filter');

const app = express();

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../build` ) );
//takes frontend files and serves it for you.HTTP req. handled by
// server giving them files by passing in file folder to static

app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:process.env.SESSION_SECRET,
    cookie:{
        maxAge:6000000
    }
}))

app.use(createInitialSession)
// app.use((req,res,next)=>{
//     createInitialSession(req,res,next)
// })

app.use((req,res,next)=>{
    if(req.method==="POST"|| req.method==="PUT"){
        filter(req,res,next)
    }
    else{
        next();
    }
})


const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.get(messagesBaseUrl + '/history', mc.history)
app.put( `${messagesBaseUrl}`, mc.update );
app.delete( `${messagesBaseUrl}`, mc.delete );

const port = process.env.PORT || 3000
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );