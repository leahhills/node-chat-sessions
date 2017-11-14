```## CUSTOM MIDDLEWARE
- Syntax
```js
function(req, res, next) {
  // code ...
  next()
}
```
- Middleware is like the middle man. Middleware will be fired before the endpoint is.
- Remember that the code is read top to bottom. If you want an endpoint to be affected by the middleware, the endpoint should be below the middleware with the middleware being in `app.use()`. Any endpoints above the middleware will not be affected by that middleware. 
- You can also put middleware directly in the endpoint and it will affect only that endpoint.
- Remember that if you don't call `next`, it will not move on to the next portion of code. It will freeze and be done. 
- For organization, it's good to put custom middleware into it's own file.

## SESSIONS
- A way for us to keep persistant data in our server by associating the client with an ID.
- On the client side, the session ID is stored in a cookie in the browser. Any HTTP request to the server once the session ID is saved will be sent with the session ID. 
- On the server side, the session ID is stored in the session store.

- Syntax
1 - npm install express-session --save
2 - const session = require('express-session')
3 - app.use(session({
      resave: false,
      saveUnitialized: true,
      secret: process.env.SESSION_SECRET
    }))

- You can access data on the session through the req object
`req.session.[whatever]`

## PARAMS & QUERIES
- Both are ways to access information from the request url
- we access these values through the req object
`req.params`
`req.query`
* Params
    - Required
  - Need to be indicated in the endpoint url with a colon
    - `'/api/users/:id'`
 - The data is put in the request url --- `localhost:3000/api/users/3`
   - With the above request url, you would access 3 with `req.params.id`

* Queries
  - Optional
  - They do not need to indicate in the endpoint url
    - `'/api/users'`
 - The data is put in the request url --- `localhost:3000/api/users?key=value&key=value`
   - With the above request url, you would access the key value pairs with `req.query.[key name]`
```