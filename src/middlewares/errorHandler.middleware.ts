import { Request, Response, NextFunction } from 'express';

const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware Error Handling");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
    })
}

export default ErrorHandler