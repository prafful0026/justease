import bcrypt from 'bcryptjs'

const users=[
    {
        name:'prafful',
        email:'pa@gm.com',
        password:bcrypt.hashSync('1234',10),
        userType:'admin',
    },
    {
        name:'anurag',
        email:'ap@gm.com',
        password:bcrypt.hashSync('1234',10),
        userType:'user',
    },
    {
        name:'jay',
        email:'jp@gm.com',
        password:bcrypt.hashSync('1234',10),
        userType:'user',
    }
]
export default users