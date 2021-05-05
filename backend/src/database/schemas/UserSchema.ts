import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import crypto from 'crypto'

const Schema = mongoose.Schema;


export interface IUserPassword extends mongoose.Document {
    hashed_password: string;
    passwordLastUpdated: Date;
    hasSetPassword?: Boolean

}

export interface INewUserAttributes {
    email: string;
    _id?: string,
    password?: string | null;
    nickName?: string;
    listData?: object;
}


export interface IUserDocProperties extends mongoose.Document {
    tokenIsValidUntil?: Date;
    verifyPassword?: any;
    hashed_password?: string;
    hasSetPassword?: Boolean
    email: string;
    oauthAccounts: {
        google: {
            registered: Boolean,
            email: string,
            picture: string,
            name: string
        },
        facebook: {
            registered: Boolean, email: string
        },
    },
    listData?: object;
    nickName?: string;
    nameOfIsland?: string;
    friends?: [mongoose.Types.ObjectId];
    villagers?: [string];
    passwordLastUpdated?: Date,
    numOfRequestMade?: number;
    numOfRequestDone?: number;
    following?: [mongoose.Types.ObjectId];
    followers?: [mongoose.Types.ObjectId];
    dreamAddress?: string;
    about?: string;
    timeZone?: number;
    hemisphere?: string;
    profilePic?: string;
    coverPhoto?: string;
    salt?: string;
    role?: string;
}


export interface UserDoc extends mongoose.Document {
    email: {
        type: string;
        unique: boolean;
        required: boolean;
    }
}


interface IUserModel extends mongoose.Model<IUserDocProperties> {
    buildNewUser(attrs: INewUserAttributes): IUserDocProperties;
    verifyPassword(password: string): IUserDocProperties;
}


const UserSchema = new Schema({
    email: {
        type: String, required: true, trim: true, unique: true
    },
    oauthAccounts: {
        google: {
            registered: { type: Boolean, default: false },
            email: { type: String },
            name: { type: String },
            picture: { type: String },
        },
        facebook: {
            registered: { type: Boolean, default: false },
            email: { type: String }
        },
    },
    listData: {
        type: Schema.Types.ObjectId, ref: 'ListData'
    },
    nickName: {
        type: String, trim: true
    },
    nameOfIsland: {
        type: String, trim: true
    },
    friends: [
        {
            type: Schema.Types.ObjectId, ref: 'Post'
        }],
    villagers: [
        {
            type: Array
        }],
    hashed_password: {
        type: String,
        select: false,
    },
    hasSetPassword: {
        type: Boolean,
        default: false,
        select: false,
    },
    passwordLastUpdated: {
        type: Date,
        // required: true,
        select: false,
    },
    numOfRequestMade: {
        type: Number,
    },
    numOfRequestDone: {
        type: Number,
    },
    list: [
        {
            type: Schema.Types.ObjectId, ref: 'List'
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId, ref: 'Post'
        }],
    followers: [
        {
            type: Schema.Types.ObjectId, ref: 'Post'
        }],
    dreamAddress: {
        type: String,
    },
    about: {
        type: String,
    },
    timeZone: {
        min: { type: Number, min: -8 },
        max: { type: Number, max: 8 }
    },
    hemisphere: {
        type: String,
    },
    profilePic: {
        type: String,
        default: "/src/assets/img/characters/Blathers.png"
    },
    coverPhoto: {
        type: String,
        default: "/src/assets/img/background/coverPhoto.jpg"
    },

    salt: {
        type: String,
        select: false,
    },
    role: {
        type: String,
        enum: ['user', 'test-user', 'admin', 'test-admin', 'super-admin'],
        default: 'user'
    },
    // activation: {
    //     type: Schema.Types.ObjectId, ref: 'UserActivation'
    // },
    // toBeDeleted: {
    //     type: Boolean, default: false,
    //     // select: false
    // },
    // toBeDeletedAt: {
    //     type: Date,
    //     // select: false
    // },
    // isDeleted: {
    //     type: Boolean, default: false,
    //     select: false
    // }
}, { timestamps: true });

UserSchema.virtual('password')
    .set(async function (this: IUserPassword, password: any,) {
        const saltRound = 10;
        if (password !== null) {
            this.hashed_password = await bcrypt.hash(password, saltRound);
            this.passwordLastUpdated = new Date();
            this.hasSetPassword = true;
        }
        if (password === null) {
            // TODO 之後再改成別的方式
            const length = 10
            const randomString = crypto.randomBytes(Math.ceil(length / 2))
                .toString('hex') // convert to hexadecimal format
                .slice(0, length).toUpperCase();
            this.hashed_password = await bcrypt.hash(password, saltRound);
            this.passwordLastUpdated = new Date();
            this.hasSetPassword = false;
        }
        await this.save();
    })
    .get(function (this: IUserPassword) {
        return this.hashed_password;
    });

// methods (for virtual schema: 'password' )
UserSchema.methods = {
    verifyPassword: function (password: string) {
        return bcrypt.compare(password, this.hashed_password);
    },
    updatePassword: function (password: string) {
        let document = this;
        console.log('document: ', document);
        return new Promise(async (res, rej) => {
            const saltRound = 10;
            try {
                document.hashed_password = await bcrypt.hash(password, saltRound);
                document.passwordLastUpdated = new Date();
                let updatedDocument = await document.save();
                res(updatedDocument);
            } catch (error) {
                console.trace('error: ', error);
                rej(undefined);
            }
        }
        );
    }
};


// 在 schema 新增 static method: buildNewUser
// 讓 build function 變成 userSchema 內建的 build method
UserSchema.statics = {
    buildNewUser: function (
        attrs: INewUserAttributes
        // 透過 interface IUserAttributes，
        // 規範傳進 buildNewUser method 的 attrs 物件需要包含的屬性和型別
    ) {
        return new User(attrs);
    }
}

let User = mongoose.model<IUserDocProperties, IUserModel>('User', UserSchema);


export default User;