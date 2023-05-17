const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const activityRoutes = require("./routes/activities");
const courseRoutes = require("./routes/courses");
const dailyChallengeRoutes = require("./routes/dailyChallenges");
const invoiceRoutes = require("./routes/invoices");
const materialRoutes = require("./routes/materials");
const messageRoutes = require("./routes/messages");
const notificationRoutes = require("./routes/notifications");
const studentRoutes = require("./routes/students");
const path = require("path");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("DB Connection success"))
  .catch((e) => {
    console.log({ e });
    console.log("Cannot connect to db");
  });

app.use(
  cors()
  //   {
  //     origin: 'https://www.section.io'
  // }
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/activities", activityRoutes);
app.use("/courses", courseRoutes);
app.use("/dailyChallenges", dailyChallengeRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/materials", materialRoutes);
app.use("/messages", messageRoutes);
app.use("/notifications", notificationRoutes);
app.use("/students", studentRoutes);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log("Backend server started");
});
