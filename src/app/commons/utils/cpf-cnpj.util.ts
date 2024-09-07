export const validateIsCpfOrCnpj = (document: string): boolean => {
  const isValid = cnpjValidation(document) || cpfValidation(document);

  return isValid;
};

export const formatCpfOrCnpj = (cpfOrCnpj: string) => {
  let document = cpfOrCnpj.replace(/[^\d]+/g, '');

  if (document.length === 11) {
    document = document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  if (document.length === 14) {
    document = document.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  }

  return document;
};

const cpfValidation = (document: string) => {
  const cpf = document.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  const cpfA = cpf.split('').map((el) => +el);
  const rest = (count: number) =>
    ((cpfA
      .slice(0, count - 12)
      .reduce((soma, el, index) => soma + el * (count - index), 0) *
      10) %
      11) %
    10;
  const isValid = rest(10) === cpfA[9] && rest(11) === cpfA[10];

  return isValid;
};

const cnpjValidation = (document: string) => {
  const cnpj = document.replace(/[^\d]+/g, '');
  let result: number;

  if (cnpj.length !== 14 || !!cnpj.match(/(\d)\1{13}/)) return false;

  let length = cnpj.length - 2;
  let nums = cnpj.substring(0, length);
  const digits = cnpj.substring(length);

  let sum = 0;
  let position = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += Number(nums.charAt(length - i)) * position--;
    if (position < 2) {
      position = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result !== Number(digits.charAt(0))) {
    return false;
  }

  length += 1;
  nums = cnpj.substring(0, length);
  sum = 0;
  position = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += Number(nums.charAt(length - i)) * position--;
    if (position < 2) {
      position = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result !== Number(digits.charAt(1))) {
    return false;
  }

  return true;
};
