require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { group } = require('console');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/henryapp`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

/* const { Product } = sequelize.models; */
const { User, Feedback, Checkpoint, Cohorte, Group, Student, Student_cp } = sequelize.models;



// Relaciones
Feedback.belongsTo(User, { as: 'to' }); //deberia agregar columna to a Feedback OK
Feedback.belongsTo(User, { as: 'from' }); //deberia agregar columna from a Feedback OK

Student.belongsTo(User) //deberia agregar columna userId a Student OK


Student.belongsTo(Cohorte) //deberia agregar columna cohorteId a Student OK
Student.belongsTo(Group) //deberia agregar columna groupId a Student OK

Cohorte.belongsTo(User, { as: 'instructor' }) //deberia agregar columna instructor a Cohorte OK
Group.belongsTo(User, { as: 'PM1' }) // deberia agregar columna PM a Group
Group.belongsTo(User, { as: 'PM2' }) // deberia agregar columna PM a Group
Group.belongsTo(Cohorte) // deberia agregar columna cohorteId a group

// User.belongsTo(Group, { as :'PM',foreignKey: 'Pm_groupID' }) REVISAR RELACION
// Group.hasMany(User, {foreignKey: 'Pm_groupID'})

Checkpoint.belongsToMany(Student, {
  through: Student_cp
});

Student.belongsToMany(Checkpoint, {
  through: Student_cp
});

//hasOne agrega a la derecha y belongTo a la izq


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};