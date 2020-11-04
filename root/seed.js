const seeder = require("mongoose-seed");
require("dotenv").config();
// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGO, () => {
  // Load Mongoose models
  seeder.loadModels([
    "src/models/root",
    "src/models/student",
    "src/models/teacher",
  ]);

  // Clear specified collections
  seeder.clearModels(["root"], () => {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
  });
});

// Data array containing seed data - documents organized by Model
var data = [
  {
    model: "root",
    documents: [
      {
        email: "root@stda.edu.mn",
        name: "Root",
        password: "password",
      },
    ],
  },
];
