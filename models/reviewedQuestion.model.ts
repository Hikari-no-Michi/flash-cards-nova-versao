import mongoose, { Schema, Document } from 'mongoose';

interface IReviewedQuestion extends Document {
  userId: string;
  questionId: string;
  status: 'correct' | 'incorrect';
  materiaId: string;
}

const ReviewedQuestionSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    questionId: { type: String, required: true },
    status: { type: String, enum: ['correct', 'incorrect'], required: true },
    materiaId: { type: String, required: true }, // novo campo adicionado
  },
  {
    timestamps: true,
  }
);

const ReviewedQuestion =
  mongoose.models.ReviewedQuestion ||
  mongoose.model<IReviewedQuestion>('ReviewedQuestion', ReviewedQuestionSchema);

export default ReviewedQuestion;
