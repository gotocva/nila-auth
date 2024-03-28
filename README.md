### NilaAuth 


This is a simple NilaAuth code snippet for setting up authentication using Express.js. It utilizes MongoDB for database storage and JSON Web Tokens (JWT) for authentication.

### Prerequisites
- Node.js installed on your machine
- MongoDB installed and running locally
- Basic nodejs project 

### Installation
```
git clone https://github.com/gotocva/nila-auth
```

### Usage
1. In your project, import `express` and the authentication middleware function `auth` from `nila-auth`:

```javascript
const express = require('express');
const { auth } = require('nila-auth');
const app = express();

const authOptions = {
    name: 'siva', 
    MONGODB_URL: process.env.MONGODB_URL, 
    JWT_SECRET: process.env.JWT_SECRET 
}

auth(app, authOptions);

app.listen(3000, () => {
    console.log('Application running on port 3000');
});

```


### API details
// TODO : Once the auth connected to your project by default it has some api's will update the API documentation soon.

### License
This code is provided under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use it and modify it as needed.

### Author
This NilaAuth was created by Siva Bharathy.

### Acknowledgments
Special thanks to the developers and contributors of Express.js and MongoDB for their amazing work.