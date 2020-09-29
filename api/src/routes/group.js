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

server.put("/:id", async (req, res, next) => {
  const idGroup = req.params.id;
  console.log(req.body)
  const { PM1Id, PM2Id } = req.body;

  Group.findOne({
    where: {
      id: idGroup
    }
  }).then(group => {
    if (!group) {
      return res.send({
        message: `No se encontro el Grupo: ${idGroup}`,
      });
    }

    group.update({
      PM1Id: PM1Id,
      PM2Id: PM2Id
    }).then(groupUp => {
      groupUp.save()
      res.status(200)
      res.json(groupUp)
    })
      .catch(error => {
        next(error);
      })
  });
});

module.exports = server; 