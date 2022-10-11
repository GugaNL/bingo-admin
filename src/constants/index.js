//Server
export const baseURL = "http://localhost:5000/api/";
//const baseURL = "https://sorteio-nodejs.herokuapp.com/api/";

//Pages
export const PAGE_LIST_PRIZE_DRAW = '/sweepstakes';
export const PAGE_NEW_PRIZE_DRAW = '/register-sweepstake';
export const PAGE_LIST_CUSTOMER = '/lista-clientes';
export const PAGE_NEW_CUSTOMER = '/cliente';
export const PAGE_EDIT_TICKET = '/ticket';
export const PAGE_LOGIN = '/';

export const months = [
  { name: "Janeiro", value: 1 },
  { name: "Fevereiro", value: 2 },
  { name: "Março", value: 3 },
  { name: "Abril", value: 4 },
  { name: "Maio", value: 5 },
  { name: "Junho", value: 6 },
  { name: "Julho", value: 7 },
  { name: "Agosto", value: 8 },
  { name: "Setembro", value: 9 },
  { name: "Outubro", value: 10 },
  { name: "Novembro", value: 11 },
  { name: "Dezembro", value: 12 },
];

export const years = [
  { name: "2021", value: 2021 },
  { name: "2022", value: 2022 },
];

export const states = [
  { name: 'AC' },
  { name: 'AL' },
  { name: 'AP' },
  { name: 'AM' },
  { name: 'BA' },
  { name: 'CE' },
  { name: 'DF' },
  { name: 'ES' },
  { name: 'GO' },
  { name: 'MA' },
  { name: 'MT' },
  { name: 'MS' },
  { name: 'MG' },
  { name: 'PA' },
  { name: 'PB' },
  { name: 'PR' },
  { name: 'PE' },
  { name: 'PI' },
  { name: 'RJ' },
  { name: 'RN' },
  { name: 'RS' },
  { name: 'RO' },
  { name: 'RR' },
  { name: 'SC' },
  { name: 'SP' },
  { name: 'SE' },
  { name: 'TO' },
]

export const statusType = [
  { name: "livre", title: "Livre"},
  { name: "comprado", title: "Comprado"},
  { name: "reservado", title: "Reservado"},
  { name: "cancelado", title: "Cancelado"}
]

export const ImageTypeRegex = /image\/(png|jpg|jpeg)/gm;
