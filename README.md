# RESTful-API-for-articles
I made a simple RESTful API for searching article title and content. I used Express and Mongoose.

Routes:

1. GET all articles : GET|http://localhost:3000/articles

2. POST an article : POST|http://localhost:3000/articles
 
    - Need to set values for the title and the content key

3. DELETE all articles : DELETE|http://localhost:3000/articles

4. GET one article : GET|http://localhost:3000/articles/:articleTitle

5. Update one article : 
    
    - PUT|http://localhost:3000/articles/:articleTitle
    
        - Need to set values for the title and the content key
    
    - PATCH|http://localhost:3000/articles/:articleTitle
    
        - Need to set values for the title or the content key
        
 6. Delete one article:
 
    - DELETE|http://localhost:3000/articles/:articleTitle
