var Cdse = require('../models/cdse');
var User = require('../models/user');
var CdseController = {
  list: function(req, res) {
    res.render('home/home');
  //  userId = req.user.id;
   //
  //  Cdse.find({
  //    userId: userId
  //  }).then(function(snippets) {
   //
  //    res.render('cdse/cdse', {
  //      code: snippets,
  //    })
  //  });
 },

  add: function(req, res) {
    var userId = req.user.id;
    var title = req.body.title;
    var body = req.body.body;
    var notes = req.body.notes;
    var language = req.body.language;
    var tagsString = req.body.tag;
    var tagsArray = tagsString.split(',');

    var userInputedCode = new Cdse({
      serId: userId,
      title: title,
      body: body,
      notes: notes,
      language: language,
      tags: tagsArray
    });
    userInputedCode.save(function(err, cdse) {
      res.redirect('/cdse');

    });
  }
};
module.exports = CdseController;
