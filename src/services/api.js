import axios from "axios";
import { baseURL } from "../constants";

// var config = {
//   headers: { "Access-Control-Allow-Origin": "*" },
// };

export const api = axios.create({
  baseURL,
});

const token = localStorage.getItem("@sorteio-admin:token");

//Cliente
export const createCustomer = async (customer) => {
  try {
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
  } catch (error) {
    const { response: { data = [] } = "" } = error;
    return data[0];
  }
};

export const listCustomers = async () => {
  try {
    const response = await api.get("cliente/lista", {
      headers: {
        token,
      },
    });
    return response;
  } catch (error) {
    const { response: { data = [], status = "" } = "" } = error;
    if (status === 401) {
      return status;
    }
    return data[0];
  }
};

export const findCustomer = async (id) => {
  try {
    const response = await api.get(`cliente/${id}`);
    return response;
  } catch (error) {
    const { response: { data = [] } = "" } = error;
    return data[0];
  }
};

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
    const { response: { data = [] } = "" } = error;
    return data[0];
  }
};

//Sorteio
export const newPrizeDraw = async (prizeDraw = {}) => {
  const { sorteioImages = [] } = prizeDraw;
  const formData = new FormData();

  formData.append("titulo", prizeDraw.titulo);
  formData.append("descricao", prizeDraw.descricao);
  formData.append("data", prizeDraw.data);
  formData.append("premio", prizeDraw.premio);
  formData.append("totalBilhetes", prizeDraw.totalBilhetes);
  formData.append("valorBilhete", prizeDraw.valorBilhete);

  if (sorteioImages.length > 0) {
    for (let i = 0; i < sorteioImages.length; i++) {
      formData.append("sorteioImage", sorteioImages[i]);
    }
  }

  try {
    const response = await api.post("sorteio/novo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token,
      },
    });

    return response;
  } catch (error) {
    const { response: { data = [], status = "" } = "" } = error;
    if (status === 401) {
      return status;
    }
    return data[0];
  }
};

export const listPrizeDraws = async () => {
  try {
    const response = await api.get("sorteio/lista");
    return response;
  } catch (error) {
    const { response: { data = [] } = "" } = error;
    return data[0];
  }
};

export const findPrizeDraw = async (id) => {
  try {
    const response = await api.get(`sorteio/${id}`);
    return response;
  } catch (error) {
    const { response: { data = [] } = "" } = error;
    return data[0];
  }
};

export const updatePrizeDraw = async (prizeDraw = {}) => {
  const { sorteioImages = [] } = prizeDraw;
  const formData = new FormData();

  formData.append("titulo", prizeDraw.titulo);
  formData.append("descricao", prizeDraw.descricao);
  formData.append("data", prizeDraw.data);
  formData.append("premio", prizeDraw.premio);
  formData.append("totalBilhetes", prizeDraw.totalBilhetes);
  formData.append("valorBilhete", prizeDraw.valorBilhete);

  if (sorteioImages.length > 0) {
    for (let i = 0; i < sorteioImages.length; i++) {
      formData.append("sorteioImage", sorteioImages[i]);
    }
  }

  try {
    const response = await api.put(`sorteio/${prizeDraw.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token,
      },
    });

    return response;
  } catch (error) {
    const { response: { data = [], status = "" } = "" } = error;
    if (status === 401) {
      return status;
    }
    return data[0];
  }
};

export const updateImages = async (images = [], sorteioId) => {
  const response = await api.post(`imagem/${sorteioId}`, images, {
    headers: {
      token,
    },
  });

  return response;
};

//Bilhete
export const listTicketsWhere = async (
  sorteioId,
  status = null,
  page = 1,
  limit = 2
) => {
  const payload = { sorteioId: sorteioId };
  if (status) {
    payload.status = status;
  }
  try {
    const response = await api.get(
      `bilhete/listaWhere?page=${page}&limit=${limit}`,
      { params: payload }
    );
    return response;
  } catch (error) {
    const { response: { data = [] } = "" } = error;
    return data[0];
  }
};

export const findTicket = async (findByNumber, sorteioId) => {
  try {
    const response = await api.get(
      `bilhete/busca/${findByNumber}?sorteioId=${sorteioId}`
    );
    return response;
  } catch (error) {
    const { response: { data = [] } = "" } = error;
    return data[0];
  }
};

export const updateTicket = async (ticket = {}) => {
  try {
    const response = await api.put(
      `bilhete/${ticket.id}`,
      {
        status: ticket.status,
        comprador: ticket.comprador,
      },
      {
        headers: {
          token,
        },
      }
    );
    return response;
  } catch (error) {
    const { response: { data = [], status = "" } = "" } = error;
    if (status === 401) {
      return status;
    }
    return data[0];
  }
};

export const removeTicket = async (ticketId) => {
  try {
    const response = await api.delete(`bilhete/${ticketId}`, {
      headers: {
        token,
      },
    });
    return response;
  } catch (error) {
    const { response: { data = [], status = "" } = "" } = error;
    if (status === 401) {
      return status;
    }
    return data[0];
  }
};

//Usuário
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("usuario/login", {
      login: email,
      senha: password,
    });
    return response;
  } catch (error) {
    const { response: { data = [] } = "" } = error;
    return data[0];
  }
};
