import mongoose from 'mongoose';



const LessonResourceSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson', 
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true 
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  resourceType: {
    type: String,
    required: true,
    enum: ['link'], 
    trim: true
  }
});

export const LessonResource = mongoose.model('LessonResource', LessonResourceSchema);