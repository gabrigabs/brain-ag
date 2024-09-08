import { validateIsCpfOrCnpj } from '../../../src/app/commons/utils/cpf-cnpj.util';

describe('validateIsCpfOrCnpj', () => {
  it('should return true for a valid CPF', () => {
    expect(validateIsCpfOrCnpj('910.249.550-36')).toBe(true);
  });

  it('should return true for a valid CNPJ', () => {
    expect(validateIsCpfOrCnpj('59.988.144/0001-40')).toBe(true);
  });

  it('should return false for an invalid CNPJ', () => {
    expect(validateIsCpfOrCnpj('59.988.144/0001-00')).toBe(false);
  });
});
