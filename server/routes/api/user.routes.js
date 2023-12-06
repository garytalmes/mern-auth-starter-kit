const router = require('express').Router();
const jwt = require("jsonwebtoken")
require("dotenv").config();

// Import any controllers needed here
const { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUserById, 
  deleteUserById, 
  authenticate, 
  verifyUser 
} = require('../../controllers/user.controller');


/*
Here we remove the password (even though it's encrypted) from the response.
This code strips the password from the user object obtained from the controller.
But in doing so, this will destructure the mongoose object itself, so we apply the 
toObject() method to prevent that from happening
*/

function stripPassword(user){
  const { password, ...payload } = user.toObject()
  return payload
}


function createToken(email, id){
  return jwt.sign({ email: email, id: id }, process.env.JWT_SECRET )
}

// Declare the routes that point to the controllers above
router.get("/", async (req, res) => {
  try {
    const payload = await getAllUsers()
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})


router.get("/verify", async (req, res) => {
  const user = await verifyUser(req)
  if( !user ){
    res.status(401).json({ result: "invalid login" })
  } else {
    const token = createToken(user.email, user._id)
    const payload = stripPassword(user)
    res.cookie("auth-cookie", token).json({ result: "success", payload })
  }
})


router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id)
    const payload = stripPassword(user)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const user = await createUser(req.body)
    const token = createToken(user.email, user._id)
    const payload = stripPassword(user)
    res.cookie("auth-cookie", token).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.post("/auth", async (req, res) => {
  try {
    const user = await authenticate(req.body)
    const token = createToken(user.email, user._id)
    const payload = stripPassword(user)
    res.cookie("auth-cookie", token).json({ result: "success", payload })
  }catch(err){
    res.status(500).json({ result: "error", payload: "Could not authenticate user"})
  }
})

router.put("/:id", async (req, res) => {
  try {
    const user = await updateUserById(req.params.id, req.body)
    const payload = stripPassword(user)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const payload = await deleteUserById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})

module.exports = router;
