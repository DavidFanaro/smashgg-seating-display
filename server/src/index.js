const app = require("express")();
const server = require("http").createServer(app);
const socket = require("socket.io")(server, {cors: {
  origin: ["http://localhost:3000","tourneyseatdisplay.surge.sh"],
  methods: ["GET", "POST"]
}});
var _ = require("lodash");
const { GraphQLClient, gql } = require("graphql-request");

app.get("/", async (req, res) => {
  res.send("Hello World");
});

socket.on("connection", (ws) => {
  console.log(ws.id)

  ws.on("tourneydata", async (url) => {
    let lastReq;
    async function request (){
      const data = await getSeating(url);
      if (lastReq === null || !_.isEqual(lastReq, data)) {
        lastReq = data;
        console.log("sent request");
        ws.emit("tourneydata", data);
      }
    }
    
    request()
    setInterval(async () => request(), 200000);
  });
  socket.on("disconnect", (d) =>{
    console.log(d.id)
  })
});





async function getSeating(tourney) {
  const endpoint = "https://api.smash.gg/gql/alpha";

  const client = new GraphQLClient(endpoint);
  client.setHeader("authorization", `Bearer ${process.env["KEY"]}`);

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
              stream {
                enabled
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
  try {
    const data = await client.request(query, variables);
    return data;
    
  } catch (error) {
    console.log("Error")
  }
}
server.listen(4000);