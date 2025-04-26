import axiosClient from ".";

export function checkDiscount(code: any) {
  return axiosClient.get(`public/discount/${code}`);
}

export function getPriceReduce([payload]: any) {
  return axiosClient.post(`public/discount/price-reduce`, payload);
}
