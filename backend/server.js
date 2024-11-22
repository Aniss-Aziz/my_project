const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes'); 
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', taskRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
