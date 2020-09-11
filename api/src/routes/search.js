const server = require("express").Router();
const { User } = require("../db.js");
const { Sequelize } = require("sequelize");

//GET a /search?key=value => No importa el valor de key ya que lo obtenemos

server.get("/", (req, res, next) => {
  const key = Object.keys(req.query);
  const valor = req.query[key];
  User.findAll({
    where: {
      [Sequelize.Op.or]: [
        //Es lo mismo que el || pero en sequelize
        //Buscamos si el string coincide en algo con algun apellido o nombre
        { name: { [Sequelize.Op.iLike]: `%${valor}%` } },
        { lastName: { [Sequelize.Op.iLike]: `%${valor}%` } },
      ],
    },
  })
    .then((products) => {
      if (products.length === 0) {
        return res.json({ message: "No se encontraron resultados" });
      }
      res.send(products);
    })
    .catch((error) => next(error));
});

module.exports = server;
