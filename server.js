
var fs=require('fs');
var express=require('express');
var app=express();
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');

var states;
fs.readFile("states.json", function(err, data) {
    states = JSON.parse(data.toString());
});
var users={
    alice: "password1",
    bob: "password2",
    charlie: "password3",
    dan: "password4"
};
var msgs=[
    {user:"kilroy", phone: "123 555 1212", message:"was here!"}
]

app.use(cookieParser());
app.use(bodyParser.json());

function sendUnauthorized(response) {
    response.status(401);
    response.send("Unauthorized");
}

app.post('/login', function(request, response) {
    var user = request.body.username;
    if (users[user] === undefined) {
        return sendUnauthorized(response);
    }
    if (users[user] !== request.body.password) {
        return sendUnauthorized(response);
    }
    response.cookie('login', user);
    response.json({result: true});
});

app.get('/logout', function(request, response) {
    response.clearCookie('login');
    response.json({result: true});
});

function propSort(prop) {
    var dir=1;
    if(prop[0] === "-") {
        dir = -1;
        prop = prop.substr(1);
    }
    return function (a,b) {
        var result = (a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0;
        return result * dir;
    }
}

app.get('/states/abbreviations', function(request, response) {
    var result = []
    for (var ind=0; ind<states.length; ind++) {
        result.push(states[ind].abbreviation)
    }
    response.json(result);
})

app.get('/states/:abbrev', function(request, response) {
    var abbrev = request.params.abbrev;

    for (var ind=0; ind<states.length; ind++) {
        if (states[ind].id == abbrev) {
            response.json(states[ind]);
            return false;
        }
    }
    response.status(404);
    response.send("Not Found");
});

app.get('/states',function(request, response) {
    var sort = request.query.sort;
    var result = states;
    if (sort) {
        result.sort(propSort(sort));
    }
    var offset = request.query.offset;
    if (offset === undefined) {
        offset=0;
    } else {
        offset = +offset;
    }
    var limit = request.query.limit;
    if (limit === undefined) {
        limit = 10;
    } else {
        limit = +limit;
    }
    if (limit > 10) {
        limit = 10;
    }
    result = result.slice(offset, offset+limit);
    response.set('X-Total-Count', result.length);
    response.json(result);
});

app.get('/secret', function(request, response) {
    var user = request.cookies.login;
    if (users[user] === undefined) {
        return sendUnauthorized(response);
    }
    response.json({user: user, message: "This is the secret message"});
});

app.post('/guestbooks', function(request, response) {
    var user = request.body.user;
    if (users[user] === undefined) {
        return sendUnauthorized(response);
    }
    var msg = request.body.message;
    var phone = request.body.phone;
    if (msg === undefined || phone === undefined) {
        response.status(400);
        response.send("Bad request");
        return;
    }
    msgs.push({user:user, phone:phone, message: msg});
    response.json(msgs);
});

app.get('/guestbooks', function(request, response) {
    response.set('X-Total-Count', msgs.length);
    response.json(msgs);
});

app.use(express.static(__dirname+'/public'));

var server=app.listen(8888, function() {
    console.log("We have started our server at http://localhost:8888");
});
