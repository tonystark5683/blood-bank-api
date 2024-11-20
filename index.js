const express = require("express");
const bloodBankRoutes = require("./routes/bloodBankRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("", bloodBankRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
