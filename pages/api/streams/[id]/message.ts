import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from '@/libs/server/withSession';


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {
        query: {id},
        body,
        session: {user}
    } = req
    if (!id){
        console.log("id not found")
        return
    }
    const stream = await client.stream.findFirst({
        where: {
            id: +id!.toString()
        }
    })
    if (!stream) return;
    const message = await client.message.create({
        data: {
            message: body.message,
            stream: {
                connect: {
                    id: +id!.toString()
                }
            },
            user: {
                connect: {
                    id: user?.id
                }
            }
        }
    })
        res.json({
            ok:true,
            message
        })
    }


export default withApiSession(withHandler({
  methods: ["POST"],
  handler,
}));