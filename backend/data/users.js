import bcrypt from 'bcryptjs'

const users=[
    {
        name:'prafful',
        email:'pa@gm.com',
        password:bcrypt.hashSync('1234',10),
        isAdmin:true
    },
    {
        name:'anurag',
        email:'ap@gm.com',
        password:bcrypt.hashSync('1234',10),
        isAdmin:false
    },
    {
        name:'jay',
        email:'jp@gm.com',
        password:bcrypt.hashSync('1234',10),
        isAdmin:false
    }
]
export default users