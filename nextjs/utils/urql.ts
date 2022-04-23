import {createClient} from "@urql/core";
import {SUBGRAPH_RINKEBY} from "../constants/api.const";

export const urqlClient = createClient({
  url: SUBGRAPH_RINKEBY
})