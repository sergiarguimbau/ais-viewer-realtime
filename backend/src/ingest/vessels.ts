import WebSocket from "ws";

import { upsertVessel } from "../db/vessels";
import { type AISMessage, aisMessageSchema } from "../schemas";

function positionReportToVesselData(msg: AISMessage) {
  const parsed = aisMessageSchema.parse(msg);

  return {
    mmsi: parsed.Message.PositionReport.UserID,
    position: [
      parsed.Message.PositionReport.Longitude,
      parsed.Message.PositionReport.Latitude,
    ] as [number, number],
    heading: parsed.Message.PositionReport.TrueHeading,
    updated_at: new Date(),
  };
}

export function ingestVesselsData() {
  const API_KEY = process.env.AIS_API_KEY;
  if (!API_KEY) throw new Error("AIS_API_KEY is not set in environment");

  let ws: WebSocket | null = null;
  let vesselCountPerSecond = 0;

  setInterval(() => {
    console.log(
      `[AIS Ingest] (${new Date().toISOString()}) -  Vessels per second: ${vesselCountPerSecond}`
    );
    vesselCountPerSecond = 0; // Reset every second
  }, 1000);

  function connect() {
    ws = new WebSocket("wss://stream.aisstream.io/v0/stream");

    ws.on("open", () => {
      const subscriptionMessage = {
        Apikey: API_KEY,
        BoundingBoxes: [
          [
            [-90, -180],
            [90, 180],
          ],
        ],
        FilterMessageTypes: ["PositionReport"],
      };
      ws?.send(JSON.stringify(subscriptionMessage));
      console.log(
        `[AIS Ingest] (${new Date().toISOString()}) - WebSocket connected and subscription sent`
      );
    });

    ws.on("message", async (data) => {
      try {
        const msg: AISMessage = JSON.parse(data.toString());
        if (msg.MessageType !== "PositionReport") return;

        const vessel = positionReportToVesselData(msg);

        await upsertVessel(vessel);
        vesselCountPerSecond++;
      } catch (err) {
        console.error(
          `[AIS Ingest] (${new Date().toISOString()}) - AIS message error:`,
          err
        );
      }
    });

    ws.on("close", () => {
      console.warn(
        `[AIS Ingest] (${new Date().toISOString()}) - WebSocket closed, trying to reconnect...`
      );
      connect();
    });

    ws.on("error", (err) => {
      console.error(
        `[AIS Ingest] (${new Date().toISOString()}) - WebSocket error:`,
        err
      );
      ws?.close();
    });
  }

  connect();

  process.on("SIGINT", () => {
    console.log(
      `[AIS Ingest] (${new Date().toISOString()}) - Shutting down Vessels ingestion...`
    );
    ws?.close();
    process.exit(0);
  });
}
