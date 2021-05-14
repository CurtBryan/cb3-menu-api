const { addMenuItem } = require("../../../controllers/menu/addMenuItem");
const { MongoClient } = require("mongodb");
const { connectToCollection } = require("../../../DB/connectToCollection");

describe("addMenuitem", () => {
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
      _id: "1234",
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
    body: {
      price: 1.99,
      name: "Coke",
      category: "app",
    },
  };

  const badReq = {
    app: {
      get: () => {
        return;
      },
    },
    body: {
      price: 1.99,
      name: "Coke",
      category: "app",
    },
  };

  const res = {
    send: jest.fn(),
    status: jest.fn(() => res),
  };

  it("should add menu item", async () => {
    const results = await addMenuItem(req, res);
    await expect(results.insertCount).toEqual(1);
  });

  it("should not add menu item", async () => {
    const results = await addMenuItem(badReq, res);
    await expect(results).toEqual(
      "TypeError: dbInstance.insertOne is not a function"
    );

    const dbInstance = await connectToCollection(
      connection,
      "note-pos",
      "items"
    );

    await dbInstance.drop();
  });
});
