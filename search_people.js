let typed = process.argv[2];

const pg = require("pg");
const settings = require("./settingsknex"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://zoicddosyydfea:ef8d7c5e4ba4cb1951d350b1313ee09945dc8ec98a9a625163d7bd65de5a25bf@ec2-107-20-149-243.compute-1.amazonaws.com:5432/d938dvah33ceiu?ssl=true',
  searchPath: 'knex, public'
});

let outputFamousPeople = (array) => {
  array.forEach( (element) => {
    let id = element.id;
    let first_name = element.first_name;
    let last_name = element.last_name;
    let dob = element.birthdate;
    console.log(`${id}: ${first_name} ${last_name}, born '${dob}'`);
  });
};

let searchFamousPeople = (typed, callback) => {
  let param = typed ? typed : '';
  let result = knex.select()
                   .from(`famous_people`)
                   .where(`first_name`, `like`, `%${param}%`)
                   .orWhere(`last_name`, `like`, `%${param}%`)
                   .timeout(1000)
                   .then( (rows) => {
                     callback(rows);
                     knex.destroy();
                   })
                   .catch( (error) => {
                     console.error(error);
                   });
};

searchFamousPeople(typed, outputFamousPeople);
           

/*let test = knex.select().from('famous_people').timeout(1000).asCallback( (err, rows) => {
  if (err) {
    console.error(err);
    return false;
  }

  console.log(rows);
  knex.destroy();
});*/

