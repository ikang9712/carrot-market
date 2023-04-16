import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  // bring all stream data
  const stream = await client.stream.findUnique({
    where: {
      id: +id!.toString(),
    },
    include: {
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              avatar: true,
              id: true,
            },
          },
        },
      },
    },
  });
  const isOwner = stream?.userId === user?.id;
  // mask key, url if not owner
  if (stream && !isOwner) {
    stream.cloudflareKey = "xxxxx";
    stream.cloudflareUrl = "xxxxx";
  }
  res.json({ ok: true, stream });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);