let app = require('express');
app.get('./', (req, res) => {
    res.end('hellow world')
});
app.listen(3000);
