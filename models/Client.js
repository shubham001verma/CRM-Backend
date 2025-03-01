const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  clientname: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  primeryConnection: { type:String},
  primeryConectiontype:{ type: String,enum:   ['Manager', 'Sales Executive', 'Support', 'Developer','Editor','Graphic Designer','Other'], default: 'Other' },
  email: { type: String,  },
  phone: { type: String,  },
  password:{type: String},
  company: { type: String,},
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
  projects:{ type: String, },
  clientgroups:{ type: String, },
  totalinvoiced:{ type: String, },
  totalexpense:{ type: String,},
  paymentReceived	:{ type: String,},
  image:{type:String},
  profileName:{
    type: String,
    default: null
},
  lables:{
    type: String,
  
  },
  createdby:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', },
  role:{
    type: String,
    default: 'Client'
},



});

module.exports = mongoose.model('Client', ClientSchema);
