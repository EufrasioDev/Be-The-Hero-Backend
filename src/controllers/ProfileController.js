const connection = require("../database/connection"); 

module.exports = {

    async index(request, response){
        const ong_id = request.headers.authorization;

        const incidents = await connection("incidents")
        .where("ong_id", ong_id)
        .select("*");

        return response.json(incidents);
    },

    async findOne(request, response){
        const { id } = request.params;
        const incident = await connection("incidents")
            .join("ongs", "ong_id", "=", "incidents.ong_id")
            .select([
                "incidents.*", 
                "ongs.name", 
                "ongs.email", 
                "ongs.whatsapp", 
                "ongs.city", 
                "ongs.uf"
            ]);
        const result = incident.filter((element) => {
            return element.id == id
        });

        return response.json( result );
    }
}