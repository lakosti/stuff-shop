export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

export const buildUrl = (url, params) => {
  let urlParams = url;

  Object.entries(params).forEach(([key, value], i) => {
    const sign = !i ? "?" : "&";
    //на кожній ітереації додаємо знак + параментр і значення
    urlParams += `${sign}${key}=${value}`;
  });
  return urlParams;
};
