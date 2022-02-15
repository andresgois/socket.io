db = db.getSiblingDB('socket');
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