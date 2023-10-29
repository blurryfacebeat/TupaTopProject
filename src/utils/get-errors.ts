export const getEntityNotFoundError = (
  entity: string,
  field: string = 'uuid',
) => {
  return `${entity} with this ${field} is not found`;
};

export const getEntityAlreadyExistsError = (
  entity: string,
  field: string = 'name',
) => {
  return `${entity} with this ${field} is already exists`;
};
