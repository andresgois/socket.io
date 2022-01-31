db.createUser(
  {
      user: "andre",
      pwd: "rocketsoketdb",
      roles: [
          {
              role: "readWrite",
              db: "rocketsoket"
          }
      ]
  }
);