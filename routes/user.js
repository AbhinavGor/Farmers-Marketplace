const express = require('express')

router = new express.Router()

//@route    /api/user/signup
  //@privacy  public
  //@method   POST
  //@res      Register user for THEPC One
  router.post('/user/signup', async (req, res) => {
    const { phone, password, password2, name, address } = req.body;
    
    try {
      const foundUser = await User.findOne({phone: phone});
      if(foundUser){
        return res.status(500).send({message: `User with phone ${phone} already exists.`})
      }else if(password !== password2){
        return res.status(500).send({message: "Passwords do not match"});
      }else{
        const newUser = new User({phone: phone, password: password, name, address});
        await newUser.save();
        await newUser.generateToken();
        return res.status(200).send(newUser);

      }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
  });

  //@route    /api/user/login
  //@privacy  puhblic
  //@method   POST
  //@res      login route using form  
  router.post('/user/login', async (req, res) => {
    try {
        const userFound = await User.findByCredentials(req.body.phone, req.body.password);
        await userFound.generateToken();

        res.status(200).send(userFound);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);      
    }
  });

module.exports = router