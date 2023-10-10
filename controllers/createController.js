const Post = require("../model/post");

exports.getInputForm =(req, res) => {
    res.render("create-post.ejs");
}

exports.createPost = async (req, res) => {
    let category = req.body.gridRadios;
    let {content,title} =req.body;
    let username =req.session.user.username;
    let arr=content.split(" ");
    let hashTags =arr.filter((value, index, array)=>{
        return value[0]=='#'
    });
    let img =req.body.image;
    if(img==""){
        if(category=="Blog")
            img="https://colmanandcompany.com/blog/wp-content/uploads/2014/04/blog-word-cloud1.jpg";
        else if(category=="Notice")
            img="https://i0.wp.com/www.redhenproject.org/wp-content/uploads/2018/06/Important-notice.jpg?resize=297%2C275";
        else
            img="https://appliedmachinelearning.files.wordpress.com/2018/04/interview_exp.jpg?w=450";
    }
    let d=new Date();
    //Apr 1, 12:45PM
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var ampm="AM";
    if(d.getHours()>=12){
        ampm="PM";
    }
    let fdt=months[d.getMonth()] +" " +d.getDate()+", " + d.getHours()%12 +":" +d.getMinutes()+ampm;
    
    try {
        const post = await Post.create({
            title,
            content,
            type: category,
            count:0,
            author:username,
            date: fdt,
            newdate:d,
            image:img,
            hashTags: hashTags
        })
        if(category=="Blog")
            res.redirect("/blog");
        else if(category=="Notice")
            res.redirect("/notice");
        else
            res.redirect("/interview");
    } catch (err) {
        console.log(err)
    }
}
