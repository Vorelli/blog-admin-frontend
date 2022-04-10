var express = require('express');
const { expressCspHeader, SELF } = require('express-csp-header');
var app = express();
var helmet = require('helmet');
var path = require('path');

app.use(helmet());

app.use(expressCspHeader({
  directives: {
    'default-src': [SELF, 'https://stackpath.bootstrapcdn.com', 'https://infinite-taiga-59787.herokuapp.com', '\'unsafe-inline\''],
    'script-src': [SELF, 'https://infinite-taiga-59787.herokuapp.com', '\'unsafe-inline\'']
  }
}))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://infinite-taiga-59787.herokuapp.com')
  next();
})

app.use('/', express.static('./build'));

app.use('/', (req, res, next) => {
  next();
})

app.use('*', (req, res, next) => res.redirect('/'));

app.use((req, res, next) => {
  console.log(res.getHeaders())
  next();
});

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '/build/index.html')));

console.log('listening at port: ' + process.env.PORT);
app.listen(process.env.PORT);
