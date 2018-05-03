const app = require('./config/express');
const db = require('./src/models');
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    await db.sequelize.sync({ logging: false });
    console.log(`Listening in ${PORT}`);
});