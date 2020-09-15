const { Router } = require("express");
const router = Router();

// import all routers;
/* const productRouter = require('./product.js'); */

const userRouter = require("./user");
const studentRouter = require("./student");
const feedbackRouter = require("./feedback");
const checkpointRouter = require("./checkpoint");
const searchRouter = require("./search");
const cohorteRouter = require("./cohorte");
const groupRouter = require ("./group");

// load each router on a route
// i.e: router.use('/auth', authRouter);

router.use("/grupos", groupRouter);
router.use("/users", userRouter);
router.use("/students", studentRouter);
router.use("/feedbacks", feedbackRouter);
router.use("/checkpoints", checkpointRouter);
router.use("/search", searchRouter);
router.use("/cohorte", cohorteRouter);

module.exports = router;
