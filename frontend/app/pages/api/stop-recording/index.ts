import type { NextApiRequest, NextApiResponse } from "next";
import { Recorder } from "@huddle01/server-sdk/recorder";
import axios from "axios";

interface Recordings {
  id: string;
  recordingUrl: string;
  recordingSize: number;
}
const { NEXT_PUBLIC_HUDDLE_PROJECT_ID, HUDDLE_API_KEY } = process.env;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { roomId } = req.query;

  //checking for project credentials
  if (!NEXT_PUBLIC_HUDDLE_PROJECT_ID && !HUDDLE_API_KEY) {
    return res
      .status(400)
      .json({ error: "NEXT_PUBLIC_PROJECT_ID and API_KEY are required" });
  }

  //creating the Recorder class instance
  const recorder = new Recorder(
    NEXT_PUBLIC_HUDDLE_PROJECT_ID!,
    HUDDLE_API_KEY!
  );

  //stopping the recording
  const recording = await recorder.stop({
    roomId: roomId as string,
  });

  console.log("recording", recording);

  const { msg } = recording;

  if (msg === "Stopped") {
    //fetching the recording
    const response = await axios(
      "https://api.huddle01.com/api/v1/get-recordings",
      {
        headers: {
          "x-api-key": HUDDLE_API_KEY!,
        },
      }
    );
    const data = await response.data;

    const { recordings } = data as { recordings: Recordings[] };

    //return the most recent recording from the list
    return res.status(200).json({ recording: recordings[0] });
  }

  return res.status(200).json({ recording });
}
