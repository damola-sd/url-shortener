# url-shortener

- This project uses Express, Typescript and a MongoDB Atlas Cloud Database. For the purposes of this evealuation, the .env file containing all the required configs has been uploaded for use

- To start the application
1. Clone the repo
2. Run ``npm install``
3. Run ``npm start`` to build and run the project 
4. ``npm run dev`` can also be used to start the project

Packages used are 
- ``yup`` for validation, ``nanoid`` for short code creation, ``monk`` for quick mongodb connection.

# Routes

- ``/shorten`` takes a string required field ``longUrl``. Validates to ensure it's a valid URL and returns the shortened URL 
- ``/:code`` redirects the user to the original url string. Code represents the shortened slug created 
