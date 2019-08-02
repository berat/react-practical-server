import express from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import Posts from 'models/Posts';

const route = () => {
  const router = new express.Router();

  router.route('/paylas').post((req, res) => {
    const { post } = req.body;


    const tarihDuzenle = tarih => {
      let aylar = [
        "Ocak", "Şubat", "Mart", "Nisan", "Mayıs",
        "Haziran", "Temmuz", "Ağustos", "Eylül",
        "Ekim", "Kasım", "Aralık"
      ];
      let gün = tarih.getDate();
      let aySayi = tarih.getMonth();
      let yil = tarih.getFullYear();

      return gün + ' ' + aylar[aySayi] + ' ' + yil;
    }

    const newPost = new Posts({
      post: post,
      date: tarihDuzenle(new Date())
    });

    newPost.save().then(
      (data) => { res.send({ status: true, post: data }) },
      (err) => { res.send({ status: false, error: err }) }
    )

    res.send(post);
  })
  router.route('/').get((req, res) => {
    Posts.find((err, doc) => {
      if (err) {
        console.error(err)
      } else {
        res.send(doc)
      }
    })
  });


  return router;
}

export default {
  route,
  routePrefix: `/${config.version}/post`
}