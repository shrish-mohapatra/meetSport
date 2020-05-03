const userModel = require("../register/register.model");

exports.homePage = async (req, res) => {
    const users = await this.getUsers(req);
    var userData = (await userModel.findOne({"username": req.session.username})).toObject();

    const friends = await this.getFriendObj(userData)

    res.render("./home", {userData: userData, users: users, friends: friends });
}

exports.getFriendObj = async (userData) => {
    const friends = []
    for await (const friendName of userData.friends){
        friends.push(await userModel.findOne({"username": friendName}))
    }

    return friends
}


exports.getUsers = async (req) => {
    var listUsers = [];
    var person = (await userModel.findOne({"username": req.session.username})).toObject();
    const users = await userModel.find({'address': person.address});

    for await(const result of users){
        if (!person.friends.includes(result.username)) {
            listUsers.push(result);
        }
    }
    listUsers = matchRank(listUsers, req, person);
   
    return listUsers;

}

exports.editProfile = async (req, res) => {
    try{
        const {username, password, email, skill, address, tags} = req.body;
        const user = await userModel.findOne({"username": username});
        user.password = password;
        user.email = email;
        user.skill = skill;
        user.address = address;
        user.tags = tags;
        user.save();

        console.log(user);
        res.redirect("/");
        
    } catch(error){
        console.log(error);
        res.redirect("/");
    }
}

function matchRank(listUsers, req, person){
    var skillIndex = {'beginner': 1, 'intermediate': 2,  'advanced': 3};
    scoreList = [];


    for(i = 0; i <listUsers.length; i++){
        var score = 0;

        if (listUsers[i].username != person.username){

            score = Math.abs(skillIndex[person.skill]- skillIndex[listUsers[i].skill]) - (person.tags.filter(x => listUsers[i].tags.includes(x))).length;

            scoreList.push({user: listUsers[i], score: score});
        }
    }
    scoreList.sort((a,b) => (a.score > b.score) ? 1 : -1);
    return scoreList;
}  

exports.addFriend = async (req, res) => {
    // console.log(req.params.friendName)
    // res.redirect('/')
    try{
    const currentUser = await userModel.findOne({"username": req.session.username});
    const friend = await userModel.findOne({"username": req.params.friendName});

    currentUser.friends.push(friend.username)
    friend.friends.push(currentUser.username)

    currentUser.save()
    friend.save()
    } catch(error) {
        console.log(error)
    }
    res.redirect('/')
}

exports.testCreate = (req, res) => {
    const person = userModel({
        username: "Sundar2",
        password: "password",
        email:"test1@gmail.com",
        skill: "advanced",
        tags: ['Hockey'],
        address: "Ottawa, Canada",
        friends: []
        
    });
    const person1 = userModel({
        username: "Sundar3",
        password: "password",
        email:"test2@gmail.com",
        skill: "beginner",
        tags: ['Basketball','Hockey'],
        address: "Vancouver, Canada",
        friends: []
        
    });
    const person2 = userModel({
        username: "Sundar4",
        password: "password",
        email:"test3@gmail.com",
        skill: "intermediate",
        tags: ['Tennis', 'football'],
        address: "Winnipeg, Canada",
        friends: []
        
    });
    const person3 = userModel({
        username: "Sundar5",
        password: "password",
        email:"test4@gmail.com",
        skill: "advanced",
        tags: ['Basketball','Hockey'],
        address: "Toronto, Canada",
        friends: []
        
    });
    const person4 = userModel({
        username: "Sundar6",
        password: "password",
        email:"test5@gmail.com",
        skill: "beginner",
        tags: ['Tennis','Hockey'],
        address: "Winnipeg, Canada",
        friends: []
        
    });


    person.save();
    person1.save();
    person2.save();
    person3.save();
    person4.save();
    res.redirect('/'); 
}

   

