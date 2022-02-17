db = db.getSiblingDB('rocketsoket');
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
db.createCollection("Acessos");