import axiosClient from ".";

export function checkDiscount(code: string) {
  const trimmedCode = code.replace(/\s+/g, "");
  return axiosClient.get(`public/discount/${trimmedCode}`);
}

export function getPriceReduce([payload]: any) {
  if (payload.code) {
    payload.code = payload.code.replace(/\s+/g, "");
  }
  return axiosClient.post(`public/discount/price-reduce`, payload);
}
