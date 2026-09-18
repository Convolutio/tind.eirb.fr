/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t39ke79knykpyjx")

  collection.options = {
    "query": "SELECT\n    u.id,\n    COUNT(a.id) AS fillot_nb\nFROM users u\nLEFT JOIN adoptions a ON a.parrain = u.id\nGROUP BY u.id;"
  }

  // remove
  collection.schema.removeField("tmxdrvwy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dballijd",
    "name": "fillot_nb",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t39ke79knykpyjx")

  collection.options = {
    "query": "SELECT parrain as id, COUNT(*) as fillot_nb FROM adoptions GROUP BY parrain;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tmxdrvwy",
    "name": "fillot_nb",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("dballijd")

  return dao.saveCollection(collection)
})
