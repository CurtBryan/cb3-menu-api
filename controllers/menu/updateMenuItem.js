const { ObjectId } = require("bson");
const {connectToCollection} = require("../../DB/connectToCollection")

const updateMenuItem = async (req, res, next) => {
  const client = req.app.get("dbClient");
  const dbInstance = await connectToCollection(client, "note-pos", "items");
  try {
    const { itemId } = req.params;

    const {name, price, category} = req.body

    const filter = { _id: ObjectId(itemId) }

    const searchCursor = await dbInstance.find(filter);

    const results = await searchCursor.toArray();

    const updates = {
      name: name ? name : results[0].name,
      price: price ? price : results[0].price,
      category: category ? category : results[0].category,
    }

    const set = {
      $set: updates
    }

    const updateCursor = await dbInstance.updateMany(filter, set);

    console.log(updateCursor.result)

    res.status(200).send(updates)

    return updates
  } catch (err) {
    console.error(err)
    return err
  }
};

module.exports = {
  updateMenuItem,
};
