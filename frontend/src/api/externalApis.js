import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;

export async function fetchPhotos(query, page = 1, per_page = 10) {
  const res = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query, page, per_page },
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
  });

  const result = res.data.results.map((item) => ({
    id: item.id,
    title: item.alt_description || "photo",
    type: "photo",
    thumbnail: item.urls.small,
    src: item.urls.full,
  }));
  console.log(result);
  return result;
}
