const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const resendTimeWindow = 1000 * 30; // 30 seconds
const validTimeWindow = 1000 * 60 * 10; // 10 minutes

const UserPwdResetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  requestCounts: {
    type: Number,
    default: 0
  },
  lastRequestTime: {
    type: Date
  },
  validUntil: {
    type: Date
  },
  resetToken: {
    type: String,
    require: true,
  }
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }

  });

UserPwdResetSchema.methods = {
  isExpired: function () {
    if (Date.now() > Date.parse(this.validUntil))
      return true;
    return false;

  },
  canBeResent: function () {
    let nextAvailableResendTime = Date.parse(this.lastRequestTime) + resendTimeWindow;
    if (Date.now() > nextAvailableResendTime)
      return true;
    return false;
  },
  timeRemainToResend: function () {
    return Date.parse(this.lastRequestTime) + resendTimeWindow - Date.now();
  },
  generateResetToken: function () {

    /*   
    generate (random) token string that will be used to reset password and turn to base10
    ex: 
    const resetToken2 = crypto.randomBytes(32); //!!! not URL-friendly
    result: {
    resetToken: <Buffer c5 ee 58 60 7e 06 9d bc ea c9 95 44 97 60 d6 90 a6 af 30 af c7 5e ca 05 17 10 42 9c 57 f6 e8 2a>
    }
    resetToken.length: 32
    */

    // get random data as plain string from crypto
    const resetToken = crypto.randomBytes(32).toString('hex');

    // ref for crypto.randomBytes :
    // https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback


    // Hash resetToken and save it to user document for verifying to token from user later=
    // let hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex'); // hashed token   ex: 

    /*
      ref:
      #1: .createHash()  crypto.createHash(algorithm[, options])
      Creates and returns a Hash object that can be used to generate hash digests using the given algorithm
      https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options
    
      #2: .update()  hash.update(data[, inputEncoding]) ):
      Updates the hash content with the given data, the encoding of which is given in inputEncoding
      https://nodejs.org/api/crypto.html#crypto_hash_update_data_inputencoding
    
      #3: .digest()   hash.digest([encoding])
      Calculates the digest of all of the data passed to be hashed (using the hash.update() method). If encoding is provided a string will be returned; otherwise a Buffer is returned.
      https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding
    */

    // Set expiry time for this reset token
    this.passwordResetExpires = Date.now() + 1000 * 60 * 10;

    // return the reset token to the middleware function such as "forgotPassword"
    return resetToken;

  },
  setNewResetToken: function () {
    let document = this;
    console.log('this:', this);
    return new Promise(async (res, rej) => {
      try {
        {
          document.requestCounts++;
          document.lastRequestTime = Date.now();
          document.validUntil = Date.now() + validTimeWindow;
          document.resetToken = document.generateResetToken();
          let updatedDocument = await document.save();
          res(updatedDocument);
        }
      } catch (error) {
        console.trace('error: ', error);
        rej(undefined);
      }
    }
    );




  }
};

let UserPasswordReset = mongoose.model('User_Pwd_Reset', UserPwdResetSchema);



module.exports = UserPasswordReset;