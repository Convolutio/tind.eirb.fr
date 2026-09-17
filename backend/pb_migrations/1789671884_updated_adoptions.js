/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("91m2569kt99jcfc")

  collection.createRule = "@request.auth.id = parrain.id && parrain.diploma ~ \"%4\" && fillot.diploma ~ \"%3\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("91m2569kt99jcfc")

  collection.createRule = "parrain.diploma ~ \"%4\" && @request.auth.id = parrain.id"

  return dao.saveCollection(collection)
})
