import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  fullName?: string;
  password: string;
  email?: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  paymentStatus: 'paid' | 'unpaid';
  paymentDate?: Date | null;
  createdAt: Date;
  cpf?: string;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    fullName: { type: String },
    password: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
    paymentDate: { type: Date, default: null },
    cpf: { type: String, default: '' },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
