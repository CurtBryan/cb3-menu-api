const {connectToCollection} = require("../../DB/connectToCollection")

const addMenuItem = async (req, res, next) => {
  const client = req.app.get("dbClient");
  const dbInstance = await connectToCollection(client, "note-pos", "items");
  try {
    const { price, name, category } = req.body;

    const insertCursor = await dbInstance.insertOne({
      price,
      name,
      category,
    });

    const results = {insertCount: insertCursor.insertedCount, item: insertCursor.ops[0] }

    res.status(201).send(results);

    console.log(results)

    return results
  } catch (err) {
    res.status(500).send(err.toString());
    return err.toString()
  }
};

module.exports = {
  addMenuItem,
};
