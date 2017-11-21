export default function (sequelize, DataTypes) {
    const AudioTags = sequelize.define('userAudios', {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'user_id',
        },
        audioId: {
            type: DataTypes.INTEGER,
            field: 'audio_id',
        },
    }, {
        tableName: 'user_audios',
        timestamps: false,
    });

    AudioTags.associate = function (models) {
        AudioTags.belongsTo(models.user);
        AudioTags.belongsTo(models.audio);
    };

    return AudioTags;
}
