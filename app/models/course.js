const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const CourseSchema = Schema({
    user : { type : Schema.Types.ObjectId , ref : 'User'},
    categories : [{ type : Schema.Types.ObjectId , ref : 'Category' }],
    title : { type : String , required : true },
    author : { type : String , required : false },
    slug : { type : String , required : true },
    type : { type : String , required : false },
    body : { type : String , required : true },
    price : { type : String , required : false },
    images : { type : Object , required : true },
    thumb : { type : String , required : true },
    tags : { type : String , required : true },
    sum : { type : String , required : true},
    time : { type : Number , default :0 },
    viewCount : { type : Number , default : 0 },
    commentCount : { type : String , default : 0 },
} , { timestamps : true });

CourseSchema.plugin(mongoosePaginate);

CourseSchema.methods.typeToPersian = function() {
    switch (this.type) {
        case 'cash':
                return 'نقدی'
            break;
        case 'vip':
            return 'اعضای ویژه'
        break;
        default:
            return 'رایگان'
            break;
    }
};

CourseSchema.methods.path = function(){
    return `/post/${this.slug}`
};

module.exports = mongoose.model('Course' , CourseSchema);