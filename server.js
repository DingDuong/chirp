var express = require('express');
var bodyParser = require('body-parser');
var Person = require('./person.js');
var jsonParser = bodyParser.json();
var app = express();

var cookieParser = require('cookie-parser');

var people = [];

function Tweet(tweet, id, likes) {
  this.tweet = tweet;
  this.id = id;
  this.likes = likes;
}

function Following(person) {
  this.user = person;
}

var followingArray1 = [];
var followingArray2 = [];
var followingArray3 = [];
var followingArray4 = [];
var followingArray5 = [];
var followingArray6 = [];
var followingArray7 = [];
var followingArray8 = [];
var followingArray9 = [];

followingArray1.push(new Following('santadude'));
followingArray1.push(new Following('ronalddude'));
followingArray1.push(new Following('johnlocke'));
followingArray1.push(new Following('bugsbunny'));

var tweetsArray1 = [];
var tweetsArray2 = [];
var tweetsArray3 = [];
var tweetsArray4 = [];
var tweetsArray5 = [];
var tweetsArray6 = [];
var tweetsArray7 = [];
var tweetsArray8 = [];
var tweetsArray9 = [];

var tweet1 = new Tweet('hello', 12305949305849, 23);
var tweet2 = new Tweet('bye', 25949593040, 23);
var tweet3 = new Tweet('yes', 330594958, 52);
var tweet4 = new Tweet('what', 43940058493, 25);
var tweet5 = new Tweet('asdf', 530433020492920, 34);

tweetsArray1.push(tweet1, tweet2, tweet3, tweet4, tweet5);

tweetsArray2.push(new Tweet('why hello there', 1103948712098, 34));
tweetsArray2.push(new Tweet('whats up doc', 2392487204985, 23));
tweetsArray2.push(new Tweet('whats going on', 3230252035, 24));

tweetsArray3.push(new Tweet('why hello there', 120359230, 42));
tweetsArray3.push(new Tweet('i am hungry', 22039523206285, 1));

tweetsArray4.push(new Tweet('why hello there', 1235029024, 23));
tweetsArray4.push(new Tweet('i am hungry', 22039203589, 34));

tweetsArray5.push(new Tweet('why hello there', 1109841805, 0));
tweetsArray5.push(new Tweet('i am hungry', 21029410, 9));

tweetsArray6.push(new Tweet('why hello there', 110210505930, 0));
tweetsArray7.push(new Tweet('why hello there', 10308204821, 0));
tweetsArray8.push(new Tweet('why hello there', 1550403959, 0));
tweetsArray9.push(new Tweet('why hello there', 1302949, 0));

var user1 = new Person('hi','hi','George Lucas', 10, 'Los Angeles', tweetsArray1, followingArray1);
var user2 = new Person('santadude','hello','Santa Claus', 200, 'North Pole', tweetsArray2, followingArray2);
var user3 = new Person('ronalddude','hello','Ronald Mcdonald', 100, 'Mcdonalds',tweetsArray3, followingArray3);
var user4 = new Person('johnlocke', 'hello', 'John Locke', 40, 'Orange County', tweetsArray4, followingArray4);
var user5 = new Person('bugsbunny','hello','Bugs Bunny', 252, 'Rabbit Hole', tweetsArray5, followingArray5);
var user6 = new Person('daffyduck','hello','Daffy Duck', 252,'Trees', tweetsArray6, followingArray6);
var user7 = new Person('chucknorris','hello','Chuck Norris', 235235, 'Washington', tweetsArray7, followingArray7);
var user8 = new Person('bobthebuilder','hello','Bob Builder', 23423, 'Wyoming', tweetsArray8, followingArray8);
var user9 = new Person('stephcurry','hello','Steph Curry', 23523,'North Carolina', tweetsArray9, followingArray9);

people.push(user1, user2, user3, user4, user5, user6, user7, user8, user9);

app.use(cookieParser());
app.use(express.static('./public/'));

app.get('/check', cookieParser(), function(req, res) {
    if (req.cookies.session) {
      res.sendStatus(200);
    }
    else {
      res.sendStatus(401);
    }
});

app.get('/userinfo', function(req, res) {
  var userArray = [];
  console.log(req.cookies.session);
  for (var i = 0; i < people.length; i++) {
    if (req.cookies.session === people[i].username) {
      userArray.push(people[i]);
      console.log(userArray);
    }
  }
  for (var x = 0; x < people.length; x++) {
    if (people[x].username !== req.cookies.session) {
      userArray.push(people[x]);
    }
  }
  res.send(userArray);
})

app.post('/login', jsonParser, function(req, res) {
  console.log(people);

  var userInfo = req.body;
  var successArray = [];
  for (var i = 0; i < people.length; i++) {
    // console.log(people[i].username);
    // console.log(people[i].password);
    if (userInfo.username === people[i].username && userInfo.password == people[i].password) {
    successArray.push(people[i]);
    // console.log(people);
    // console.log(successArray);
    }
  }
  if (successArray.length > 0) {
    res.cookie('session', successArray[0].username);
    res.json(people);
  }
  else {
    res.json('login: failed');
  }
});

app.post('/signup', jsonParser, function(req, res) {
  var newUser = req.body;
  people.push(new Person(newUser.username, newUser.password, 'User', 500, 'Los Angeles'));
})

app.get('/logout', cookieParser(), function(req, res) {
  res.clearCookie('session');
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/tweets', function(req, res) {
  res.json(people);
})

app.post('/follow', jsonParser, function(req, res) {
  // console.log(req.body);
  var userClient = req.body.currentUser;
  var userToFollow = req.body.followUser;
  console.log(userToFollow);
  console.log(userClient);
  for (var g = 0; g < people.length; g++) {
    if (userToFollow === people[g].username) {
      for (var x = 0; x < people.length; x++) {
        if (userClient === people[x].username)   {
          followingArray1.push(new Following(people[g].username));
          console.log(people[x]);
        }
      }
      res.sendStatus(200);
    }
  }
});

function randomNumber(min, max) {
  return Math.random() * (max - min);
}

app.post('/newtweet', jsonParser, function(req, res) {
  var tweet = req.body.tweet;
  var username = req.body.username;
  var slicedUsername = username.slice(1);
  for (var j = 0; j < people.length; j++) {
    if (slicedUsername == people[j].username) {
      var x = randomNumber(50, 999999999999);
      var newTweet = new Tweet(tweet, x, 0);
      people[j].tweets.push(newTweet);
      console.log(people[j].tweets);
    }
  }
  res.sendStatus(200);
})


app.post('/favorite', jsonParser, function(req, res) {
  // console.log(req.body.id);
  for (var j = 0; j < people.length; j++) {
    // console.log(people[j].tweets);
    for (var y = 0; y < people[j].tweets.length; y++) {
      if (req.body.id == people[j].tweets[y].id) {
        var oldCountString = people[j].tweets[y].likes;
        oldCountNumber = parseInt(oldCountString);
        var newCountNumber = add(oldCountNumber, 1);
        console.log(newCountNumber);
        people[j].tweets[y].likes = newCountNumber;
        console.log(people[j].tweets[y].likes);
      }
    }
  }
})

function add(x,y) {
  return x + y;
}

app.post('/unfavorite', jsonParser, function(req, res) {
  console.log(req.body);
})


app.listen(8080, function() {
  console.log("listening on port 8080");
});
