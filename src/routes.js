const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const IncidentsController = require("./controllers/IncidentsController");
const OngController = require("./controllers/OngController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");
const AllIncidents = require("./controllers/AllIncidents");

const routes = express.Router();

/**
 * Login
 */
routes.post("/session", celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
}), SessionController.create);

/**
 * ONGS
 */

/**Retorna todas as ONGS cadastradas */
routes.get("/ongs", OngController.index);

/**Cria uma ONG */
routes.post("/ongs", celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(9).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().max(2)
  })
}
), OngController.create);

/**Lista todos os incidents de uma ONG especifica */
routes.get("/profile", celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), ProfileController.index);

/**
 * INCIDENTS
 */

/**Pegar os incidents todos */
routes.get("/incidents", celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), IncidentsController.index);

/**Cria um incident */
routes.post("/incidents",celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), IncidentsController.create);

/**Deleta um incident */
routes.delete("/incidents/:id", celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), IncidentsController.delete);

/**Seleciona um incident pelo id informado  */
routes.get("/incidents/:id", celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), ProfileController.findOne);

/**Atualiza um incident */
routes.put("/incidents/edit:id",celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), IncidentsController.update);

/**Pega todos os incidents */
routes.get("/all", AllIncidents.index);

module.exports = routes; 