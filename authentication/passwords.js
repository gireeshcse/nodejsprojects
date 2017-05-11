var bcrypt = require('bcryptjs');



exports.localAuth = function (username, password) {
    var users=[
    {
        'name':'Rama',
        'email':'rama@example.com',
        'designation':'The Great Indian God',
        'opassword':'123456',
        'password':'$2a$08$5iSXz7CjCH2DEtAKbCnrD.QiNornP00Zor7WfiG5TTkjJYTRcz8/K',
    },
    {
        'name':'bahubali',
        'email':'prabhas@bahubali.com',
        'designation':'King',
        'opassword':'dharma',
        'password':'$2a$08$.UMtXX2JKdrd.iZo9.1lZ.m9E1Xl7vOcA087BZKv0hit1a366I4SO',
    },
    {
        'name':'devasena',
        'email':'devasena@bahubali.com',
        'designation':'Queen',
        'opassword':'warrior',
        'password':'$2a$08$mP7P7aZ4F8VlfDJwRbzoueG9vTJ0RyQDQx9KklpVT8e0HXoLg1K/W',
    },
    {
        'name':'Finch',
        'email':'harold@poi.com',
        'designation':'Creator AI System called Machine',
        'opassword':'machine',
        'password':'$2a$08$/Mi.z2bbPBssubb763a2jO49wO1IWtJIibHQbT8v2/E1Exr/aYEC2',
    }
];
    //find user
    var user=null;
    for(i=0;i<users.length;i++)
    {
        if(users[i].email==username)
        {
            user = users[i];
            console.log("FOUND USER: " + user.username);
            var hash = user.password;

            if (bcrypt.compareSync(password, hash)) {
                return user;
            } else {
                console.log("AUTHENTICATION FAILED");
                return false;
            }
        }
    }
    console.log("USERNAME NOT FOUND:", username);
    return false;
}