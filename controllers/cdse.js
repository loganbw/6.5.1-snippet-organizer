var Cdses = require('../models/cdse');
var User = require('../models/user');
var CdseController = {
  list: function(req, res) {
    var showCode = req.body.id;
    Cdses.find({ showCode : showCode  }).then(function(cdse) {
        res.render("cdse/cdse", {showCode: cdse});
    })
  },

  add: function(req, res) {

    var showCode = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var notes = req.body.notes;
    var language = req.body.language;
    var tagsString = req.body.tag;
    var tagsArray = tagsString.split(',');

    var userInputedCode = new Cdses({

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
