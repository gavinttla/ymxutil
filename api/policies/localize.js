


module.exports = function(req, res, next) {
    //req.setLocale('req.session.languagePreference');
    req.setLocale('cn');
    console.log('run localize');
    next();
  };