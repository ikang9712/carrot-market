import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from '@/libs/server/withSession';


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;

  const postExists = await client.post.findFirst({
      where: {
          id: +id!.toString()
        },
        select: {
            id: true
        }
    })

    if (!postExists){
        // 404 not found error implementation needed 
        console.log("This post does not exist.")
        res.json({
            ok: false,
        })
        return
    }

  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id!.toString(),
        },
      },
      answer,
    },
  });
  console.log(newAnswer);
  res.json({
    ok: true,
    answer: newAnswer,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);