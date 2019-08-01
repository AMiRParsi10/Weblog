const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('app/http/controllers/homeController');
const courseController = require('app/http/controllers/courseController');

router.get('/logout' , (req ,res) => {
    req.logout();
    res.clearCookie('remember_token');
    res.redirect('/');
});

// Home Routes
router.get('/' , homeController.index);
router.get('/courses' , courseController.index);
router.get('/about-us' , homeController.about);
router.get('/courses/:course' , courseController.single)

router.get('/sitemap.xml' , homeController.sitemap);
router.get('/feed/courses' , homeController.feedCourses);

module.exports = router;