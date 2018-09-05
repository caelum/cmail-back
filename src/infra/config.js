import dotenv from 'dotenv'
dotenv.config()

export default {
    db: {
        database: 'cmail',
        username: '',
        password: '',
        params: {
            dialect: 'sqlite',
            storage: `_${process.env.NODE_ENV}_cmail.sqlite`,
            define: {
                underscored: true,
            },
            operatorsAliases: false,
            logging: false
        }
    }
};