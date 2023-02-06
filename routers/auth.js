const express = require('express');
const router = express.Router();
// api/auth
// api/auth/register

router.get('/', (req, res) =>{
    res.send("Auth Home Page");
});

router.get('/register', (req, res) =>{
    res.send("Auth Register Page");
});

module.exports = router;