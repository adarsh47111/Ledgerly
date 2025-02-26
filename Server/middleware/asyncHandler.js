// Middleware to handle async functions and it will catch any errors that occur during the async function and pass them to the next function. This will allow us to handle errors in the error handling middleware.
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;
