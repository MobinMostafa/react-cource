// algoliaClient.js
// ✔ works with algoliasearch ^5.x
import {algoliasearch} from "algoliasearch/lite";

export const client = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_API_KEY
);
export const placesIndex = client.initIndex("places");


