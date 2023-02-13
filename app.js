const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));


const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);



//app.route() ndozvoljava da pod istom rutom definisem da li zelim get, post, delete

app.route('/articles')

    //GET ALL ARTICLES
    .get((req, res)=>{
        
        Article.find((err, articles)=>{
            if(!err){
                res.send(articles)
            }
        })

    })
    //ADD NEW ARTICLE
    .post((req, res)=>{
        
        const article = new Article({
            title: req.body.title,
            content: req.body.content
        });

        article.save((err)=>{
            if(!err){
                res.send("Successfully adding a new article")
            }else{
                res.send(err)
            }
        });

    })
    //DELTE ALL ARTICLES
    .delete((req, res)=>{

        Article.deleteMany((err)=>{
            if(!err){
                res.send("Successfully deleted all articles")
            }else{
                res.send(err)
            }
        })

    });

app.route('/articles/:title')

    //GET AN ARTICLE WITH SPECIFIC TITLE
    .get((req, res)=>{
        Article.findOne({title:req.params.title}, (err, article)=>{
            if(!err){
                res.send(article);
            }else{
                res.send("No articles with that title")
            }
        });
    })

    //PUT - update every parameter of the article
    .put((req, res)=>{
        Article.updateOne(
            {title:req.params.title},
            {title:req.body.title, content: req.body.content},
            (err)=>{
                if(!err){
                    res.send("Successfully updated article")
                }else{
                    res.send(err)
                }

        });
    })

    //PATCH - update only one parameter of the article, ne moram da menjam svako polje
    .patch((req, res)=>{
        Article.updateOne(
            {title:req.params.title},
            //Moze da menja ili samo content, ili samo title, ili oba
            {$set : req.body},
            (err)=>{
                if(!err){
                    res.send("Successfully updated article")
                }else{
                    res.send(err)
                }

        });
    })

    //DELETE - delete a specific article
    .delete((req, res)=>{
        Article.deleteOne(
            {title:req.params.title},
            (err)=>{
                if(!err){
                    res.send("Successfully deleted one article")
                }else{
                    res.send(err)
                }

        });
    });



app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})
