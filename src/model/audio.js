import * as _ from 'lodash';
import * as userHelper from '../helper/user';

export default function (sequelize, DataTypes) {
    const Audio = sequelize.define('audio', {
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
        audioUrl: {
            type: DataTypes.STRING,
            field: 'audio_url',
        },
        audioDuration: {
            type: DataTypes.INTEGER,
            field: 'audio_duration',
        },
        categoryId: {
            type: DataTypes.INTEGER,
            field: 'category_id',
        },
        isLocked: {
            type: DataTypes.BOOLEAN,
            field: 'is_locked',
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

    Audio.associate = function (models) {
        Audio.belongsToMany(models.tag, {
            through: models.audioTags,
            foreignKey: 'audioId',
            otherKey: 'tagId',
        });
        Audio.belongsToMany(models.user, {
            through: models.userAudios,
            foreignKey: 'audioId',
            otherKey: 'userId',
        });
        Audio.belongsTo(models.category);
    };

    Audio.prototype.toJSON = function toJSON() {
        const privateAttributes = ['deletedAt'];
        this.dataValues.audioTime = userHelper.calcTime(this.dataValues.audioDuration, true);
        return _.omit(this.dataValues, privateAttributes);
    };

    return Audio;
}
