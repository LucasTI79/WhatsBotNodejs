const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/nodechat',{ 
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex:true,
//     useFindAndModify:false
// });

mongoose.connect(`mongodb+srv://lucas:020918@cluster0.xphxz.mongodb.net/nodechat?retryWrites=true&w=majority`,{ 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify:false
}).catch(err => console.log('error database', err))

mongoose.Promise = global.Promise;

module.exports = mongoose;