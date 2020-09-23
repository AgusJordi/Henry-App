const server = require("express").Router();
const { Student, Cohorte, User, Group } = require("../db.js");


//Ruta general http://localhost:4000/students

//crear alumno
server.post("/", (req, res, next) => {
  let userId = req.body.userId
  Student.create({
    userId: userId
  }).then(student => {
    return res.send(student)
  })
})

//consultar por todos los alumnos
server.get("/", (req, res, next) => {
  Student.findAll({
    include: [
      {
        model: User,
      },
    ],
  })
    .then((student) => {
      console.log(student);
      if (student && student.length === 0) {
        return res.send({ message: "No hay usuarios" });
      }
      res.send(student);
    })
    .catch((err) => next(err));
});

//consultar por la información de un alumno
server.get('/:id', (req, res, next) => {
  Student.findAll({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
      },
    ],
  })
    .then(studentFound => {
      res.json(studentFound);
    })
    .catch(next)
})

//consultar por los alumnos de determinado cohorte
server.get("/cohorte/:id", (req, res) => {
  Student.findAll({
    where: {
      cohorteId: req.params.id,
    },
    include: [
      {
        model: User, attributes: ["name", "lastName", "email"]
      },
      {
        model: Cohorte, attributes: ["name"]
      },
    ],
  })
    .then((students) => {
      res.status(200).json(students);
    })
    .catch(function (err) {
      res
        .status(404)
        .json({ message: "No se obtuvieron los alumnos", data: err });
    });
});

//consultar por los alumnos de determinado grupo
server.get("/grupo/:id", (req, res) => {
  Student.findAll({
    where: {
      groupId: req.params.id,
    },
    include: [
      {
        model: Group,
      },
    ],
  })
    .then((students) => {
      res.status(200).json(students);
    })
    .catch(function (err) {
      res
        .status(404)
        .json({ message: "No se obtuvieron los alumnos", data: err });
    });
});


//editar información del alumno
server.put('/:id', (req, res, next) => {
  let studentUp = req.body
  Student.findOne({
    where: {
      id: req.params.id
    }
  }).then(studentFound => {
    studentFound.update(studentUp)
      .then(newStu => {
        newStu.save()
        res.status(200)
        res.json(newStu)
      })
  })
})

//eliminar un alumno
server.delete('/delete/:id', (req, res, next) => {
  Student.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200)
    res.send("Alumno eliminado")
  })
})

module.exports = server;
