// mongoose = require('mongoose');

const {Schema, model} = require('mongoose');

// var Schema = mongoose.Schema;
// if (mongoose.connection.readyState === 0) {
//   mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// }

//var newSchema = new Schema({

const UserM = new Schema({
  id: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  id_type: { type: String },
  tokens: { type: Object },
  roles: [
      {
        type: Schema.Types.ObjectId,
        // type: String,
        ref: 'roleM'
      }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

  // '_id': { type: String, unique: true, require: true },
  // 'password': { type: String, require: true },
  // 'id_type': { type: String },
  // 'tokens': { type: Object },
  // 'createdAt': { type: Date, default: Date.now },
  // 'updatedAt': { type: Date, default: Date.now }
});

// newSchema.pre('save', function(next){
//   this.updatedAt = Date.now();
//   next();
// });

// newSchema.pre('update', function() {
//   this.update({}, { $set: { updatedAt: Date.now() } });
// });

// newSchema.pre('findOneAndUpdate', function() {
//   this.update({}, { $set: { updatedAt: Date.now() } });
// });

module.exports = model('userM', UserM);
