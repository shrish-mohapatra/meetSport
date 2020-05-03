const userModel = require("../register/register.model");

exports.dashboard = async (req,res) => {
    console.log("This is dashboard function");
    const query = userModel.find();
    for await(const result of query){
        console.log(result);
    }
}

var matchCounter = 0;
exports.match = async (req, res) => {
    //const person1 = userModel.find({"username": req.session.username});
    const person = (await userModel.findOne({"username": "Michael"})).toObject();
    const users = await userModel.find({'address': person1.address});
    res.redirect('/');

    

}

exports.testCreate = (req, res) => {
    const person = userModel({
        username: "Sundar2",
        password: "password",
        email:"test1@gmail.com",
        skill: "advanced",
        tags: ['Hockey'],
        address: "Ottawa, Canada"
        
    });
    const person1 = userModel({
        username: "Sundar3",
        password: "password",
        email:"test2@gmail.com",
        skill: "beginner",
        tags: ['Basketball','Hockey'],
        address: "Vancouver, Canada"
        
    });
    const person2 = userModel({
        username: "Sundar4",
        password: "password",
        email:"test3@gmail.com",
        skill: "intermediate",
        tags: ['Tennis', 'football'],
        address: "Winnipeg, Canada"
        
    });
    const person3 = userModel({
        username: "Sundar5",
        password: "password",
        email:"test4@gmail.com",
        skill: "advanced",
        tags: ['Basketball','Hockey'],
        address: "Toronto, Canada"
        
    });
    const person4 = userModel({
        username: "Sundar6",
        password: "password",
        email:"test5@gmail.com",
        skill: "beginner",
        tags: ['Tennis','Hockey'],
        address: "Winnipeg, Canada"
        
    });
    person.save();
    person1.save();
    person2.save();
    person3.save();
    person4.save();
    res.redirect('/'); 
}


   /* var distance = Math.sqrt(Math.pow(person1.latitude - person2.latitude, 2) + Math.pow(person1.longitude - person2.longitude, 2)); */ //My code... forever. It will never leave

    
   
 

