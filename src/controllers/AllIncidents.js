const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const [count] = await connection("incidents").count();
    const incidents = await connection("incidents")
      .join("ongs")
      .select([
        "incidents.id",
        "incidents.title", 
        "incidents.value",
        "ongs.name", 
    ]);
    response.header('X-Total-Count', count['count(*)']);
    return response.json( incidents );
  }
}
