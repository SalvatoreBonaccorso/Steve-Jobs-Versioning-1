// mi importo la funzione express
var exp = require('express');
// mi importo il meccanismo del "body-parser"che sarà in grado di farci leggere il body inviati dai client( nel POST e PUT )
var bodyParser = require('body-parser');
// questo è il mio server con la funzione express()
var app = exp();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var moment = require ('moment');

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

app.listen(3001);

module.exports = app;