const mongoose = require('mongoose');



mongoose
    .connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`)
    .then((x) => {
        console.log(`DATABASE CONNECTED SUCCESFULLY: ${process.env.DATABASE_NAME}`)
    })
    .catch((err) => {
        console.error('Error connecting to mongo', err.reason)
    });

