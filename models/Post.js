const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create the Schema

const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'                //reference to the users collection
    },

    text:{
        type: String,
        required: true
    },

    //NOTE: One approach to creating a Post Schema
    //although I can grab and populate the following from the User model, I'll give the Post model it's own
    //user data such as handle and name so that if a user does delete themselves from the site, they're posts and
    //comments do not get deleted. (In case there's something useful, user B can view user A's posts even if user A deletes
    // their profile)
    name:{
        type: String
    },

    avatar:{
        type: String
    },

    // made an array of objs to contain the user id of who made the like for a particular post.
    // do this rather than increment a like count, later I can always count the the number of user id's in the array
    likes:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users',
            }
        }
    ],

    comments:[

        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
            },

            text: {
                type: String,
                required: true,
            },

            name:{
                type: String
            },

            avatar:{
                type: String
            },

            //date for comment created for the original user post
            date: {
                type: Date,
                default: Date.now()
            },
        }
    ],

    //This is for the date post was created
    date:{
        type: Date,
        default: Date.now()

    }
});


module.exports= Post= mongoose.model('post', PostSchema);