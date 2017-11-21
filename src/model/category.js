import * as _ from 'lodash';

export default function (sequelize, DataTypes) {
    const Category = sequelize.define('category', {
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        imageUrl: {
            type: DataTypes.STRING,
            field: 'image_url',
        },
        sequence: {
            type: DataTypes.INTEGER,
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

    Category.prototype.toJSON = function toJSON() {
        const privateAttributes = ['deletedAt'];
        return _.omit(this.dataValues, privateAttributes);
    };

    return Category;
}
