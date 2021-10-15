const data = require('./Environment/Variables');
const operations = require('./Connections/Connections');

var express = require('express');
const { response, request } = require('express');
const app = express();

var bodyParser = require('body-parser');
const upload = require('express-fileupload');
const cors = require('cors');

const router = express.Router();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(upload());

app.use('/api', router);

router.use((request,response,next)=>{
   next();
})

router.route(data.variables.urlExcPhotogrammetry).post((request,response)=>{
  try{
    operations.execPhotogrammetry(request.body).then(result => {
      response.status(201).json(result);
    });
  }
  catch (error) { 
    console.log(error)
  }
});

router.route(data.variables.urlSendImage).post((request,response)=>{
   try{
      operations.sendImage(request.body).then(result => {
         response.status(201).json(result);
       });
    }
    catch (error) { 
     console.log(error)
    }
});

var port = process.env.PORT || 3001;
app.listen(port);
console.log('Order API is runnning at ' + port);