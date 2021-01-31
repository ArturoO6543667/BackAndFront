const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app  = express();


//call database

const mysql = require('mysql');
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'68511635',
    database: 'cruddatabase'  
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded( {extended:true} ));
//prove connection in database
db.connect((err) => {
    if(err){
      console.log(err);
      return;
    }
    console.log('Connection established');
  });           

 /*
app.get("/", (req, res)=>{           //localhost:3001/    tal cual hace que sea completo

    res.send("algog"); 
});
*/

//mostrar datos
app.get('/api/get' , (req,res)=>{
    const sqlSelect = "SELECT * FROM movie_reviews ;";
    db.query(sqlSelect ,(err, result)=>{
        console.log(result);
        res.send(result);
    });
});


//isnert
app.post("/api/insert" , (req, res)=>{     //en el link  
    const movieName = req.body.movie_name;
    const movieReview = req.body.movie_review;
    console.log("el nombre de la pelicula es :"  + movieName);
    const sqlInsert = "INSERT INTO  movie_reviews (movie_name, movie_review) VALUES (?,?) ;";
    db.query(sqlInsert, [movieName , movieReview] , (err, result)=>{
        console.log(err);
    });
    
});           

//detele sql

app.delete('/api/delete/:movieName' , (req, res)=>{
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM  movie_reviews WHERE movie_name = ? ;";
    db.query(sqlDelete,name , (err,result) =>{
        if(err){console.log(err);}
    });
});
// update sql
app.put('/api/update' , (req, res)=>{
    const name = req.body.movie_name;
    const review = req.body.movie_review;
    console.log("this is important!!!"+name + review);
    const sqlUpdate = 
    "UPDATE movie_reviews  SET movie_review = ? WHERE movie_name = ? ; " ;
    db.query(sqlUpdate,[review, name], (err,result) =>{
        if(err){console.log(err);}
    });
});

//liston port
app.listen(3001 , ()=>{
    console.log("Running on port 3001");

});







    //prueba para insertar datos
    
    /*const sqlInsert = "INSERT INTO movie_reviews ( movie_name, movie_review) VALUES ('The Dark Knight', 'the best actor!') ;";
    db.query(sqlInsert , (err, result)=>{
        res.send("!row affected");
        if(err){console.log(err); }
    });*/