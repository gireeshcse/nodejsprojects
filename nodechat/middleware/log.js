exports.logger = function logger(req, res, next){
//we can write this log to the file or database
console.log(req.url);
next();
};