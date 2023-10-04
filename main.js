const fullDataRoles = require("./roles.json");
const AWS = require("aws-sdk");
AWS.config.update({ region: "region" });
const dynamodb = new AWS.DynamoDB();
const horaEjecucion = Date.now();
const meterDatos = (roleId, cuit, userId) => {
  return new Promise((resolve, reject) => {
    dynamodb.putItem(
      {
        TableName: "nombre de tabla",
        Item: {
         // metan su objeto de esta manera
         // dato: { tipodedato ( S ,N ,O ) : valor }
        },
      },
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      }
    );
  });
};

const operar = async () => {
  try {
    const dataAdecuada = fullDataRoles.map((item) => ({
      cuit: item.cuit.S,
      roleId: item.roleId.S,
      userId: item.userId.S,
    }));

    const resultados = dataAdecuada.map((item) => {
      return meterDatos(item.roleId, item.cuit, item.userId);
    });

    const response = await Promise.all(resultados);
    return "Se insertaron los datos";
  } catch (error) {
    throw new Error("ocurrio un error:" + error.code);
  }
};

operar().then(console.log).catch(console.error);
