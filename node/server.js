import express from 'express';
import fs from 'fs';
// const app = express();

// //middleware to do something with the response before sending it to the actual call
// // app.use(express.urlencoded({extended: false}));
// // app.use(express.json());
// app.use(express.static(process.cwd() + '/public'));

// app.listen(3000);
fs.readFile('./script.js', (err, data) => {
    if (err) {
        console.log("error lmao")
    }
    else {
        console.log("1: ", data.toString('utf8'));
    }
})

const file = fs.readFileSync('./script.js');
console.log("2: ", file.toString());

fs.appendFile('./script.js', 'I actually appended this stuff now.', err => {
    if (err) console.log(err);
});

fs.writeFile('./bye.txt', 'sad to see you go', err => {
    if (err) console.log(err);
});

fs.unlink('./bye.txt', err => {
    if (err) console.log(err);
})

