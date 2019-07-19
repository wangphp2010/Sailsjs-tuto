/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /* 可以直接用  http://localhost:1337/test/go 访问 */

  go: function (req, res) {
    // res.ok();               // 200
    res.forbidden();      // 403
    // res.notFound();       // 404
    // res.serverError();   // 500
  },
  about: function (req, res) {

    res.view('about', {
      layout: 'b4layout' // 不写就是默认layout
    });

  },
  page1: function (req, res) {
    res.send('page1'); //直接输出 page1
  },
  page2: function (req, res) {
    res.send('page2');
  },
  page3: function (req, res) {
    res.send('page3');
  },


};

