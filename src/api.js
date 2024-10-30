export async function getReviews({ order = "createdAt", offset = 0, limit = 6 }) {
  const query = `?order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`https://learn.codeit.kr/1489/film-reviews${query}`);
  const body = response.json();
  if (!response.ok) {
    throw new Error("리뷰를 불러오는데 실패했습니다.");
  }
  return body;
}
