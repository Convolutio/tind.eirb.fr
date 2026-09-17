/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("91m2569kt99jcfc")

  collection.listRule = "@request.auth.diploma !~ \"%3\""
  collection.viewRule = "@request.auth.diploma !~ \"%3\""
  collection.createRule = "parrain.diploma ~ \"%4\" && @request.auth.id = parrain.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("91m2569kt99jcfc")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
