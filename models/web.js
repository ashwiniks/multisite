module.exports = function (sequelize, Sequelize) {

    var WebMaster = sequelize.define('web_master', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        web_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            notEmpty: true
        }



    });

    return WebMaster;

}