require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || "",
};

// ✅ Verificar si DATABASE_URL está definida
if (!config.databaseUrl) {
  console.error("ERROR: DATABASE_URL no está definida. Revisa tu archivo .env.");
  process.exit(1);
}

module.exports = { config };
