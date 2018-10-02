import mongoose, { Schema } from 'mongoose'

const questionnaireSchema = new Schema({
  creator: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  picture: {
    type: String
  },
  maxAttempt: {
    type: Number
  },
  status: {
    type: Number, 
    required: true,
  },
  type: {
    type: Number,
    required: true
  },
  isPublic: {
    type: Boolean
  },
  requireId: {
    type: Boolean
  },
  version: {
    type: Number,
    default: 1
  },
  deadline: {
    type: Date
  }, 
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

questionnaireSchema.statics = {
  Status: {
    PENDING: 1,
    OPEN: 2,
    CLOSED: 3
  },
  Types: {
    QUIZ: 1,
    CHALLENGE: 2, 
    SURVEY: 3,
    DATACOLLECTION: 4
  }
}

questionnaireSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      creator: this.creator.view(full),
      name: this.name,
      picture: this.picture,
      maxAttempt: this.maxAttempt,
      status: this.status,
      type: this.type,
      isPublic: this.isPublic,
      requireId: this.requireId,
      version: this.version,
      deadline: this.deadline,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  },
  softDelete() {
    this.isDeleted = true
    this.save()
    return null;
  }
}

const model = mongoose.model('Questionnaire', questionnaireSchema)

export const schema = model.schema
export default model
