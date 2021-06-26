const generateUniqueId = require("../../src/utils/generateUniqueId")

describe("Generate Unique ID", () =>{
  it("Should generte an unique id", async() =>{
    const id = generateUniqueId()
    await expect(id).toHaveLength(18)
  })
});