import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    unique: true,   
    trim: true      
  },
  description: {
    type: String,
    required: false,       
  }
},{ timestamps: true });

export const Role = mongoose.model('Role', RoleSchema);

