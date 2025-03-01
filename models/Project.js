const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String,  },
  description: { type: String },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', },
  startDate: {type: String},
  status: { type: String, enum: ['In Progress', 'Completed', 'On Hold','Pending'], default: 'In Progress' },
  Dedline:{ type: String,},
  price:{ type: String,},
  createdAt: { type: Date, default: Date.now },
  weblink:{ type: String,},
  hosting:{ type: String,},
  hostingpurchaseDate:{type:String},
  hostingexpDate:{type:String},
  projectType:{ type: String,},
  domain:{ type: String,},
  domainpurchaseDate:{type:String},
  domainexpDate:{type:String},
  notes:{ type: String,},
  clientnotes:{ type: String},
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  lables:{
    type: String,
    
  },
  createdby:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', }
});

module.exports = mongoose.model('Project', ProjectSchema);
