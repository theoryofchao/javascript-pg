let typed = process.argv[2];

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

var createQuery = (typed) => {
  let famous_query = `SELECT *
                      FROM famous_people
                      WHERE first_name LIKE '%${typed}%' OR last_name LIKE '%${typed}%'`;
  return famous_query;
};

var outputFamousInfo = (array) => {
  array.forEach( (element) => { 
    let id = element.id;
    let first_name = element.first_name;
    let last_name = element.last_name;
    let dob = element.birthdate;
    console.log(`${id}: ${first_name} ${last_name}, born '${dob}'`);
  });
};

console.log("Connecting...");
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  typed = typed ? typed: '';
 
  let famous_query = createQuery(typed); 

  console.log("Searching...");
  client.query(famous_query, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rows.length} person(s) by the name '${typed}'`);
    outputFamousInfo(result.rows);
    //console.log(result.rows[0].number); //output: 1
    client.end();
  });
});
