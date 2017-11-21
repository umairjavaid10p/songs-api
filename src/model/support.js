import * as _ from 'lodash';

export default function (sequelize, DataTypes) {
    const Support = sequelize.define('support', {
        subject: {
            type: DataTypes.STRING,
        },
        body: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'user_id',
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            field: 'is_read',
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

    Support.prototype.toJSON = function toJSON() {
        const privateAttributes = ['deletedAt'];
        return _.omit(this.dataValues, privateAttributes);
    };

    return Support;
}
