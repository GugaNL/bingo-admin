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
export const createCustomer = async (customer) => {
  const response = await api.post("cliente/novo", {
    nome: customer.nome,
    sobrenome: customer.sobrenome,
    cpf: customer.cpf,
    email: customer.email,
    senha: customer.senha,
    endereco: customer.endereco,
    numeroEndereco: customer.numeroEndereco,
    bairro: customer.bairro,
    cidade: customer.cidade,
    uf: customer.uf,
    cep: customer.cep,
  });

  return response;
};

export const listCustomers = async () => {
  try {
    const response = await api.get("cliente/lista");
    return response;
  } catch (error) {
    return error;
  }
}

export const findCustomer = async (id) => {
  try {
    const response = await api.get(`cliente/${id}`);
    return response;
  } catch (error) {
    return error;
  }
}

export const updateCustomer = async (customer = {}) => {
  try {
    const response = await api.put(`cliente/${customer.id}`, {
      nome: customer.nome,
      sobrenome: customer.sobrenome,
      email: customer.email,
      senha: customer.senha,
      endereco: customer.endereco,
      numeroEndereco: customer.numeroEndereco,
      bairro: customer.bairro,
      cidade: customer.cidade,
      uf: customer.uf,
      cep: customer.cep,
    });
    return response;
  } catch (error) {
    return error;
  }
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

//Bilhete
export const listTicketsWhere = async (sorteioId, status = null, page = 1, limit = 2) => {
  const payload = { sorteioId: sorteioId };
  if (status) {
    payload.status = status;
  }
  try {
    const response = await api.get(`bilhete/listaWhere?page=${page}&limit=${limit}`, { params: payload });
    return response;
  } catch (error) {
    return error;
  }
};

export const findTicket = async (findByNumber, sorteioId) => {
  try {
    const response = await api.get(`bilhete/busca/${findByNumber}?sorteioId=${sorteioId}`);
    return response;
  } catch (error) {
    return error;
  }
};