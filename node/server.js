import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt-nodejs";
import cors from 'cors';
import knex from 'knex';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'kailashgautham',
      password: '',
      database: 'stealth-suite',
    },
});

app.listen(3000, () => {
    console.log('app is running on port 3000');
})

app.get('/', (req, res) => {
    res.json("hello!");
});

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx('login').insert({ hash, email })
        .returning("email")
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                name,
                email: loginEmail[0].email,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'));
});

app.post('/signin', (req, res) => {
    console.log("entered signin")
    const { email, password } = req.body;
    db.transaction(trx => {
        trx('login')
        .select('*')
        .where({ email })
        .then(login => {
            if (!login.length || !bcrypt.compareSync(password, login[0].hash)) return res.status(400).json('wrong credentials');
            trx('users')
            .select('*')
            .where({'email': login[0].email})
            .then(user => {
                res.json(user[0]);
            })
        })
    })
    .catch(err => res.status(400).json("unable to get user"));
});

app.get('/profile/:id', (req, res) => {
    const { id }  = req.params;
    db('users')
    .select('*')
    .where({ id })
    .then(response => {
        if (response.length) res.json(response[0]);
        else res.json("user does not exist");
    })
    .catch(err => res.status(400).json('error getting user'));
});

app.put('/image', (req, res) => {
    const { id }  = req.body;
    db('users')
    .where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);

    })
});
