const express = require("express");
const router = express.Router();

const{
    getCategoryById,
    createCategory,
    updateCategory,
    removeCategory,
    getCategory,
    getAllCategory
     } = require("../controllers/category")
const{isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth")
const{getUserById} = require("../controllers/user")

router.param("userId",getUserById);
router.param("categoryId",getCategoryById)

//actual routes
//create
router.post(
    "/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
);

router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory);
//update
router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory
);
//delete
router.delete(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    removeCategory
);

module.exports = router;