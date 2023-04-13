import client from "@/libs/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    await client.user.create({
        data:{
            email: "test1@test.com",
            name: "test1"
        }
    })
    res.json({
        ok:true,
    })
}