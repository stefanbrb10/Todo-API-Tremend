# Todo-API-Tremend

## Description
Here is my solution for the task I was given from [Tremend](https://tremend.com/) as part of their recruitment process for a NodeJS Developer Intern.
They gave me the task to build a REST API for a Todo app with NodeJS.

## Using the app
In order for this app to run, you will need:
- NodeJS
- MongoDB
  
The steps for installing it are as following:
- Connect to MongoDB on the port 27017
- Clone my repo
- Make sure you are on my repo's directory
- run npm install

To run the project use the command npm start


## Security
You will have to register and the log in using username and password. After logging in you will have a cookie with JWT available for an hour. The user has access only to the Todos inserted by him.

## Endpoints

### GET /todos
<strong>About: </strong> it will return the list with the current user's todos

<strong>Response: </strong> 

<ul>
<li>200 OK with an array of todos </li>
</ul>

### GET /todos/?limit=x&page=y
<strong>About: </strong> it will return the todos from the page y, where the size of the page is x. You can also add only one parameter, because I implemented default values for those. (page = 1; limit = 4).

<strong> Response: </strong>

<ul>
<li>200 OK with an array of the todos from the page </li>
<li>400 Bad Request (message: "Invalid parameter values") when the parameter values are not descriptive for a page. </li>
</ul>

### GET /todos/:id
<strong>About: </strong> returns the todo with the specific id. It must be a mongo type id.

<strong> Response: </strong>
<ul>
<li>200 OK with the specific todo </li>
<li>401 Unauthorized when the user tries to get another user's todo </li>
<li>404 Not Found (message: "Id is not of Mongo type and is invalid") when the Id is not even a Mongo valid id </li>
<li>404 Not Found (message: "Todo not found") when the id is mongo-type but there is no Todo with that Id. </li>


### POST /auth/register
<strong> About: </strong> Enter the username and password and have them saved in database. With them, you can login in the API.

<strong> Response: </strong> 
<ul>
<li>409 Conflict (message: "Username already exists")</li>
<li>200 OK (message: "User created successfully") </li>
</ul>

### POST /auth/login
<strong> About: </strong> Enter the username and password in order to use the API.

<strong> Response: </strong>

<ul>
  <li> 200 OK (message: "Logged in successfully") </li>
  <li> 401 Unauthorized (message: "Invalid username or password") </li>
</ul>

### POST /todos
<strong> About: </strong> Create a Todo with the properties: title(required), descripton(optional; default = "No description"), completed(optional; default = false)

<string> Response: </strong> 

<ul>
  <li> 400 Bad Request(message: "Todo validation failed: title: Path `title` is required:) when the required field is not populated</li>
  <li> 201 Created, inserting the created Todo in the database and showing an array with the inserted object </li>
</ul>

### DELETE /todos/:id 
<strong> About: </strong> Delete the todo with the id from the request

<string> Response: </string> 

<ul>
  <li> 200 OK (message: "Todo with title gatit pranz has been deleted")
  <li> 401 Unauthorized when the user tries to delete another user's todo</li>
  <li>404 Not Found (message: "Id is not of Mongo type and is invalid") when the Id is not even a Mongo valid id </li>
  <li>404 Not Found (message: "Todo not found") when the id is mongo-type but there is no Todo with that Id. </li>
</ul>

### PATCH /todos/:id 
<strong> About: </strong> Update specific parts of a todo

<strong> Response: </strong> 

<ul>
  <li> 404 Not Found (message: "Todo not found") </li>
  <li> 401 Unauthorized when the user tries to update another user's todo</li>
  <li> 409 Conflict (message: "A todo with this title already exists")</li>
  <li> 200 OK updating the specified Todo and a JSON of the new Todo </li>

  

</ul>
