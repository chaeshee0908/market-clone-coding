module.exports = function(sequelize, DataTypes){
    const product = sequelize.define('Product',{
        name : {
            // 글자길이 20으로 제한 두겠다
            type : DataTypes.STRING(20),
            // 무조건 name column의 값이 있어야함 
            allowNull : false
        },
        price : {
            type : DataTypes.INTEGER(10),
            allowNull: false
        },
        seller : {
            type : DataTypes.STRING(30),
            allowNull: false
        },
        description : {
            type : DataTypes.STRING(300),
            allowNull: false
        },
        imageUrl : {
            type : DataTypes.STRING(300),
            allowNull: true
        }
    });
    return product;
}