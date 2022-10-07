import dbConnect from "./dbConnect.js";
import { ObjectId } from "mongodb";

export const home = (req, res) => {
  res.send("<h1>Hello world</h1>");
};


export const updateuser = async (req,res) =>{
  const collection = dbConnect()
  const uid = req.body.user.uid
  const email = req.body.user.email
  // console.log(email)
  const password = req.body.user.password
  // console.log(password)
  const user = await collection.findOneAndUpdate({"user.uid":uid},
    {$set:{user:{email:email, password:password, uid:uid}}}
    )
// console.log(user)
if (user){
res.send(user)
} else{
  res.send({"user not found":true})
}

}


export const login = async (req,res)=>{
  const collection = dbConnect()
  const userpass = req.body.user.password
  const useremail = req.body.user.email
  // console.log(userpass)

  const checkemail = await collection.findOne({"user.email":useremail})
  console.log(checkemail)
  console.log(userpass)
  // console.log(checkpass)
  if (userpass===checkemail.user.password){
  
  res.send({checkemail})
  } else {
    res.send({"error": "invalid username/password"})
  }

}





export const signup = async (req, res) => {
  const user = req.body.user;
  //   console.log(user);
  if (!user.email) {
    res.status(200).send({ response: "email is required" });
  } else if (!user.password) {
    res.status(200).send({ response: "password is required" });
  } else {
    const collection = dbConnect();
    const users = await collection.find({}).toArray();
     let checkuser = users.find((thisuser) => {
     return thisuser.user.email == user.email
    });
    
if (checkuser){
    res.send({ error: "This email has already been taken" });
    return
}
      await collection.insertOne({
        user: {
          email: user.email,
          password: user.password,
        },
      });
      const Newuser = await collection.findOne({
        user: { email: user.email, password: user.password },
      });
      let uid = ObjectId(Newuser._id).toString();
      // console.log(uid)
      let id = Newuser._id;
      // console.log(id)
      const result = await collection.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            user: { uid: uid, email: user.email, password: user.password },
          },
        }
      );
      // console.log(result.value)
      res.send({ userCreated: true });
    }
  
};
