const db = require("./db");

async function testDatabase() {
  try {
    const connection = await db.getConnection();

    console.log("✅ Connexion MySQL réussie");

    connection.release();
  } catch (error) {
    console.error("❌ Connexion MySQL impossible");
    console.error(error.message);
  }
}

testDatabase();