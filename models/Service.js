const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
   
  },
  cost: {
    type: Number,
  
    min: 0,
  },
  duration: {
    type: String, 
  
  },
    createdby:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', },
    
},{
  timestamps: true, // To track creation and updates
}
);

module.exports = mongoose.model("Service", serviceSchema);
