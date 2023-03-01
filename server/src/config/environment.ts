import "dotenv/config";

const CONFIG = {
  db: process.env.DB,
  jwt_public: process.env.JWT_PUBLIC,
  jwt_private: process.env.JWT_PRIVATE
};

export default CONFIG;
