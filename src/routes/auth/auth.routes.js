import express from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import User from 'models/User';
import crypto from 'crypto';

const route = () => {
  const router = new express.Router();

  router.route('/giris-yap').post((req, res) => {

    const { email, password } = req.body;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        res.send({ status: false, message: 'boyle mail yok' })
      }
      else {
        if (user.password === crypto.createHmac('sha256', config.jwtSecret).update(password).digest('hex')) {
          const token = jwt.sign({ userid: user._id }, config.jwtSecret);
          res.send({ status: true, token: token })
        }
        else {
          res.send({ status: false, message: 'hatali sifre' })
        }
      }
      res.send("ok");
    })
  })

  router.route('/kayit-ol').post((req, res) => {
    const { email, password } = req.body;
    const passwordHashed = crypto.createHmac('sha256', config.jwtSecret).update(password).digest('hex');



    const newUser = new User({
      email: email,
      password: passwordHashed,
      date: new Date()
    });

    newUser.save().then(
      (data) => { res.send({ status: true, user: data }) },
      (err) => { res.send({ status: false, error: err }) }
    )

    res.send(passwordHashed);
  })


  return router;
}

export default {
  route,
  routePrefix: `/${config.version}/auth`
}