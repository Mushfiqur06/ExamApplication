const bcrypt = require('bcrypt')
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const registrationValidate = require('../validators/registrationValidator');
const { catchError } = require('../utils/erro');
const {PENDING, ACTIVE} =require('../utils/accountStatus')

module.exports = {
    async register(req, res){
        const {name, email, password, confirmPassword} = req.body;

        const result = registrationValidate({name, email, password, confirmPassword})

        if(!result.isValid){
            res.status(400).json(result.error);
        }else{
            try{
              const findUser = await User.findOne({email});

              //If Find user
              if(findUser){
                return res.status(400).json({
                  message: "Email already exist"
                })
              }

              //If not find user then create a new user
              const activateToken = jwt.sign({name, email}, 'SECRET', {expiresIn: '1d'})

              bcrypt.hash(password, 11, async (error, hash) => {
                if(error){
                  return catchError(res, error)
                }

                let user = new User({
                    name,
                    email,
                    password: hash,
                    accountStatus: PENDING,
                    isActivated: false,
                    activateToken
                  })

                const newUser = await user.save()

                res.status(201).json({
                  message: 'User created successfully',
                  activateLink: `http://localhost:4000/api/users/activateaccount/${newUser.activateToken}`,
                  user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                  }
                })
              })

            }catch(error){
              return catchError(res, error)
            }

        }
    },

    async activeAccount(req, res){
      const token = req.params.token;
      const decode = jwt.verify(token, 'SECRET');

      if(!decode){
        return catchError(res, new Error('Invalid Token'));
      }

      try{
        const user = await User.findOne({email: decode.email});

        if(!user){
          return catchError(res, new Error('Invalid Token'));
        }

        if(user.isActivated){
          return catchError(res, new Error('Already Activated'));
        }

        if(user.activateToken == token){
          const updateUser = await User.findOneAndUpdate({email: decode.email}, {
            $set: {
              accountStatus: ACTIVE,
              isActivated: true,
              activateToken: null
            }
          })

          res.status(200).json({
            message: 'Account Activated',
            _id: updateUser._id,
            email: updateUser.email
          })
        }
      } catch(error){
        return catchError(res, error)
      }
    },

    async getAllUsers(req, res){
      const users = await User.find();
      res.json(users)
    }
}
