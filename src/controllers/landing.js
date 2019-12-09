exports.get_landing=function(req, res, next) {
    res.render('landing', { title: 'Express' });
}

exports.get_job=function(req, res, next) {
    console.log("Entered job", req.body.user_job);
    res.redirect ("/");
}