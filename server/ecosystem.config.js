module.exports = {
  apps: [
    {
      name: "app1",
      script: "./bin/www",
      env: {
        NODE_ENV: "development",
      },
      env_test: {
        NODE_ENV: "test",
      },
      env_staging: {
        NODE_ENV: "staging",
      },
      env_production: {
        CLIENT_URL: "http://localhost:5173",
        MONGO_URL:
          "mongodb+srv://admin:1vxVfEBYde6lP5h0@cluster0.fnswi7v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        SECRET_KEY: "catsanddogs",
      },
    },
  ],
};
