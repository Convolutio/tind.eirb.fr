/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  // up queries...

  // Create the adoptions
  console.log("Create the adoption record.")
  db.newQuery(`
      INSERT INTO adoptions (parrain, fillot)
      SELECT u.parrain, u.id
      FROM users u
      WHERE u.parrain != '';
    `).execute();

  // Set the parrain field to null in the user
  console.log("Clear the parrain field in the users table.")
  db.newQuery(`
      UPDATE users
      SET parrain = '';
    `).execute();
}, (db) => {
  // down queries...

  // set the parrain field of the fillot's user
  console.log("Set the parrain field in the users table.")
  db.newQuery(`
    UPDATE users
    SET parrain = a.parrain
    FROM adoptions a
    WHERE users.id = a.fillot;
    `).execute();

  // remove the adoptions
  console.log("Remove the adoption records.")
  db.newQuery("DELETE FROM adoptions;").execute();
})
