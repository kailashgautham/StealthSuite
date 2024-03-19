import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

let userId = 125;

let database = {
    users: {
        "John": {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        "Sally": {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    }
}
app.listen(3000, () => {
    console.log('app is running on port 3000');
})

app.get('/', (req, res) => {
    res.send('this is working');
});

app.post('/signin', (req, res) => {
    try {
        const user = req.body.user;
        res.json(`Welcome ${user}, you currently have ${database.users[user].entries} entries`);
    } catch (error) {
        res.json("user does not exist!");
    }
});

app.post('/register', (req, res) => {
    const {user, email, password} = req.body;
    if (user in database.users) res.json("username already exists");
    database.users[user] = {
        id: (userId + 1).toString(),
        name: user,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    };
    userId++;
    res.json(database.users[user]);
});

app.get('/profile/:userId', (req, res) => {
    const {userId}  = req.params;
    if (!(userId in database.users)) res.json("user does not exist");
    res.json(database.users[userId]);
});

app.put('/image', (req, res) => {
    const {user}  = req.body;
    if (!(user in database.users)) res.json("user does not exist");
    database.users[user].entries++;
    res.json(`count updated: ${user}'s count is now ${database.users[user].entries}`);
});