import http from "http";
export async function sendRequest(
  host: string,
  port: number,
  path: string,
  method: string,
  body: any
) {
  try {
    return new Promise((resolve, reject) => {
      const options = {
        method: method,
        host: host,
        port: port,
        path: path,
        headers: {
          "content-type": "application/json",
        },
      };
      const req = http.request(options, (res) => {
        const data: any[] = [];
        res.on("data", (chunk) => {
          data.push(chunk);
        });
        res.on("end", () => {
          try {
            const responseString = Buffer.concat(data).toString();
            return resolve(JSON.parse(responseString));
          } catch (error) {
            return reject("Error occurred");
          }
        });
      });
      req.on("error", (error) => {
        console.log(error);
        reject(error);
      });
      const stringBody = JSON.stringify(body);
      const bufferBody = Buffer.from(stringBody, "utf-8");
      const encodedBody = bufferBody.toString("base64");
      req.write(encodedBody);
      req.end();
    });
  } catch (error) {
    console.log(error);
  }
}
const body = { message: "hi, from client - ranadeep" };
(async () => {
  console.log(
    await sendRequest("localhost", 8001, "/server/receive", "POST", body)
  );
})();
