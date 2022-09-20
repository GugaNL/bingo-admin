import axios from "axios";

//const baseURL = "https://sorteio-nodejs.herokuapp.com/api/";
const baseURL = "http://localhost:5000/api/";

// var config = {
//   headers: { "Access-Control-Allow-Origin": "*" },
// };

export const api = axios.create({
  baseURL,
});

//Cliente
export const newClient = async (client) => {
  const response = await api.post("cliente/novo", {
    nome: client.nome,
    sobrenome: client.sobrenome,
    cpf: client.cpf,
    email: client.email,
    senha: client.senha,
    endereco: client.endereco,
    numeroEndereco: client.numeroEndereco,
    bairro: client.bairro,
    cidade: client.cidade,
    uf: client.uf,
    cep: client.cep,
  });

  return response;
};

//Sorteio
export const newPrizeDraw = async (prizeDraw = {}) => {
  try {
    const response = await api.post("sorteio/novo", {
      titulo: prizeDraw.titulo || "",
      descricao: prizeDraw.descricao || "",
      data: prizeDraw.data,
      premio: prizeDraw.premio || "",
      totalBilhetes: prizeDraw.totalBilhetes || 0,
      valorBilhete: prizeDraw.valorBilhete || 0,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const listPrizeDraws = async () => {
  try {
    const response = await api.get("sorteio/lista");
    return response;
  } catch (error) {
    return error;
  }
};

export const findPrizeDraw = async (id) => {
  try {
    const response = await api.get(`sorteio/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const updatePrizeDraw = async (prizeDraw = {}) => {
  try {
    const response = await api.put(`sorteio/${prizeDraw.id}`, {
      titulo: prizeDraw.titulo || "",
      descricao: prizeDraw.descricao || "",
      data: prizeDraw.data,
      premio: prizeDraw.premio || "",
      totalBilhetes: prizeDraw.totalBilhetes || 0,
      valorBilhete: prizeDraw.valorBilhete || 0,
    });
    return response;
  } catch (error) {
    return error;
  }
};
