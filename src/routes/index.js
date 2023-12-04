import  express  from "express";

import v1ProductRoute from "./v1/products.js";
import v1BrandRoute from "./v1/brands.js"
import v1CategoryRoute from "./v1/categories.js"
import v1UserRoute from "./v1/user.js"
import v1AuthRoute from "./v1/auth.js"
const router = express.Router();

router.use('/v1',v1ProductRoute);
router.use('/v1',v1CategoryRoute);
router.use('/v1',v1BrandRoute);
router.use('/v1',v1UserRoute);
router.use('/v1',v1AuthRoute);

export default router;