const express = require('express');
const router = express.Router();
// api/questions
// api/questions/delete

router.get('/', (req, res) =>{
    res
    .status(404)
    .json({
        success: false,
    });
});

router.get('/delete', (req, res) =>{
    res.send("Questions Delete Page");
});

module.exports = router;