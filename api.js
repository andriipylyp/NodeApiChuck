const express = require('express')
var request = require('request')
const nodemailer = require('nodemailer')
let bodyParser = require('body-parser')

const api_url = 'https://api.chucknorris.io/jokes/random'

let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
       user: 'mytestemailap10000@gmail.com',
       pass: '4FBCwyZheeGjEt2'
    }
});

var emails = ['andreypilip1122@gmail.com']
const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.get('/getEmails', (req, res) => {
    res.status(200).json({message: emails})
    return
})

app.post('/addEmail', (req, res) => {
    const email = req.body['email']
    console.log(req.body)
    if (email){
        emails.push(email)
        res.status(200).json({message: 'Success...'})
    }
    else{
        res.status(400).json({message: 'No email parameter...'})
    }
    return
})

app.get('/sendChuckJoke', (req, res) => {
    request(api_url, function (error, response, body) {
        var emails_s = ''
        var joke = JSON.parse(body)['value']
        emails.forEach(element => {
            emails_s += element + ', '
        });
        // console.log(emails[0])
        const message = {
            from: 'test@email.com',
            to: emails_s,
            subject: 'Chuck Joke',
            text: joke
        };
        transport.sendMail(message, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(info);
            }
        });
        res.status(200).json({message: 'Successfully'})
        return
    })
    return
})

app.delete('/deleteEmail', (req, res) => {
    var id = req.query.id
    if (id){
        emails.splice(id, 1)
        res.status(200).json({message: 'Successfully...', emails})
    }
    else{
        res.status(400).json({message: 'Id not exist...'})
    }
    return
})

app.put('/changeEmail', (req, res) => {
    var old_email = req.body['email']
    var new_email = req.body['new_email']
    if (old_email && new_email){
        emails[emails.indexOf(old_email)] = new_email
        res.status(200).json({message: 'Successfully...', emails})
    }
    else{
        res.status(400).json({message: 'email or new_email not exist...'})
    }
    return
})


app.listen(3002, () => console.log('Server is running on port 3002'))