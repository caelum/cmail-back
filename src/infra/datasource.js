import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

let database = null;

const loadModels = (sequelize) => {
    const dir = path.join(__dirname, '../models');
    const models = [];
    fs.readdirSync(dir).forEach(file => {
        const modelDir = path.join(dir, file);
        const model = sequelize.import(modelDir);
        models[model.name] = model;
    });
    return models;
};

const relationships = (models) => {
    // Relations goes here
}

export default function (app) {
    if (!database) {
        const config = app.config;
        const sequelize = new Sequelize(
            config.db.database,
            config.db.password,
            config.db.username,
            config.db.params
        );

        database = {
            sequelize,
            Sequelize,
            models: {},
        };

        database.models = loadModels(sequelize);

        relationships(database.models)

        sequelize.sync().done(() => database);
    }
    return database;
}