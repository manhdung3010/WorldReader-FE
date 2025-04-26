import axiosClient from ".";

export function getProductRecommend(params: { product_id: any; k: number }) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  );

  return axiosClient.get("ai/recommend", { params: filteredParams });
}

export function getRecommendFavorites(payload: any) {
  return axiosClient.post(`ai/recommend/favorites`, payload);
}

export function askChatBot(payload: any) {
  return axiosClient.post(`ai/chatbot/chat`, payload);
}

