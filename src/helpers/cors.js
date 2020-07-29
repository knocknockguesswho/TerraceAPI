module.exports = {
    corsOptions : function(req, callback){
        if (whitelist.split('').indexOf(req.header('origin')) !== -1) {
            console.log('success')
            return callback(null, {
                origin: true
            })
        } else {
            console.log('Failed')
            return callback(null, {
                origin: false
            })
        }
    },
}