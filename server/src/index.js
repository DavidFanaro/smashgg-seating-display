const app = require("express")();
const server = require("http").createServer(app);
const socket = require("socket.io")(server);
var _ = require("lodash");
const { GraphQLClient, gql } = require("graphql-request");

app.get("/", async (req, res) => {
  res.send("Hello World");
});

socket.on("connection", (ws) => {
  let lastReq;

  ws.on("tourneydata", async (url) => {
    async function request (){
      const data = await getSeating(url);
      if (lastReq === null || _.isEqual(lastReq, data)) {
        lastReq = data;
        console.log("sent request");
        ws.emit("tourneydata", JSON.stringify(data));
      }
    }
    request()
    setInterval(async () => request(), 30000);
  });
});

server.listen(4000);

async function getSeating(tourney) {
  const endpoint = "https://api.smash.gg/gql/alpha";

  const client = new GraphQLClient(endpoint);
  client.setHeader("authorization", "Bearer ");

  const query = gql`
    query getseating($tourneyslug: String!) {
      tournament(slug: $tourneyslug) {
        name
        city
        events {
          videogame {
            name
          }
          sets {
            nodes {
              fullRoundText
              slots {
                entrant {
                  name
                }
              }
              station {
                number
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    tourneyslug: tourney,
  };

  // Overrides the clients headers with the passed values
  const data = await client.request(query, variables);
  return data;
}
