import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '2c12cadd3b904830fe0a86c339e959f0baa76956', queries,  });
export default client;
  