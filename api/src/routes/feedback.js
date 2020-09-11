const server = require('express').Router();
const { Student, Cohorte, User, Group, Feedback } = require("../db.js");


//Ruta general http://localhost:4000/feedbacks

//GET de todas los feedbacks recibidos de un usuario

server.get("/:id", (req, res) => {
    Feedback.findAll({
        where: {
            to: req.params.id,
        },
        include: [
            {
                model: User,
            },
        ],
    })
        .then((feeds) => {
            res.status(200).json(feeds);
        })
        .catch(function (err) {
            res
                .status(404)
                .json({ message: "No se obtuvieron los feedbacks", data: err });
        });
});

// Crear feedback
server.post("/add", (req, res) => {
    console.log(req.body)
    const {
        qualification,
        description,
        position,
        to,
        from
    } = req.body;

    Feedback.create({
        qualification,
        description,
        position,
        to,
        from
    })
        .then((feed) => {
            console.log(feed);
            res.status(200).json({ feed, message: "Se guardó el feedback" });
        })
        .catch(function (err) {
            res
                .status(404)
                .json({ message: "No se pudo crear el feedback", data: err });
        });
});

//modificar feedback
server.put("/:id", (req, res) => {
    let id = req.params.id;
    console.log(req.body)
    Feedback.update(req.body, {
        where: {
            id: id,
        },
        returning: true,
    })
        .then((response) => {
            let feedback = response[1][0];
            return feedback;
        })
        .then(function (feedback) {
            res.status(200).json({ feedback, message: "Se actualizó el feedback" });
        })
        .catch(function (err) {
            res.status(404).json({ message: "No se pudo actualizar el feedback", data: err });
        });
});


server.delete("/:id", (req, res) => {
    let id = req.params.id;
    Feedback.destroy({
        where: {
            id: id,
        },
    })
        .then((feedback) => {
            res.status(200).json({ message: "Se eliminó el feedback" });
        })
        .catch(function (err) {
            res.status(404).json({ message: "No se pudo eliminar el feedback", data: err });
        });
});

module.exports = server;