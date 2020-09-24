const server = require("express").Router();

const { Group, User } = require("../db.js");

server.get('/', (req, res, next) => {
  Group.findAll({
    include: [
      {
        model: User,
        as: 'PM1',
        attributes: ['name']
      },
      {
        model: User,
        as: 'PM2',
        attributes: ['name']
      }
    ]
  })
    .then((groups) => {
      if (groups.length === 0) {
        return res.send({ message: "No se crearon grupos" });
      }
      return res.send(groups);
    })
    .catch((error) => next(error));
})


server.get('/:id', (req, res, next) => {
  Group.findAll({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        as: 'PM1',
        attributes: ['name']
      },
      {
        model: User,
        as: 'PM2',
        attributes: ['name']
      }
    ]
  })
    .then((groups) => {
      if (groups.length === 0) {
        return res.send({ message: "No se crearon grupos" });
      }
      return res.send(groups);
    })
    .catch((error) => next(error));
})

server.post('/', (req, res, next) => {
  console.log(req.body)
  const { name, PM1Id, PM2Id, cohorteId } = req.body;
  Group.create({ name, PM1Id, PM2Id, cohorteId })
    .then((group) => {
      res.send(group);
    })
    .catch((error) => next(error));
});


server.delete('/', (req, res, next) => {
  const checkName = req.params.name;
  Group.destroy({ where: { checkName: name } })
    .then((num) => {
      if (num > 0) {
        return res.send({ message: `Se elimino el Grupo: ${checkName}` })
      }
      return res.send({
        message: `No se pudo eliminar el Grupo: ${checkName}`,
      })
    })
    .catch((error) => next(error));
})

server.put("/:name", async (req, res, next) => {
  const nameGroup = req.params.name;
  const { name, description } = req.body;

  try {
    const group = await Cohorte.findOne({ where: { name: nameGroup } });
    if (!group) {
      return res.send({
        message: `No se encontro el Grupo: ${nameGroup}`,
      });
    }
    const groupUpdate = await group.update({
      name: name,
      description: description,
    });
    return res.send(groupUpdate);
  } catch (error) {
    next(error);
  }
});

module.exports = server; 