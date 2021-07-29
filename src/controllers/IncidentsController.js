const connection = require("../database/connection"); 

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;
        const [count] = await connection("incidents").count();

        const incidents = await connection("incidents")
            .join("ongs", "ong_id", "=", "incidents.ong_id")
            .limit(6)
            .offset((page -1) * 6)
            .select([
                "incidents.*", 
                "ongs.name", 
                "ongs.email", 
                "ongs.whatsapp", 
                "ongs.city", 
                "ongs.uf"
            ]);
        response.header('X-Total-Count', count['count(*)']);
        return response.json( incidents );
    },

    async update(request, response){
        const id = request.params;
        // const ongId = request.headers;
        const { title, description, value } = request.body;
        
        const result = await connection("incidents")
        .where("id", id)
        .update({
            title: title, 
            description: description, 
            value: value,
        });

        if (!result) {
            return response.status(400)
        }
        return response.json("Atualização realizada com sucesso!")
    },

    async create(request, response){
        const {title, description, value} = request.body;
        // const ong_id = request.headers.authorization;
        // if (ong_id) {
        //     return false;
        // }
        const [ id ] = await connection("incidents").insert({
            title,
            description,
            value,
            ong_id 
        })
        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection("incidents")
            .where("id", id).select("ong_id").first(); 
            
        if (incident.ong_id !== ong_id) {
            return response.status(401).json({error: "Operation not peritted"});
        } 

        if (!incident) {
            return response.status(200).json({error: "No item"});
        }

        await connection("incidents").where("id", id).delete();
        return response.status(204).send();
    }
};