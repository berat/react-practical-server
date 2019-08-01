import express from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';

const users = [
  { _id: "U123", firstName: 'berat', lastName: 'bozkurt', email: 'berat@berat.com', password: '123456' }
]

const route = () => {
  const router = new express.Router();

  router.route('/login').post((req, res) => {

    const { email, password } = req.body;
    const user = users.find((user) => user.email === email)

    if (!user) {
      res.send({ status: false, message: 'boyle mail yok' })
    }
    else {
      if (user.password === password) {
        const token = jwt.sign({ userid: user._id }, config.jwtSecret);
        res.send({ status: true, token: token })
      }
      else {
        res.send({ status: false, message: 'hatali sifre' })
      }
    }
    res.send("ok");
  })


  return router;
}

export default {
  route,
  routePrefix: `/${config.version}/auth`
}