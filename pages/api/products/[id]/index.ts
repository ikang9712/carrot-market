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
    
    if (!id){
        res.json({
            ok: false
        })
    }
    const product = await client.product.findUnique({
        where: {
            id: +id!.toString(),
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true
                }
            }
        }
    })
    const terms = product?.name.split(" ").map(word => ({
        name: {
            contains: word,
        }
    }))
    const relatedProducts = await client.product.findMany({
        where: {
            OR: terms,
            AND: {
                id: {
                    not: product?.id,
                }
            }
        }

    })

    const isLiked = await client.favorite.findFirst({
        where: {
            productId: product?.id,
            userId: user?.id,
        }
    })
    
    res.json({
        ok:true,
        product,
        isLiked,
        relatedProducts
    })
}

export default withApiSession(withHandler({
  methods: ["GET"],
  handler,
}));