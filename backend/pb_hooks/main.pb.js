/// <reference path="../pb_data/types.d.ts" />
onRecordAuthRequest((e) => {
  const parseGroups = (filePath) => {
    try {
      const lines = String.fromCharCode.apply(null, $os.readFile(filePath)).split('\n');
      const headers = lines[0].split(',');
      const acc = {};

      for (let i = 1; i < lines.length; i++) {
        const users = lines[i].split(',');

        // min() to avoid having user = undefined
        for (let j = 0; j < Math.min(headers.length, users.length); j++) {
          const user = users[j].trim();
          if (user === "")
            continue;

          acc[user] = headers[j];
        }
      }

      return acc;
    } catch (e) {
      console.log(e);
      return {};
    }
  }


  // WARNING: The times are in the actual school's time, so the time in Europe/Paris
  const SHOTGUN_WAVES = {
    WEB: "2026-09-14 11:00:00",
    BUREAU_BDE: "2026-09-14 16:50:00",
    BDE: "2026-09-14 17:00:00",
    BAR: "2026-09-14 17:30:00",
    BUREAU_BAE: "2026-09-14 17:45:00",
    BDA: "2026-09-14 18:00:00",
    BDS: "2026-09-14 18:00:00",
    ESSAIM: "2026-09-14 18:30:00",
  }

  const SHOTGUNW_DATE_FOR_OTHERS = "2026-09-14 20:00:00";
  const groupes = parseGroups("./pb_hooks/shotgun_groups.csv");

  console.log("feur");
  console.log(JSON.stringify(groupes));

  // e.meta contains the OAuth2 provider data (if it was an OAuth2 login)
  if (e.meta && e.meta.rawUser) {
    const claims = e.meta.rawUser;
    let needsUpdate = false;

    // Map your custom claims
    if (claims.diplome) {
      e.record.set("diploma", claims.diplome);

      const AUTHORIZED_DIPLOMAS = [
        "IIEIN3", "IIEIN4", "IIEIN5",  // Infos 
        "IIETE3", "IIETE4", "IIETE5",  // Telecom
        "IIEMM3", "IIEMM4", "IIEMM5",  // MMK
        "IIEEL3", "IIEEL4", "IIEEL5",  // Elec
        "IAERI3", "IAERI4", "IAERI5",  // R&I
        "IAESE3", "IAESE4", "IAESE5"   // SEE
      ];

      console.log("feur");
      const DEROGATIONS = JSON.parse(String.fromCharCode.apply(null, $os.readFile("./pb_hooks/derogations.json")));
      console.log("feur");
      console.log(JSON.stringify(DEROGATIONS));

      if (!AUTHORIZED_DIPLOMAS.includes(claims.diplome)) {
        return c.json(403, {
          status: "error",
          message: "Vous n'êtes pas autorisé à vous connecter, seuls les 1A, 2A et 3A ont accès à cette application"
        })
      }

      if (DEROGATIONS.hasOwnProperty(claims.preferred_username)) {
        console.log(DEROGATIONS[claims.preferred_username]);
        e.record.set("diploma", DEROGATIONS[claims.preferred_username]);
        needsUpdate = true;
      }

      // NOTE: commented because we'll change those manually in the DB directly instead of using a CSV
      // needsUpdate = true;
    }

    if (claims.nom_complet) {
      e.record.set("name", claims.nom_complet);
      needsUpdate = true;
    }

    if (claims.prenom) {
      e.record.set("firstName", claims.prenom);
      needsUpdate = true;
    }

    if (claims.nom) {
      e.record.set("lastName", claims.nom);
      needsUpdate = true;
    }

    const group = groupes[e.record.get("username")] ?? null;
    // WARNING: the locale datetime is automatically shifted to UTC  
    // be careful to explicitly set the TZ env variable to Europe/Paris in your pocketbase environment
    const shotgunDate = new Date((group === null) ? SHOTGUNW_DATE_FOR_OTHERS : SHOTGUN_WAVES[group]);

    if (!e.record.get("shotgunDate") || new Date(e.record.get("shotgunDate").replace(" ", "T")) != shotgunDate) {
      e.record.set("shotgunDate", shotgunDate);
      needsUpdate = true;
    }

    // Because v0.22 runs this hook AFTER the user is saved,
    // we must manually save the record to the database if we changed it.
    if (needsUpdate) {
      $app.dao().saveRecord(e.record);
    }
  }
}, "users"); // Replace "users" with your collection name if different

routerAdd("GET", "/api/fillots", (c) => {
  let idParrain = c.queryParam("idParrain");

  if (!idParrain || typeof idParrain !== 'string') {
    return c.json(400, {
      status: "error",
      message: "Requête invalide"
    });
  }

  const parrain = $app.dao().findRecordById("users", idParrain);

  if (!parrain) {
    return c.json(404, {
      status: "error",
      message: "Parrain introuvable"
    });
  }

  const parrainDiploma = parrain.get("diploma");

  const fillots = arrayOf(new Record());
  const fillotDiploma = parrainDiploma.slice(0, -1) + "3";


  $app.dao()
    .recordQuery("users")
    .where($dbx.exp("diploma = {:fillotDiploma}", { fillotDiploma }))
    .all(fillots);

  const fillotResponse = fillots.map(fillot => ({
    id: fillot.get("id"),
    firstName: fillot.get("firstName"),
    lastName: fillot.get("lastName"),
    diploma: fillot.get("diploma"),
    parrain: fillot.get("parrain"),
    infos: fillot.get("infos"),
  }));

  return c.json(200, {
    status: "success",
    fillots: fillotResponse
  });
});


cronAdd("hello", "*/1 * * * *", () => {
  const config = arrayOf(new Record());
  $app.dao()
    .recordQuery("config")
    .where($dbx.exp("key = {:key}", { key: "TIME" }))
    .all(config);

  if (config.length > 0) {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now - timezoneOffset).toISOString().slice(0, 19);

    config[0].set("value", localISOTime);

    $app.dao().saveRecord(config[0]);

    console.log("La clé 'TIME' a été mise à jour avec l'heure locale actuelle:", localISOTime);
  } else {
    console.log("La clé 'TIME' n'a pas été trouvée dans la table config.");
  }
});

/** Hook for fillot adoption request.
 *
 *  Perform validations that Pocketbase's filter syntax does not implement.
 */
onRecordBeforeCreateRequest((e) => {
  /** Validation checks already implemented in pocketbase's table
    *   - year of the fillot and the parrain
    *   - instant time of the adoption after the shotgunDate of the parrain
    * Validation checks implemented in this hook:
    *   - same department 
    *   - under the max fillot's number
    */

  // Get the parrain and the fillot's record
  const parrainId = e.record.get("parrain");
  const fillotId = e.record.get("fillot");
  const dao = $app.dao();
  const fillot = dao.findRecordById("users", parrainId);
  const parrain = dao.findRecordById("users", fillotId);

  // INFO: check if the departments are the same
  const parrainDepartment = parrain.get("diploma").substring(0, 5);
  const fillotDepartment = fillot.get("diploma").substring(0, 5);
  if (parrainDepartment !== fillotDepartment) {
    throw new BadRequestError("Le parrain et le fillot ne sont pas dans la même filière.");
  }
}, "adoptions");
