const server = require("express").Router();

const { Checkpoint } = require("../db.js");

server.get("/", (req, res, next) => {
  Checkpoint.findAll()
    .then((checkpoints) => {
      if (checkpoints.length === 0) {
        return res.send({ message: "No hay checkpoints creados aun" });
      }
      return res.send(checkpoints);
    })
    .catch((error) => next(error));
});

server.post("/", (req, res, next) => {
  const { name, description, linkVideos } = req.body;
  Checkpoint.create({ name, description, linkVideos })
    .then((checkpoint) => {
      res.send(checkpoint);
    })
    .catch((error) => next(error));
});

server.delete("/:id", (req, res, next) => {
  const checkId = req.params.id;
  Checkpoint.destroy({ where: { id: checkId } })
    .then((num) => {
      if (num > 0) {
        return res.send({ message: `Se elimino el Checkpoint ID: ${checkId}` });
      }
      return res.send({
        message: `NO Se elimino el Checkpoint ID: ${checkId}`,
      });
    })
    .catch((err) => next(err));
});

server.put("/:id", async (req, res, next) => {
  const idCheck = req.params.id;
  const { name, description, linkVideos } = req.body;

  try {
    const check = await Checkpoint.findOne({ where: { id: idCheck } });
    if (!check) {
      return res.send({
        message: `No se encontro el checkpoint con ID: ${idCheck}`,
      });
    }
    const checkUpdated = await check.update({
      name: name,
      description: description,
      linkVideos: linkVideos,
    });
    return res.send(checkUpdated);
  } catch (error) {
    next(error);
  }
});

module.exports = server;
