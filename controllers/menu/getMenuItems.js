const {connectToCollection} = require("../../DB/connectToCollection")

const getMenuItems = async (req, res, next) => {
  const client = req.app.get("dbClient");
  const dbInstance = await connectToCollection(client, "note-pos", "items");
  try {

    const searchCursor = await dbInstance.find();

    const results = await searchCursor.toArray();

    res.status(200).send(results)

    console.log(results.length + " records")

    return results
  } catch (err) {
    console.error(err);
    return err.toString()
  }
};

module.exports = {
  getMenuItems,
};
