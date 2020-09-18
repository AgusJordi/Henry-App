const server = require("express").Router();

const { Cohorte } = require("../db.js");

server.get("/", (req, res, next) => {
  Cohorte.findAll()
    .then((cohortes) => {
      if (cohortes.length === 0) {
        return res.send({ message: "No se han creado cohortes" });
      }
      return res.send(cohortes);
    })
    .catch((error) => next(error));
});

server.post("/", (req, res, next) => {
  const { name, date, instructorId } = req.body; //falta date
  console.log(req.body, "SOY UN BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACK")
  Cohorte.create({ name, date, instructorId }) //falta date
    .then((cohorte) => {
      res.send(cohorte);
    })
    .catch((error) => next(error));
});

server.delete("/:name", (req, res, next) => {
  const name = req.params.name;
  Cohorte.destroy({ where: { name: name } })
    .then((num) => {
      if (num > 0) {
        return res.send({ message: `Se elimino el Cohorte : ${checkName}` });
      }
      return res.send({
        message: `No se pudo eliminar el Cohorte: ${checkName}`,
      });
    })
    .catch((err) => next(err));
});

server.put("/:name", async (req, res, next) => {
  const nameCohorte = req.params.name;
  const { name, description } = req.body;

  try {
    const cohorte = await Cohorte.findOne({ where: { name: nameCohorte } });
    if (!cohorte) {
      return res.send({
        message: `No se encontro el Cohorte: ${nameCohorte}`,
      });
    }
    const cohorteUpdate = await cohorte.update({
      name: name,
      description: description,
    });
    return res.send(cohorteUpdate);
  } catch (error) {
    next(error);
  }
});

module.exports = server;
