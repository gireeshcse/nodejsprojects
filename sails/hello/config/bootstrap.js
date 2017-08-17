/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  console.log('Hello World!');
  console.log(sails.config.google.apiKey);
  Video.count().exec(function(err,videoCount){
    if(err)
    {
      return cb(err);
    }
    if(videoCount>0)
    {
      console.log("No. of video records",videoCount);
      return cb();
    }
    console.log('No video records');
    return cb();
  });
  //cb();
};
