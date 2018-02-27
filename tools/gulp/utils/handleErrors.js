console.log("bringing handling");

module.exports = function(taskFn) {
    return function(done) {
        function onSuccess() {
            done();
        };

        function onError(err) {
            done(err);
            process.exit(1);
        };

        var outStream = taskFn(onSuccess, onError);

        if(outStream && typeof outStream.on === 'function') {
            outStream.on('end', onSuccess);
        }
    }
};
