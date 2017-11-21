import * as _ from 'lodash';

export default function (sequelize, DataTypes) {
    const Tag = sequelize.define('tag', {
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

    Tag.associate = function (models) {
        Tag.belongsToMany(models.audio, {
            through: models.audioTags,
            foreignKey: 'tagId',
            otherKey: 'audioId',
        });
    };

    Tag.prototype.toJSON = function toJSON() {
        const privateAttributes = ['deleted_at'];
        return _.omit(this.dataValues, privateAttributes);
    };

    return Tag;
}
