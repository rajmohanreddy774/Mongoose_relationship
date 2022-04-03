const express=require("express")
const mongoose=require("mongoose")

const app=express();

app.use(express.json())

const connect=()=>{
    return mongoose.connect("mongodb+srv://Raj_mohan:8ZzpJirjMscgMjtX@cluster0.llssm.mongodb.net/Relationships?retryWrites=true&w=majority");
};


const userSchema=new mongoose.Schema({

    firstName:{type:String,required:true},
   lastName:{type:String,required:false},
    Email:{type:String,required:true,unique:true},
    Password:{type:String,required:true},


},{
    timestamps:true,
    versionKey:false,
});



const User=mongoose.model("user",userSchema);




const postSchema=new mongoose.Schema({

    Title:{type:String,required:true},
    Body:{type:String,required:true},
  
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
  
},{
    versionKey:false,
    timestamps:true,
});


const Post=mongoose.model("post",postSchema);



const commentSchema=new mongoose.Schema({

    body:{type:String,required:true},
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
  
},{
    timestamps:true,
    versionKey:false,
});


const Comment=mongoose.model("comment",commentSchema);




app.get("/users",async(req,res)=>{
    try{
        const users=await User.find().lean().exec();
        return res
        .status(200).send({users:users})

    }catch(error){
        return res
        .status(500)
        .send({message:error.message})

    }
});



app.post("/users",async(req,res)=>{
    try{
        const user=await User.create(req.body)
        return res
        .status(200).send({user:user})

    }catch(error){
        return res
        .status(500)
        .send({message:error.message})

    }
});



app.get("/users/:id",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id).lean().exec();
        return res
        .status(200).send({user:user})

    }catch(error){
        return res
        .status(500)
        .send({message:error.message})

    }

});

app.patch("/users/:id",async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
        return res
        .status(200).send({user:user})

    }catch(error){
        return res
        .status(500)
        .send({message:error.message})

    }

});


app.delete("/users/:id",async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id)
        return res
        .status(200).send({user:user})

    }catch(error){
        return res
        .status(500)
        .send({message:error.message})

    }

})


app.get("/posts",async(req,res)=>{
    try{
        const post=await Post.find().populate({path:"userId",select:{firstName:1,_id:0}}).lean().exec();
        return res
        .status(200).send({post})

    }catch(error){
        return res
        .status(500)
        .send({message:error.message})

    }
});

app.post("/posts",async(req,res)=>{
    try{
        const post=await Post.create(req.body)
        return res
        .status(200).send({post:post})

    }catch(error){
        return res
        .status(500)
        .send({message:error.message})

    }
});

app.get("/posts/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id).populate("userId").lean().exec();
        return res
        .status(200).send({post:post})

    }catch(error){
        return res
        .status(500)
        .send({message:error.message})

    }

});
app.patch("/posts/:id",async(req,res)=>{
    try{
        const post=await Post.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate("userId").lean().exec();
        return res
        .status(200).send({post:post})

    }catch(error){
        return res
        .status(500)
        .send({message:error.message})

    }

});


app.delete("/posts/:id",async(req,res)=>{
    try{
        const post=await Post.findByIdAndDelete(req.params.id)
        return res
        .status(200).send({post:post})

    }catch(error){
        return res
        .status(500)
        .send({message:error.message})

    }

});


app.get("/comments",async(req,res)=>{
    try{
        const comments=await Comment.find().populate("userId").populate("postId").lean().exec();
        return res
        .status(200).send({comments})

    }catch(error){
        return res
        .status(500)
        .send({message:error.message})

    }
});

app.post("/comments",async(req,res)=>{
    try{
        const comments=await Comment.create(req.body)
        return res
        .status(200).send({comments:comments})

    }catch(error){
        return res
        .status(500)
        .send({message:error.message})

    }
});

app.get("/comments/:id",async(req,res)=>{
    try{
        const comments=await Comment.findById(req.params.id).populate("userId").populate("postId").lean().exec();
        return res
        .status(200).send({post:post})

    }catch(error){
        return res
        .status(500)
        .send({message:error.message})

    }

});
app.patch("/comments/:id",async(req,res)=>{
    try{
        const comments=await Comment.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
        return res
        .status(200).send({comments:comments})

    }catch(error){
        return res
        .status(500)
        .send({message:error.message})

    }

});


app.delete("/comments/:id",async(req,res)=>{
    try{
        const comments=await Comment.findByIdAndDelete(req.params.id)
        return res
        .status(200).send({comments:comments})

    }catch(error){
        return res
        .status(500)
        .send({message:error.message})

    }

});




app.listen(4000,async ()=>{
    try{
        await connect();
    }catch(error){
        console.log(error)
    }
    console.log("listening to 4000")

});