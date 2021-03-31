import bcrypt from 'bcryptjs'

const lawyers = [
  {
    name: 'saul goodman',
    email:'abc@jhij',
    image: '/images/saul.png',
    description:
      'illegal crime lawyer,garda uda deta h,harami type',
    category: 'illegal crime',
    rating: 4.5,
    numReviews: 12,
    password:bcrypt.hashSync('1234',10),
    liscenceID:123,
    isAvailable:true,
    isVerified:true,
    userType:'lawyer',
  },
  {
    name: 'jesse pinkman',
    userType:'lawyer',
    email:'abc@jhi2j',
    image: '/images/jesse.jpg',
    description:
      'ganja phook ke mast rhta h',
    category: 'divorce',
    rating: 4.0,
    numReviews: 8,
    password:bcrypt.hashSync('1234',10),
    liscenceID:1234,
    isVerified:true,
    isAvailable:true

  },
  {
    name: 'heinsberg chacha',
    email:'abc@j4hij',
    userType:'lawyer',
    image: '/images/takla.jpg',
    description:
      'chemistry gooood nwi qidefwejr r34irud4nrn 4ru34n r840drt843yrtn4hfbcrrfh frycner',
    category: 'chemistry crime',
    rating: 3.0,
    numReviews: 12,
    password:bcrypt.hashSync('1234',10),
    liscenceID:12344,
    isVerified:true,
    isAvailable:true
  },
  {
    name: 'kate parker',
    email:'abc@5jhij',
    userType:'lawyer',
    image: '/images/kate.jpg',
    description:
      'feminist party full summport',
    category: 'feminism',
    rating: 5,
    numReviews: 12,
    password:bcrypt.hashSync('1234',10),
    liscenceID:12345,
    isVerified:true,
    isAvailable:true
  },
  {
    name: 'katygrfg parker',
    email:'abc@6jhij',
    userType:'lawyer',
    image: '/images/mouse.jpg',
    description:
      'feminist party full summport',
    category: 'feminism',
    rating: 5,
    numReviews: 12,
    password:bcrypt.hashSync('1234',10),
    liscenceID:12347,
    isVerified:false,
    isAvailable:false
  }
]

export default lawyers
