const { Router } = require("express");
const router = Router();
// import all routers;
/* const productRouter = require('./product.js'); */
const userRouter = require("./user");

// load each router on a route
// i.e: router.use('/auth', authRouter);

router.use("/users", userRouter);

module.exports = router;
