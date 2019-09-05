const controller = require('app/http/controllers/controller');
const Course = require('app/models/course');

class courseController extends controller {


    async index(req , res) {

        let query = {};

        // if(req.query.search)
        //     query.title = new RegExp(req.query.search , 'gi');


        let courses = Course.find({ $or : [{ title :new RegExp(req.query.search , 'gi') } , { body : new RegExp(req.query.search , 'gi')} ] }).sort({ createdAt : -1});


        if(req.query.order)
            courses.sort({ createdAt : 1});

        courses = await courses.exec();

        res.render('home/courses' , { courses });
    }

    async single(req , res) {

        let lastCourses = await Course.find({}).sort({ createdAt : -1 }).skip(2).limit(4).exec();
        let courses = await Course.find({}).sort({ createdAt : -1 }).skip(2).limit(4).exec();
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


    async posts(req , res) {
        try {
            let page = req.query.page || 1;
            let courses = await Course.paginate({} , { page , sort : { createdAt : -1 } , limit : 8 });
            res.render('home/posts',  { title : 'مقاله ها' , courses });
        } catch (err) {
            next(err);
        }
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