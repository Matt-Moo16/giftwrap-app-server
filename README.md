# Giftwrap

## Link 

[Giftwrap](https://giftwrap-app.vercel.app/)

## Screenshot
![Screenshot](https://user-images.githubusercontent.com/65912593/105913612-19d8ca00-5ffb-11eb-851b-bc519e4d689e.png)

## Client/Frontend 
[Link to frontend](https://github.com/Matt-Moo16/giftwrap-app)

### API Endpoints

#### /auth
To use this endpoint /login is also needed to make the api call, and this endpoint is used to login users. This endpoint has only one CRUD operation and that is POST. No authorization needed for this endpoint. 

#### /users
This endpoint has one CRUD operation and this is POST. No authorization is needed for the endpoint. This endpoint is used to sign up users and add them to the /auth/login endpoint. 

#### /names
The /names endpoint uses both GET and POST CRUD operations. Authorization is needed for the POST operation of the endpoint. The GET operation will get all the names and the POST will add a new name to the list of names. 

##### /names/:name_id 
This endpoint uses both GET and DELETE CRUD operations. Authorization is needed for both of these operations for this endpoint. The GET operation will get a certain name after a name id is inputed as a paramater. The DELETE operation will delete a name by getting the name id. 

#### /gifts
The /gifts endpoint uses both GET and POST CRUD operations. Authorization is needed for the POST operation of the endpoint. The GET operation will return a list of all the gifts. The POST operation will add a new gift to the list of gifts.

##### /gifts/:gift_id
This endpoint uses both GET and DELETE operations. Authorization is needed for both of the operations for this endpoint. The GET will get a certain gift after a gift id is inputed as a paramater. The DELETE operation will delete a gift using the gift id. 

## About/Synopsis
Giftwrap is an app that allows users to keep track of gifts that they want to purchase for their family or friends. Users can create lists to represent the people they want to gift to and add links from across the web. When the links are added as gifts, Giftwrap does the rest by taking the OG tags from the link to display product information at a glance for the user. 

## Technologies Used
* React
* JavaScript
* CSS
* HTML
* Node
* PostgreSQL

## Scripts
First Clone the repository to your local machine.

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's main branch.
