import * as _ from 'lodash';
import * as userHelper from '../helper/user';

export default function (sequelize, DataTypes) {
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name',
        },
        middleName: {
            type: DataTypes.STRING,
            field: 'middle_name',
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name',
        },
        password: {
            type: DataTypes.STRING,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            field: 'date_of_birth',
        },
        phone: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        gender: {
            type: DataTypes.STRING,
        },
        imageUrl: {
            type: DataTypes.STRING,
            field: 'image_url',
        },
        isSocialLogin: {
            type: DataTypes.BOOLEAN,
            field: 'is_social_login',
        },
        socialLoginSource: {
            type: DataTypes.STRING,
            field: 'social_login_source',
        },
        isSubscribed: {
            type: DataTypes.BOOLEAN,
            field: 'is_subscribed',
        },
        role: {
            type: DataTypes.STRING,
        },
        meditationSeconds: {
            type: DataTypes.INTEGER,
            field: 'meditation_seconds',
        },
        resetToken: {
            type: DataTypes.STRING,
            field: 'reset_token',
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at',
        },
    }, {
        timestamps: true,
        paranoid: true,
    });

    User.associate = function (models) {
        User.belongsToMany(models.audio, {
            through: models.userAudios,
            foreignKey: 'userId',
            otherKey: 'audioId',
        });
    };

    User.prototype.toJSON = function toJSON() {
        const privateAttributes = ['password', 'deletedAt', 'resetToken'];
        const MeditationData = userHelper.getMeditationData(this.dataValues.meditationSeconds);
        this.dataValues.rank = MeditationData.rank;
        this.dataValues.meditationTime = MeditationData.meditationTime;
        return _.omit(this.dataValues, privateAttributes);
    };

    return User;
}
