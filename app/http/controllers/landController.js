const controller = require('app/http/controllers/controller');

class landController extends controller {


    async index(req, res) {

        const title = 'اپلیکیشن فیتکس';
        res.render('land/index', {title});
    }
    async homeland(req, res) {

        const title = 'اپلیکیشن فیتکس';
        res.render('land/home', {title});
    }


}


module.exports = new landController();