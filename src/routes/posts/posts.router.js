import express from 'express';
import config from '../../config';
import jwt from 'jsonwebtoken';
import Posts from '../../models/Posts';
import Users from '../../models/User';

const route = () => {
  const router = new express.Router();

  router.route('/paylas').post((req, res) => {
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
    Users.findOne({_id: who}, (err, item) => {
      console.log("*****" + item);
    })


    console.log("333333333");
    console.log(Users.findOne({_id: who}, (err, item) => {
      item
    }))

    console.log("22222222");
    console.log(Users.findOne({_id: who}, (err, item) => {
      return item
    }))


// let kimmis = Users.findOne({ _id: who }, function (err, doc) {
//   console.log(doc);
// });
// console.log(kimmis)
const newPost = new Posts({
  post: post,
  who: kimmis,
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