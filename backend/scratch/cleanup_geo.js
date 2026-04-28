import mongoose from "mongoose";
import dotenv from "dotenv";
import Boarding from "../src/models/boarding.js";

dotenv.config();

async function cleanup() {
  try {
    console.log("Connecting to MongoDB: " + process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully.");

    // 1. Identify documents with invalid location.coordinates (empty arrays)
    // MongoDB's 2dsphere index requires exactly [longitude, latitude]
    console.log("Finding documents with invalid coordinates...");
    const invalidDocs = await Boarding.find({ "location.coordinates": { $size: 0 } });
    console.log(`Found ${invalidDocs.length} documents with empty coordinates.`);

    if (invalidDocs.length > 0) {
      const result = await Boarding.updateMany(
        { "location.coordinates": { $size: 0 } },
        { $set: { location: null } }
      );
      console.log(`Updated ${result.modifiedCount} documents. Set 'location' to null.`);
    }

    // 2. Manually trigger the index creation
    console.log("Attempting to create 2dsphere index on 'location' field...");
    await Boarding.collection.createIndex({ "location": "2dsphere" });
    console.log("2dsphere index created successfully!");

    // 3. Verify index
    const indexes = await Boarding.collection.indexes();
    console.log("Current indexes on 'boardings' collection:");
    console.log(JSON.stringify(indexes, null, 2));

  } catch (error) {
    console.error("Cleanup script failed with error:");
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
}

cleanup();
