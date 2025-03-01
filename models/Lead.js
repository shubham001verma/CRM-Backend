const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: { type: String, },
  phone: { type: String},
  owner:{ type: String},
  primeryConection:{ type: String},
  primeryConectiontype:{ type: String,enum:  ['Manager', 'Sales Executive', 'Support', 'Developer','Editor','Graphic Designer','Other'], default: 'Other' },
  status: { type: String, enum: ['New', 'Discussion', 'Qualified','Negotiation', 'Lost','Won'], default: 'New' },
  source: { type: String, },
  createdAt: { type: Date, default: Date.now },
  address:{ type: String,},
  city:{ type: String, },
  state:{ type: String,},
  zip:{ type: String,},
  comments: { type: String },
  lables:{
    type: String,
    
  },
  createdby:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', }
});

module.exports = mongoose.model('Lead', LeadSchema);
