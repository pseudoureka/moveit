const BASE_URL = "https://learn.codeit.kr/1419/film-reviews";

export async function getReviews({ order = "createdAt", offset = 0, limit = 6 }) {
  const query = `?order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`${BASE_URL}${query}`);
  const body = response.json();
  if (!response.ok) {
    throw new Error("리뷰를 불러오는데 실패했습니다.");
  }
  return body;
}

export async function createReview(formData) {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    body: formData,
  });
  const body = response.json();
  if (!response.ok) {
    throw new Error("리뷰를 생성하는데 실패했습니다.");
  }
  return body;
}

export async function deleteReview(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  const body = response.json();
  if (!response.ok) {
    throw new Error("리뷰를 삭제하는데 실패했습니다.");
  }
  return body;
}
