const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserAccDeleteSchema = new Schema({
  userIdToDelete: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  userName: {
    type: String // just for record
  },
  timeToDelete: {
    type: Date
  },
  isCanceled: {
    type: Boolean,
    default: false
  },
  cancelRequestTime: {
    type: Date
  }
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }

  });


// https://stackoverflow.com/questions/46589715/how-to-check-modified-fields-in-pre-post-update-hook-in-mongoose-js

UserAccDeleteSchema.pre('save', async function (next) {

  let fieldsUpdate = this.modifiedPaths();
  console.log('fieldsUpdate in UserAccDelete: \n', fieldsUpdate);

  // Conditionally do stuff by checking which field is being updated
  // if ( this.isModified('fieldName') ) {...}

  if (
    this.isCanceled === true
  ) {

    // Only update cancelRequestTime when it's a new request for cancelling the delete action
    if (this.isModified('isCanceled')) {
      console.log("this.isModified('isCanceled') is true");
      this.cancelRequestTime = Date.now();
    }

    // or just don't update cancelRequestTime if the document is not updated
    // In case there are multiple or duplicated cancel requests
    return next();
  }

  if (
    this.isCanceled === false ||        // make delete request again
    this.userIdToDelete !== undefined   // make new delete document
  ) {
    // Make cancel document active again
    this.timeToDelete = Date.now() + 1000 * 60 * 10;
    this.isCanceled === false;
    this.cancelRequestTime = null;
    return next();
  }
  
  next();
});


UserAccDeleteSchema;

UserAccDeleteSchema.statics = {

  createNewDoc: async function (userId, userName) {

    try {

      let existingDoc = await UserAccDelete.findOne({
        userIdToDelete: userId,
      });

      console.log('check existing user activation data: ', existingDoc);

      if (existingDoc) {
        existingDoc.isCanceled = false;
        await existingDoc.save();
        return existingDoc;
      };

      let newDeleteDoc = await UserAccDelete.create({
        userIdToDelete: userId,
        userName: userName
      });
      return newDeleteDoc;

    } catch (error) {
      console.log('error: ', error);
    }

  },
};

let UserAccDelete = mongoose.model('UserAccDelete', UserAccDeleteSchema);

module.exports = UserAccDelete;