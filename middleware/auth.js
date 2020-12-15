const jwt = require("jsonwebtoken")
const User = require("../models/User")


const ensureAuthenticated = function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      // req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    }
const forwardAuthenticated = function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');      
    }
  
// The following function acts to authenticate a request from the client. The client will send the requesting user's login token (web token) as the 'authorization' header.
// This header has in it the token to be authorized. This authorization is done with jwt verify() and if it is verified, then the request is granted

const auth = async function (req,res,next) {

  try{
      const token = req.headers.authorization.split(' ')[1]
      console.log(token);
      const decoded = jwt.verify(token, "THEPCONE")
      const user = await User.findOne( { _id: decoded._id,memberType:decoded.memberType, "tokens.token":token })
      if(!user) {
          throw new Error()
      }

      req.token = token
      req.user = user
      next()
  } catch (e) {
      console.log(e)
      res.status(401).send("Please authenticate")
  }
}

module.exports = {
  auth, forwardAuthenticated, ensureAuthenticated
}