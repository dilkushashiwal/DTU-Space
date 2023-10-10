const Post = require("../model/post");
const comment = require("../model/comment");

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Post.find({type:"Blog"});
        blogs.sort(function(a, b){return b.date - a.date});
        res.render("blog.ejs", { blogs });
    } catch (err) {
        console.log(err);
    }
};

exports.getAllNotice = async (req, res) => {
    try {
        const notice = await Post.find({type:"Notice"});
        notice.sort(function(a, b){return b.date - a.date});
        res.render("notice.ejs", { notice });
    } catch (err) {
        console.log(err);
    }
};

exports.getAllInterview = async (req, res) => {
    try {
        const Interview = await Post.find({type:"Interview"});
        Interview.sort(function(a, b){return b.date - a.date});
        res.render("interview.ejs", { Interview });
    } catch (err) {
        console.log(err);
    }
};

exports.getAllContent = async (req, res) => {
    try {
        let id = req.query.id;
        const cont= await Post.find({_id:id});
        let val=cont[0].count;
        var myquery = { _id:id };
        var newvalues = { $set: {count:val+1} };
        Post.updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
        });
        let comm=[];
        for(let i in cont[0].comments){
            let obj=await comment.find({_id:cont[0].comments[i]})
            comm.push(obj);
        }
        comm.sort(function(a, b){return b[0].date - a[0].date});
        res.render("content.ejs", {cont,comm});
    } catch (err) {
        console.log(err);
    }
};

exports.getAllComments= async(req,res)=>{
    try{
        let obj={text:req.body.comment_text}
        comment.create(obj, function(err,newComment){
            if(err) console.log(err);
            else 
            {
                Post.findById( req.query.id , async function (err,foundPost){
                    if(err) console.log(err);
                    else{
                        newComment.text=obj.text;
                        newComment.author.id=req.session.user._id;
                        newComment.author.username=req.session.user.username;
                        newComment.date=new Date();
                        newComment.save();

                        // console.log(newComment);
                        foundPost.comments.push(newComment);
                        foundPost.save();
                        let id = req.query.id;
                        const cont= await Post.find({_id:id});
                        let comm=[];
                        for(let i in cont[0].comments){
                            let obj=await comment.find({_id:cont[0].comments[i]})
                            comm.push(obj);
                        }
                        comm.sort(function(a, b){return b[0].date - a[0].date});
                        res.render("content.ejs", {cont,comm});
                    }
                });
            }
        });
    }catch(err){
        console.log(err);
    }
}

