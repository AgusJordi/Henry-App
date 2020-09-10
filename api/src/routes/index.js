const { Router } = require("express");
const router = Router();
// import all routers;
/* const productRouter = require('./product.js'); */
const userRouter = require("./user");
const checkpointRouter = require("./checkpoint");
// load each router on a route
// i.e: router.use('/auth', authRouter);

router.use("/users", userRouter);
router.use("/checkpoints", checkpointRouter);

module.exports = router;
