const { updateMenuItem } = require("../../../controllers/menu/updateMenuItem");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("bson");
const { connectToCollection } = require("../../../DB/connectToCollection");

describe("updateMenuItem", () => {
  let connection;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const dbInstance = await connectToCollection(
      connection,
      "note-pos",
      "users"
    );

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
    body: {
      name: "Sprite",
      price: 2.07,
      category: "app",
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
    body: {
      name: "Sprite",
      price: 2.07,
      category: "app",
    },
  };

  const res = {
    send: jest.fn(),
    status: jest.fn(() => res),
  };

  it("should update menu item", async () => {
    const results = await updateMenuItem(req, res);
    await expect(results.name).toEqual("Sprite");
  });

  it("should not update menu item", async () => {
    const results = await updateMenuItem(badReq, res);
    await expect(results.toString()).toEqual(
      "TypeError: dbInstance.find is not a function"
    );
  });
});
