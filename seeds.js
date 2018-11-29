var mongoose = require("mongoose"),
    Blog     = require("./models/blog"),
    faker    = require("faker");
    
var testData = [ {
    title:   faker.name.title(),
    image:   faker.image.image(),
    opener:  faker.lorem.sentence(),
    body  :  faker.lorem.paragraph(),
    created: faker.date.recent()
    },
    {
    title:   faker.name.title(),
    image:   faker.image.image(),
    opener:  faker.lorem.sentence(),
    body  :  faker.lorem.paragraph(),
    created: faker.date.recent()
    }
    ];
    
    

function seedDB(){
    Blog.deleteMany({}, function(err){
        if(err){
          console.log(err);
        }
        console.log("Database clear!");
        testData.forEach(function(seed){
            Blog.create(seed, function(err, blog){
                if(err){
                    console.log(err);
                } else {
                    console.log("faker data created!");
                }
            });
        });
    });
}

console.log(testData);

module.exports = seedDB;