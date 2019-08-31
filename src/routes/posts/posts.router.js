import express from 'express';
import config from '../../config';
import jwt from 'jsonwebtoken';
import Posts from '../../models/Posts';
import "@babel/polyfill";
import Users from '../../models/User';

const route = () => {
  const router = require('express-promise-router')();

  router.route('/paylas').post(async (req, res) => {
    const { post, who } = req.body;

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

    const item = await Users.findOne({ _id: who })
    const data = await item.toJSON();
    var deger = data.nickName;

    console.log("1111 " + item);

    console.log("brat" + deger);
    const newPost = new Posts({
      post: post,
      who: deger,
      date: tarihDuzenle(new Date())

    });

    try {

      const data = await newPost.save();
      res.json({ status : true, post: data})
    }
    catch(ex){
      res.json({ status: false, error: ex })
    }

  })
  router.route('/sil').post(async (req, res) => {
    const { id } = req.body;

    Posts.remove({_id: id}, (err,doc) => {
      if (err) res.json({ status: false, error: err }) 
      else res.json({ status: true });
    })

  })
  router.route('/').get(async (req, res) => {
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