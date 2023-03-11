import "dotenv/config";

const CONFIG = {
  db: process.env.DB,
  jwt_public: process.env.JWT_PUBLIC?.replace(/\\n/g, "\n"),
  jwt_private: process.env.JWT_PRIVATE?.replace(/\\n/g, "\n"),
  port: process.env.PORT,
  client_base_url: process.env.CLIENT_BASE_URL
};

export default CONFIG;
