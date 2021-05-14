const { getMenuItems } = require("../../../controllers/menu/getMenuItems");
const { MongoClient } = require("mongodb");
const { connectToCollection } = require("../../../DB/connectToCollection");

describe("getMenuItems", () => {
  let connection;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
  };

  const badReq = {
    app: {
      get: () => {
        return;
      },
    },
  };

  const res = {
    send: jest.fn(),
    status: jest.fn(() => res),
  };

  it("should get menu items", async () => {
    const results = await getMenuItems(req, res);
    await expect(results.length).toEqual(0);
  });

  it("should not get menu items", async () => {
    const results = await getMenuItems(badReq, res);
    await expect(results).toEqual(
        "TypeError: dbInstance.find is not a function"
    );
  });
});
