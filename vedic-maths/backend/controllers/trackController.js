import Visitor from '../models/Visitor.js';
import crypto from 'crypto';

// Track a visitor (new or returning)
export const trackVisitor = async (req, res) => {
  try {
    let { visitorId } = req.body || {};
    let isNew = false;

    if (!visitorId) {
      visitorId = crypto.randomUUID(); // generate unique ID
      isNew = true;
    }

    // Update or insert visitor
    const result = await Visitor.updateOne(
      { visitorId },
      {
        $setOnInsert: { firstSeen: new Date()},
        $set: { lastSeen: new Date() },
        $inc: { visitsCount: 1 }
      },
      { upsert: true }
    );

    // If it was inserted, confirm it's new
    if (result.upsertedCount === 1) {
      isNew = true;
    }

    res.json({ ok: true, visitorId, isNew });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
};

// Return overall metrics
export const getVisitors = async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    const visitsAgg = await Visitor.aggregate([
      { $group: { _id: null, total: { $sum: "$visitsCount" } } }
    ]);

    const totalVisits = visitsAgg.length > 0 ? visitsAgg[0].total : 0;

    res.json({ ok: true, totalVisitors, totalVisits });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
};
