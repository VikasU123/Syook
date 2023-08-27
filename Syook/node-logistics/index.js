const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const itemRoutes = require('./src/routes/itemRoutes');
const vehicleRoutes = require('./src/routes/vehicleRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

app.use(bodyParser.json());

app.use('/api/items', itemRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
