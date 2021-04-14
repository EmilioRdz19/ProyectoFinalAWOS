require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { json } = require('express');
const app = express();

// Habilita CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
 
app.get('/',function(req, res){
   res.send('<h1>Bienvenido a mi servidores REST</h1>');
});


mongoose.connect ( 'mongodb://localhost:27017/cafeteria',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
 },(err, res ) => {
   if(err) throw new err; 
   console.log('Base de datos Online ');
});

app.use(require('./routes/usuario'));

app.use(require('./routes/categoria'));

app.use(require('./routes/login')); 

app.use(require('./routes/producto')); 



app.listen(process.env.PORT, () => {
  console.log('el servidor esta en linea por el puerto ',process.env.PORT); 
});  