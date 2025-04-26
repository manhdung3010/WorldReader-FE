import axiosClient from ".";

export function createOrder(payload: any) {
  return axiosClient.post(`public/orders`, payload);
}

export function getOrderByUser(params: any) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== "")
  );

  return axiosClient.get(`public/orders/byUser`, { params: filteredParams });
}
