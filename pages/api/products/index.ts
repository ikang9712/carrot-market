import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from '@/libs/server/withSession';


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
      body: {
          name,
          price,
          description
      },
      session: {
          user
      }
  } = req;
  const product = await client.product.create({
      data: {
          name,
          price: +price,
          description,
          image: "",
          user: {
              connect: {
                  id: user?.id
              }
          }
      }
  })
  res.json({
      ok:true,
      product
  })
}

export default withApiSession(withHandler({
  method: "POST",
  handler,
}));