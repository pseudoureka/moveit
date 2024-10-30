export async function getReviews({ order = "createdAt", offset = 6, limit = 6 }) {
  const query = `?order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`https://learn.codeit.kr/1489/film-reviews${query}`);
  const body = response.json();
  return body;
}
