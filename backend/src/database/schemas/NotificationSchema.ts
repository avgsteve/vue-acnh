const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
    {
        userTo: {
            type: Schema.Types.ObjectId, ref: 'User',
            required: true
        },
        userFrom:
        {
            type: Schema.Types.ObjectId, ref: 'User',
            required: true
        },
        notificationType: String,
        opened: {
            type: Boolean,
            default: false
        },
        entityId: Schema.Types.ObjectId
    },
    {
        timestamps: true
    }
);

NotificationSchema.statics.insertNotification =
    async (userTo, userFrom, notificationType, entityId) => {
    let data = {
        userTo: userTo,
        userFrom: userFrom,
        notificationType: notificationType,
        entityId: entityId
        };
        // There might be repeated action keeps add the same document
        // So need to remove existing data if there is already one
        await Notification.deleteOne(data)
            .catch(error => console.log(error));
        // than create it again
        return Notification.create(data)
            .catch(error => console.log(error));
};


let Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;