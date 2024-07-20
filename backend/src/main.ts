import { httpServer } from "./app";

const start = (port: number) => {
  try {
    httpServer.listen(port, () => {
      console.log(`Api running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

start(3333);
