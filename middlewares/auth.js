module.exports = {

    loginRequired(req, res, next) {

        if (req.user) {
            return next();
        }
        req.flash('error', 'Login Terlebih Dahulu!');
        return res.redirect('/auth/login');
    }

};