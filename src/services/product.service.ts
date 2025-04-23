import axiosClient from ".";

export function getProduct(params: {
  name: string;
  code: string;
  priceMin: string;
  priceMax: string;
  status: string | null;
  isDiscount: boolean | null;
  display: boolean | null;
  categories: any | null;
  page: number;
  pageSize: number;
}) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  );

  return axiosClient.get("public/products", { params: filteredParams });
}

export function getProductByExpert(size: any) {
  return axiosClient.get(`public/products/random-chosen-by-experts/${size}`);
}


export function getDetailProduct(id: any) {
  return axiosClient.get(`public/products/${id}`);
}

export function getDetailProductByUrl(url: any) {
  return axiosClient.get(`public/products/findByUrl/${url}`);
}

export function getProductFlashSale() {
  return axiosClient.get(`public/products/flash-sale`);
}

export function getProductByKeyword({ keywordCode, params }: any) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== null)
  );

  return axiosClient.get(`public/products/findByKeyword/${keywordCode}`, {
    params: filteredParams,
  });
}

export function getProductByCategory({ urlCategory, params }: any) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== null)
  );

  return axiosClient.get(`public/products/findByCategory/${urlCategory}`, {
    params: filteredParams,
  });
}

export function getReviewProduct(id: any, params: any) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== null)
  );

  return axiosClient.get(`public/reviews-product/findByProductId/${id}`, {
    params: filteredParams,
  });
}

export function createReviewProduct(payload: any) {
  return axiosClient.post(`public/reviews-product`, payload);
}
