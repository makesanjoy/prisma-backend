const prisma = require('../prisma/index');
const cookieToken = require('../utils/cookieToken');

//user Sign up
exports.signUp = async(req,res,next)=>{
    try {
        const {name,email,password} = req.body;
        //check
        if(!name || !email || !password){
            throw new Error('please provide all the fields');
        }
        const resp = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(resp){
            res.status(400).json({
                "msg":"user Already Exist"
            });
        }

        const user = await prisma.user.create({
            data: {
              email: email,
              name: name,
              password: password
             
            },
          })
          cookieToken(user, res)
    } catch (error) {
        throw new Error(error);
        
    }



}

//user Sign In
exports.signIn = async(req,res,next)=>{
  try {
    //take info from the body
    const {email,password}= req.body;
    if(!email || !password){
        throw new Error('please provide all the fields');
    }

    //find a user based on email
    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    //user not found
    if(!user){
        throw new Error('No user found');
    }
    //password mismatch
    if(user.password !== password){
        throw new Error('Incorrect password');
    }
    cookieToken(user,res);
    
  } catch (error) {
    throw new Error(error);
  }
}

exports.logout = async(req,res,next)=>{
    try {
        res.clearCookie('token')
        res.json({
            success: true
        })
    } catch (error) {
        throw new Error(error);
    }
}