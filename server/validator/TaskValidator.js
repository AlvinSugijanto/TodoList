import { body, validationResult } from 'express-validator';

class TaskValidator {

    validateCreateTask() {

        return [
            body('title').notEmpty().withMessage('Title is required.'),
            body('description').notEmpty().withMessage('Description is required.'),
            body('status').notEmpty().withMessage('Status is required.'),

            (req, res, next) => {
                const error = validationResult(req);
                // console.log(error);
                if (!error.isEmpty()) {
                    return res.status(400).json({
                        message : error.errors[0].msg
                    } );
                }
                next();
            }
        ];

    }
}

export default new TaskValidator();
