const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const [count] = await connection("incidents").count();
    const ong_id = request.headers.authorization
    const incidents = await connection("incidents", ong_id)
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
