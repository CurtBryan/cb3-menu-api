const { deleteMenuItem } = require("../../../controllers/menu/deleteMenuItem");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("bson");
const { connectToCollection } = require("../../../DB/connectToCollection");

describe("deleteMenuItem", () => {
  let connection;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const dbInstance = await connectToCollection(
      connection,
      "note-pos",
      "items"
    );

    // await dbInstance.drop();

    await dbInstance.insertOne({
      _id: ObjectId("123456789123"),
      price: 1.99,
      name: "Coke",
      category: "app",
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  const get = () => {
    return connection;
  };

  const req = {
    app: {
      get: get,
    },
    params: {
      itemId: "123456789123",
    },
  };

  const badReq = {
    app: {
      get: () => {
        return;
      },
    },
    params: {
      itemId: "123456789123",
    },
  };

  const res = {
    send: jest.fn(),
    status: jest.fn(() => res),
  };

  it("should delete menu item", async () => {
    const results = await deleteMenuItem(req, res);
    await expect(results).toEqual("Item Deleted");
  });

  it("should not delete menu item", async () => {
    const results = await deleteMenuItem(badReq, res);
    await expect(results.toString()).toEqual(
      "TypeError: dbInstance.deleteOne is not a function"
    );
  });
});
