export default (sequelize, DataType) => {

    const Users = sequelize.define('users', {
        id: {
            primaryKey: true,
            type: DataType.UUID,
            allowNull: false,
            defaultValue: DataType.UUIDV4
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: {
                args: true
            },
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: '123',
            validate: {
                min: 4
            }
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                min: 2
            }
        },
        username: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                min: 2
            }
        },
        phone: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                min: 8
            }
        },
        avatar_url: {
            type: DataType.STRING,
        }
    })

    return Users
}