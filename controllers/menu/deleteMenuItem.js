const { ObjectId } = require("bson");
const { connectToCollection } = require("../../DB/connectToCollection");

const deleteMenuItem = async (req, res, next) => {
  const client = req.app.get("dbClient");
  const dbInstance = await connectToCollection(client, "note-pos", "items");
  try {
    const itemId = req.params.itemId

    const deleteCursor = await dbInstance.deleteOne({ _id: ObjectId(itemId) });

    console.log(deleteCursor.deletedCount + " items deleted")

    res.status(204).send("Item Deleted");

    return "Item Deleted"
  } catch (err) {
    console.error(err);
    return err
  }
};

module.exports = {
  deleteMenuItem,
};
