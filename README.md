# Welcome to the Staybnb!


## Introduction
This website is intended to replicate a few key features and general look and feel of the website Airbnb

Link to site: [https://airbnb-clone-aa-kevind.herokuapp.com/](https://airbnb-clone-aa-kevind.herokuapp.com/)

<br />
<br />

## Tech Stack
  Frameworks, Libraries, and Platform:

  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 	![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

  Database:

  ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

  Hosting:

  ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

<br />
<br />

## Features

### Log In

* Users can sign up, log in, and log out

* Users must be logged in to create, update, and delete spots

* Users must be logged in to create and delete reviews

### Spots Full CRUD

* Get all Spots

* Get Details of a single Spot

* Create a Spot if the User is logged in

* Update a Spot if the User is the owner of the Spot

* Delete a Spot if the User is the owner of the Spot

### Reviews 3/4 CRUD

* Get all Reviews for a single Spot

* Create a Review if the User is not the owner of the Spot and has not reviewed the Spot already

* Delete a Review if the Review belongs to the User

<br />
<br />

## Preview Images

### Home Page
![Staybnb-Homepage](https://user-images.githubusercontent.com/100639799/191555181-43dfeafe-547c-4734-8061-a3a8d55d00c5.png)

### Spot Details Page as Host
![Staybnb-SpotDetails-Host](https://user-images.githubusercontent.com/100639799/191555667-c0414a2b-9878-4736-8c19-b311f189c8bb.png)

### Spot Details Page as User
![Staybnb-SpotDetails-User](https://user-images.githubusercontent.com/100639799/191556498-02c0b9b9-654d-47c1-9466-dc8290d45ecf.png)

### Sign Up Page
![Staybnb-Signup](https://user-images.githubusercontent.com/100639799/191556764-c3f34764-9880-4498-a91e-7346b81c4313.png)

### Login Page
![Staybnb-Login](https://user-images.githubusercontent.com/100639799/191556834-a07f4c66-cdaa-4a5c-8186-003db27207cc.png)

### Become a Host Page
![Staybnb-BecomeHost](https://user-images.githubusercontent.com/100639799/191557184-f01769e7-c02f-4bb8-9b76-28f2375b15ca.png)

### Update Spot Page
![Staybnb-UpdateSpot](https://user-images.githubusercontent.com/100639799/191557371-df182054-f98e-4f77-8fc0-f65ab80367b2.png)

### Delete Spot Page
![Staybnb-DeleteSpot](https://user-images.githubusercontent.com/100639799/191557460-12c50e5c-3b2c-4569-beec-fd7f763ff4b1.png)

### Create a Review Page
![Staybnb-CreateReview](https://user-images.githubusercontent.com/100639799/191557593-58b960eb-ba93-4873-a839-791814545d99.png)

<br />
<br />

## Run Locally

* Clone/download the repo
* Open two terminals, in one cd into the backend and the other cd into the frontend
* In the backend run npm install and run npm start
* In the frontend run npm install and run npm start

### Environment Info
```
PORT=8000
DB_FILE=db/dev.db
JWT_SECRET=lZ1TiwPylqHtQQ==
JWT_EXPIRES_IN=604800
```

### Database Setup
```
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```
