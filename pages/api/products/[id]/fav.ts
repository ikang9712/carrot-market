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
        session: {user}
    } = req
    const exists = await client.favorite.findFirst({
    
        where: {
            productId: +id!.toString(),
            userId: user?.id,
        }
    })
    if (exists){
        // delete all
        // await client.fav.deleteMany({ whehre: { userId:user.id}})
        await client.favorite.delete({
            where: {
                id: exists.id
            }
        })
    } else {
        //create
        await client.favorite.create({
            data: {
                user: {
                    connect: {
                        id: user?.id
                    }
                },
                product: {
                    connect: {
                        id: +id!.toString()
                    }
                }
            }
        })
    }
    res.json({ok:true})
}

export default withApiSession(withHandler({
  methods: ["POST"],
  handler,
}));