// mi importo la funzione express
var exp = require('express');
// mi importo il meccanismo del "body-parser"che sarà in grado di farci leggere il body inviati dai client( nel POST e PUT )
var bodyParser = require('body-parser');
// questo è il mio server con la funzione express()
var app = exp();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var moment = require ('moment');
// mi connetto al database
const host = 'localhost';
const dbName = 'myDatabase';

const mongoose = require('mongoose');
mongoose.connect('mongodb://'+ host + '/' + dbName);

var db = mongoose.connection;
db.on('error', function() {
console.error('Connection error!')
});
db.once('open', function() {
console.log('DB connection Ready');
});

var tweets = [];
var counter = 0;

exports.createTwetts = function (author, description){
    tweets.push (
        {
            'author' : author,
            'data' : moment().format("DD/MM/YYYY"),
            'description' : description,
            id : counter++
        }
    );
    return 'Create a new tweets';
}

// funzione che mi cancella un tweet in base al suo ID
exports.deleteTweetsById = function (id) {
    for (var i = 0; i < tweets.length; i++) {
        if (tweets[i].id === id) {
            tweets.splice(i, 1);
            return tweets;
        }
    }
}
// funzione che mi mostra tutti la lista di tweets
exports.listTweets = function () {
    return tweets;
}
// funzione che mi mostra tutti gli utenti inseriti


app.listen(3001);

module.exports = app;