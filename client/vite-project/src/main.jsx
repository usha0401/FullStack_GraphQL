import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ApolloClient, InMemoryCache, HttpLink,} from "@apollo/client";

import { ApolloProvider } from "@apollo/client/react";

// Apollo Client (v4 requires explicit link)
const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql-backend-8njz.onrender.com/",
  }),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
