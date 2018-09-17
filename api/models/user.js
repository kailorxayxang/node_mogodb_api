const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = Schema({
  fullname:{type:String},
  lastname:{type:String},
  username:{type:String,required:true},
 email: {
  type: String,
  unique: true,
  required: true,
  match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
 },
  images:{type:String,default:'no.jpg'},
  password:{type:String,require:true}
});

// UserSchema.methods.encryptPassword = function (password) {
//  return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null);
// };

// UserSchema.methods.decryptPassword = function (password) {
//  return bcrypt.compareSync(password, this.password);
// }

module.exports = mongoose.model('User', UserSchema);