# NodeApiChuck special for chatbotech.sk
REST API docs:
GET /getEmails | returns all emails in a json format
POST /addChuckJoke | create a new email and adds a joke to it
PUT /changeEmail {id=int, newmessage=string} | replace a joke from email by index in an email array with a new message
DELETE /deleteEmail {id=int} | delete email by an index
