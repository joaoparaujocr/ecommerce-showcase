export const formatNumberToReal = (value: number) => {
  const Real = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return Real.format(value)
}