let typed = process.argv.slice(2);

const pg = require("pg");
const settings = require("./settingsknex"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://zoicddosyydfea:ef8d7c5e4ba4cb1951d350b1313ee09945dc8ec98a9a625163d7bd65de5a25bf@ec2-107-20-149-243.compute-1.amazonaws.com:5432/d938dvah33ceiu?ssl=true',
  searchPath: 'knex, public'
});

let addFamousPerson = (typed) => {
  if(typed.length != 3) {
    return false;
  }

  let result = knex(`famous_people`)
                    .insert({first_name : typed[0],
                             last_name  : typed[1],
                             birthdate  : typed[2]})
                    .then( () => {
                      knex.destroy();
                    })
                    .then( (error) => {
                      console.error(error);      
                    });

};

addFamousPerson(typed);
