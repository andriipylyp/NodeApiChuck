const express = require('express')
var request = require('request');

const api_url = 'https://api.chucknorris.io/jokes/random'


var emails = new Array()
const app = express()

app.get('/getEmails', (req, res) => {
    res.status(200).json({message: emails})
    return
})

app.post('/addChuckJoke', (req, res) => {
    request(api_url, function (error, response, body) {
        emails.push({'email': JSON.parse(body)['id']+'@something.com', 'joke': JSON.parse(body)['value']})
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
    var id = req.query.id
    var message = req.query.newmessage
    if (id && message){
        emails[id]['joke'] = message
        res.status(200).json({message: 'Successfully...', emails})
    }
    else{
        res.status(400).json({message: 'Id not exist...'})
    }
    return
})


app.listen(3002, () => console.log('Server is running on port 3002'))