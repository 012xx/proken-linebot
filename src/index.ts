import * as functions from "firebase-functions";
import * as line from "@line/bot-sdk";

interface Config {
  channelAccessToken: string;
  channelSecret: string;
}

const config: Config = {
  channelAccessToken: functions.config().line.channel_access_token,
  channelSecret: functions.config().line.channel_secret,
};
const client = new line.Client(config);

export const lineWebhook = functions
  .region("asia-northeast1")
  .https.onRequest((request, response) => {
    const signature = request.get("x-line-signature");

    if (
      !signature ||
      !line.validateSignature(request.rawBody, config.channelSecret, signature)
    )
      throw new line.SignatureValidationFailed(
        "signature validation failed",
        signature
      );

    Promise.all(request.body.events.map(lineEventHandler))
      .then((result) => response.json(result))
      .catch((error) => console.error(error));
  });

const lineEventHandler = (event: line.WebhookEvent) => {
  if (event.type !== "message") {
    console.log("event type is not message");
    return Promise.resolve(null);
  }
  try {
    if (event.message.type === "text") {
      // reply echo message
      const message: line.TextMessage = {
        type: "text",
        text: event.message.text,
      };
      return client.replyMessage(event.replyToken, message);
    } else {
      return Promise.resolve(null);
    }
  } catch (error) {
    console.error(JSON.stringify(error));
    return Promise.resolve(null);
  }
};
