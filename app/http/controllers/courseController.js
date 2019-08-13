const controller = require('app/http/controllers/controller');
const Course = require('app/models/course');

class courseController extends controller {

    async index(req , res) {
        res.render('home/index' , { courses });
    }

    async single(req , res) {

        let lastCourses = await Course.find({}).sort({ createdAt : -1 }).skip(2).limit(4);
        let courses = await Course.find({}).sort({ createdAt : -1 }).skip(2).limit(4);
        let course = await Course.findOne({ slug : req.params.course })
            .populate([
                {
                    path : 'user',
                    select : 'name'
                }
            ]);
        // let canUserUse = await this.canUse(req , course);

        res.render('home/single-course' , { course , lastcourses: lastCourses , courses});
    }

    // async canUse(req  , course) {
    //     let canUse = false;
    //     if(req.isAuthenticated()) {
    //         switch (course.type) {
    //             case 'vip':
    //                 canUse = req.user.isVip()
    //                 break;
    //             case 'cash':
    //                 canUse = req.user.checkLearning(course);
    //                 break;
    //             default:
    //                 canUse = true;
    //                 break;
    //         }
    //     }
    //     return canUse;
    // }

}

module.exports = new courseController();