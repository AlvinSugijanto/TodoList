import TaskModel from "../model/TaskModel.js";


export const getTask = async (req, res) => {

    try {
        const tasks = await TaskModel.findAll();
        return res.status(200).json({
            message : 'Success',
            data : tasks
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Unexpected Error Happened'
        })
    }
}

export const createTask = async (req, res) => {



    try {

        const ingredient = await TaskModel.create(req.body);


        return res.status(200).json({
            message: 'Successfully Add Task',
            data: ingredient.dataValues
        });


    } catch (error) {
        return res.status(400).json({
            message: 'Unexpected Error Happened'
        })
    }
}

export const updateTask = async (req, res) => {

    const { status } = req.body;
    const { id } = req.params;

    try {

        const task = await TaskModel.findOne({
            where: {
                id: id
            }
        })

        if (!task) {
            return res.status(404).json({
                message: 'Task Not Found'
            })
        }
        await task.update({
            status: status,
        })


        return res.status(200).json({
            message: 'Task successfully updated',
            data: task.dataValues
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Unexpected Error Happened'
        })
    }

}

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {

        await TaskModel.destroy({
            where : {
                id : id
            }
        })


        return res.status(200).json({
            'message': 'Delete Ingredient Success',
        });

    } catch (error) {
        return res.status(400).json({
            message: 'Unexpected Error Happened'
        })
    }
}