import {PrismaClient} from "@prisma/client"


const client = new PrismaClient();

async function main() {
    [...Array.from(Array(200).keys())].forEach(async(item) => {
        const stream = await client.stream.create({
            data: {
                name: String(item),
                description: String(item),
                price: item,
                user: {
                    connect: {
                        id: 11
                    }
                }
            }
        })
    })    
}
main()
.catch((e) => console.log(e))
.finally(() => client.$disconnect)