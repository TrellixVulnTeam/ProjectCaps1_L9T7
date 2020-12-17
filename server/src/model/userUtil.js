const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const user_account = new Schema({
    name: { type: String, default: 'tencuauser' },
    email: { type: String, min: 5, index: true },
    password: { type: String },
    phone: { type: String,  min: 5,default: '123456'  },
    type: { type: String, default: "1" },
    status: { type: Boolean, default: false },
    code:  { type: String, default: "123456" },
  },{
    timestamps:true,
  });

module.exports = mongoose.model('user_account', user_account);