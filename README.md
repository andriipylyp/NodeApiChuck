# NodeApiChuck special for chatbotech.sk

REST API docs:

GET /getEmails | returns all emails in a json format

GET /sendChuckJoke | send Chuck Noris Joke to all emails in array

POST /addEmail {email=string} | adds new email to array

PUT /changeEmail {email=string, new_email=string} | replace an email with new email

DELETE /deleteEmail {id=int} | delete email by an index
