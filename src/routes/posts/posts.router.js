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

    console.log("deneme 2 : " + who);

    console.log("11111111")

    var a = [];
    const item = await Users.findOne({ _id: who })
    const data = await item.toJSON();
    var deger = data.nickName;

    console.log("brat" + deger);



    // var deneme = Users.findOne();
    // console.log(deneme)

    // var sonuc = null;
    // console.log("333333333");
    // Users.findOne({_id: who}, (err, item) => {
    //   sonuc = item;
    // })
    // console.log(sonuc);


    // console.log("22222222");
    // console.log(Users.findOne({_id: who}, (err, item) => {
    //   return item
    // }))


    // let kimmis = Users.findOne({ _id: who }, function (err, doc) {
    //   console.log(doc);
    // });
    // console.log(kimmis)
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