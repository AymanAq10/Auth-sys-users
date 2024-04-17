// controllers/userController.js
const bcrypt = require('bcrypt');
const Users = require('../Models/UsersAuth');
// Controller methods for handling user operations
	async function getNextUserId() {
	  const lastUser = await Users.countDocuments()
	  if (lastUser) {
	    return lastUser + 1;
	  } else {
	    return 1; // Start with ID 1 if there are no users
	  }
	}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.find({userId:id});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

	
exports.addUser = async (req, res) => {

	try{
		const userId = await getNextUserId();
		console.log(parseInt(userId));
		const {fullName,email,password,role} =req.body;
		const hashedPassword = await bcrypte.hash(password,10)
		
		const newUser = new Users({userId:parseInt(userId),fullName,email,password:hashedPassword,role})
		const result = await newUser.save();
		res.status(200).json(result)
	}catch(error){
		console.log("failed to insert User :",error);
		res.status(500).json({ error: 'Internal Server Error' })
	}
};

exports.removeUser = async (req, res) => {
		const id = parseInt(req.params.id);
	try{
		const remU =await Users.deleteOne({userId:id});
		
		return res.status(200).json(`User Number ${id} removed Succsefly`)
	}
	catch(error){
		console.log("failed to remove User:",error)
		res.status(500).json({error:'Internal Server Error'})
	}
};

exports.updateUserData = async (req, res) => {
		const id = parseInt(req.params.id);
		console.log(id)
		const {fullName,email,password} = req.body;
	try{
	        const hashedPassword = await bcrypt.hash(password,10)
		const UpdatedData = await Users.updateOne({userId:id},{fullName,email,password:hashedPassword})
		res.status(200).json(`User Number ${id} Updated her data`)
	}
	catch(error){
		console.log('failed to Update data: ',error)
		res.status(500).json({error:'Internal Server Error'})
	}
};

