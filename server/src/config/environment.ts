import "dotenv/config";

const CONFIG = {
  db: process.env.DB,
  jwt_public: process.env.JWT_PUBLIC?.replace(/\\n/g, "\n"),
  jwt_private: process.env.JWT_PRIVATE?.replace(/\\n/g, "\n")
};

export default CONFIG;
