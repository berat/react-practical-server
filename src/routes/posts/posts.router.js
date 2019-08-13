import express from 'express';
import config from '../../config';
import jwt from 'jsonwebtoken';
import Posts from '../../models/Posts';
import Users from '../../models/User';

const route = () => {
  const router = new express.Router();

  router.route('/paylas').post((req, res) => {
    const { post, whichUser } = req.body;


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

    console.log("deneme 2 : " + whichUser);

    const hangiKul = who => {
      Users.findOne({who}, (err, doc) => {
        if (err) {
          console.error(err)
        } else {
          console.log(doc)
        }
      })
    }

    console.log("deneme 3 : " + hangiKul(whichUser));
    const newPost = new Posts({
      post: post,
      who: hangiKul(whichUser),
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