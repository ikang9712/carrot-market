import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from '@/libs/server/withSession';


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {
        query: {id}
    } = req
    if (!id){
        // 404
        return;
    }
    const stream = await client.stream.findUnique({
        where: {
            id: +id!.toString()
        },
        include: {
            messages: {
                select: {
                    message: true,
                    id: true,
                    user: {
                        select: {
                            avatar: true,
                            id: true,
                        }
                    }
                }
            }
        }
    })
        res.json({
            ok:true,
            stream
        })
    }


export default withApiSession(withHandler({
  methods: ["GET"],
  handler,
}));