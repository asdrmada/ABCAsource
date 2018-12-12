const mongoose = require("mongoose"),
      Blog     = require("./models/blog"),
      Comment  = require("./models/comments"),
      faker    = require("faker");
    
// const testData =
//       [{
//       title:   faker.name.title(),
//       image:   faker.image.image(),
//       opener:  faker.lorem.sentence(),
//       body  :  faker.lorem.paragraph(),
//       },
//       {
//       title:   faker.name.title(),
//       image:   faker.image.image(),
//       opener:  faker.lorem.sentence(),
//       body  :  faker.lorem.paragraph(),
//       },
//       {
//       title:   faker.name.title(),
//       image:   faker.image.image(),
//       opener:  faker.lorem.sentence(),
//       body  :  faker.lorem.paragraph(),
//       },
//       {
//       title:   faker.name.title(),
//       image:   faker.image.image(),
//       opener:  faker.lorem.sentence(),
//       body  :  faker.lorem.paragraph(),
//       }
//       ];
    

// function seedDB(){
//     Blog.deleteMany({}, function(err){
//         if(err){
//           console.log(err);
//         }
//         console.log("Database clear!");
//         testData.forEach(function(seed){
//             Blog.create(seed, function(err, blog){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     console.log("faker data created!");
//                 }
//             });
//         });
//     });
// }


// console.log(testData);

const commentTest = [{
    name: faker.name.firstName() + " " + faker.name.lastName(),
    body: faker.lorem.paragraph()
}];

function seedDB(){
    Comment.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Comments section clear!");
            commentTest.forEach(function(seed){
                Comment.create(seed, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("faker comment created!");
                    }
                });
            });
        }
    });
}

console.log(commentTest);

module.exports = seedDB;

