export default function (sequelize, DataTypes) {
    const AudioTags = sequelize.define('audioTags', {
        audioId: {
            type: DataTypes.INTEGER,
            field: 'audio_id',
        },
        tagId: {
            type: DataTypes.INTEGER,
            field: 'tag_id',
        },
    }, {
        tableName: 'audio_tags',
        timestamps: false,
    });

    AudioTags.associate = function (models) {
        AudioTags.belongsTo(models.audio);
        AudioTags.belongsTo(models.tag);
    };

    return AudioTags;
}
