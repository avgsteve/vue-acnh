const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const UserActivationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activatedAt: {
    type: Date, // If this field is not given a value, means it's manually activated. See model method "makeActivate"
  },
  activationCodeCreatedAt: {
    type: Date,
    default: null,
  },
  activationCodeExpiresAt: {
    type: Date
  },

  activationCodeSent_count: {
    type: Number,
    default: 1,
  },
  activationCode: {
    type: String,
  }

},
  {
    timestamps: true,

  });


UserActivationSchema.statics = {

  createNewDoc: async function (userId, userName, email) {

    try {

      let existingDoc = await UserActivation.findOne({
        userName: userName
      });

      console.log('check existing user activation data: ', existingDoc);

      if (existingDoc) {
        await existingDoc.generateActivationCode();
        return existingDoc;
      };
      
      let newActivationDoc = await UserActivation.create({
        userId: userId,
        userName: userName,
        email: email
      });
      await newActivationDoc.generateActivationCode();
      return newActivationDoc;

    } catch (error) {
      console.log('error: ', error);
    }

  },
};


UserActivationSchema.methods = {

  generateActivationCode: async function () {

    console.log('generateActivationCode is called');

    const activeCode = crypto.randomBytes(32).toString('hex');
    // ref for crypto.randomBytes :
    // https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
    this.activationCode = activeCode;
    this.activationCodeCreatedAt = Date.now();
    this.activationCodeExpiresAt = Date.now() + 1000 * 60 * 30; // 10 min
    this.activationCodeSent_count++;

    this.save();
    return this;
  },
  isExpired: function () {
    // Convert UTC time to Epoch time 轉換 timestamp
    let expiryTimeEpoch = Date.parse(this.activationCodeExpiresAt);
    if (Date.now() > expiryTimeEpoch)
      return true; // is expired 
    return false;  // not expired
  },
  makeActivate: async function () {
    console.log('this in makeActivate: ', this);
    this.isActivated = true;
    this.isActivatedAt = Date.now();
    await this.save();
  },
  timeRemainToResend: function () {
    let resendTimeWindow = 1000 * 60 * 5; // 5 minutes
    return Date.parse(this.activationCodeCreatedAt) + resendTimeWindow - Date.now();
  },
  activationCodeIsCorrect: function (code) {
    if (code === this.activationCode) return true;
    return false;
  }

};



// UserActivationSchema.methods.generateActivationCode = function () {

//   console.log('generateActivationCode is called');

//   const activeCode = crypto.randomBytes(32).toString('hex');
//   // ref for crypto.randomBytes :
//   // https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
//   this.activationCode = activeCode;
//   this.activationCodeCreatedAt = Date.now();
//   this.activationCodeExpiresAt = Date.now() + 1000 * 60 * 10;
//   this.save();
//   return activeCode;
// }


let UserActivation = mongoose.model('User_activation', UserActivationSchema);



module.exports = UserActivation;