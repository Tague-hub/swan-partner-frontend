const multer = require("multer");
const upload = multer({ dest: "public/uploads/", preservePath: true });
module.exports = upload
