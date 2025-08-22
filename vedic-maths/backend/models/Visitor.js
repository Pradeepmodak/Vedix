import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  visitorId: { type: String, required: true, unique: true },
  firstSeen: { type: Date, default: Date.now },
  lastSeen: { type: Date, default: Date.now },
  visitsCount: { type: Number, default: 1 }
}, { timestamps: true });

const visitorModel = mongoose.models.Visitor || mongoose.model('Visitor', visitorSchema);

export default visitorModel;
