export default (sequelize, DataType) => {

    const Emails = sequelize.define('emails', {
        id: {
            primaryKey: true,
            type: DataType.UUID,
            allowNull: false,
            defaultValue: DataType.UUIDV4
        },
        from: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        to: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        subject: {
            type: DataType.STRING
        }, 
        content: {
            type: DataType.STRING
        }
    })

    return Emails
}