const prisma = require('../prisma/index');

//Create a new post
exports.createPost= async(req,res,next)=>{
    try {
        const {slug,title,body,authorId}= req.body
        const result = await prisma.post.create({
            data:{
                slug,
                title,
                body,
                author:{connect:{id:authorId}}
            }
        });
        res.json(result);
    } catch (error) {
        throw new Error(error)
        
    }
}

exports.updatePost = async(req,res,next)=>{
    const {id}= req.params;
    const {title,body}= req.body
    try {
        const result = await prisma.post.update({
            where:{id:id},
            data:{
                title:title,
                body:body
            }
        })
        res.json(result);
    } catch (error) {
       res.json({error:`post with ${id} does not exist`})
        
    }
}

exports.deletePost = async(req,res,next)=>{
    const {id} = req.params
    try {
        const result =await prisma.post.delete({
         where:{id:id}
        })
        res.json(result)
    } catch (error) {
        res.json({error:`post with ${id} unable to delete`})
    }
}

exports.getPost = async(req,res,next)=>{
    try {
        const result =prisma.post.findMany();
        res.json(result);
    } catch (error) {
        res.json(error)
    }
}