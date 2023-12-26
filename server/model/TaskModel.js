import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const TaskModel = db.define('tasks', {
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type : DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type : DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type : DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps : false
});

export default TaskModel;

(async () => {
    await db.sync();
})();