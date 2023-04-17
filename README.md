# Carrot Market

Geolocation based local market application. Users can post products with price and description. They can also upload posts and leave comments under posts. They can also create a live stream on the app getting RTMP url from our application. 

## Features

- Serverless Application using Prisma and PlanetScale 
- SMS/Email Authentication using Twilio, SendGrid
- Image Upload and Live Stream using CloudFlare
- Responsive UI design using Tailwind


## Get Started 

In order to use the full features, you need to create accounts in PlanetScale, Twilio, SendGrid, and CloudFlare. You need to store related keys and ids in your .env file. 

- When you make a change in your shcema.prisma. You must push the change to PlanetScale database. 

```
npx prisma db push
```

- You can access prisma generated web database editor. You can make and save changes here too. 

```
npx prisma studio 
```

- Install packages and run the project.

```
npm install
npm run dev
```
