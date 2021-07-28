const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/nodechat',{ 
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex:true,
//     useFindAndModify:false
// });

mongoose.connect(`${process.env.MONGO_URI}?retryWrites=true&w=majority`,{ 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify:false
});

mongoose.Promise = global.Promise;

module.exports = mongoose;