import swaggerAutogen from "swagger-autogen"
import m2s from "mongoose-to-swagger";
import { Usuario } from "./models/Usuario.js";
import { Tarefa } from "./models/Tarefa.js";

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/routes.js']

const doc = {
    info: {
      version: '',      // by default: '1.0.0'
      title: '',        // by default: 'REST API'
      description: '',  // by default: ''
    },
    host: '',      // by default: 'localhost:3000'
    basePath: '',  // by default: '/'
    schemes: [],   // by default: ['http']
    consumes: [],  // by default: ['application/json']
    produces: [],  // by default: ['application/json']
    tags: [        // by default: empty Array
      {
        name: '',         // Tag name
        description: '',  // Tag description
      },
      // { ... }
    ],
    securityDefinitions: {},  // by default: empty object
    definitions: {},          // by default: empty object (Swagger 2.0)
    components: {
        schemas: {},
    }            // by default: empty object (OpenAPI 3.x)
  };


const swaggerSchemaUsuario = m2s(Usuario);
const swaggerSchemaTarefa = m2s(Tarefa);
console.log(swaggerSchemaTarefa);

doc.components.schemas.Tarefa = swaggerSchemaTarefa
doc.components.schemas.Usuario = swaggerSchemaUsuario

swaggerAutogen(outputFile, endpointsFiles, doc)