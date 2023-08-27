import { createMovieTags } from "./list";
import { getMoveis } from "../api/movie";
import { createPagers } from "./pager";

async function init() {
  const resp = await getMoveis(1, 30);
  console.log("🚀  resp:", resp);
  createMovieTags(resp.data.movieList);
  createPagers(1, 30, resp.data.movieTotal);
}
init();
