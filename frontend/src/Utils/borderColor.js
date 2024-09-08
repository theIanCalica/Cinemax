export const getBorderColor = (fieldName, errors) => {
  if (errors[fieldName]) {
    return "border-red-500";
  }
  return "border-gray-200";
};
