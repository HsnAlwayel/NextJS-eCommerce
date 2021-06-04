import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema";
import { createAuth } from "@keystone-next/auth";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";
import { User } from "./schemas/User";
import { Product } from "./schemas/Product";
import { ProductImage } from "./schemas/ProductImage";
import { insertSeedData } from "./seed-data/index";
const databaseURL = process.env.DATABASE_URL || "mongodb://localhost/keystone";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, //how long users stay signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    //Admin User which is the first user
    fields: ["name", "email", "password"],
    //TODO: ad initial values
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: "mongoose",
      url: databaseURL,
      async onConnect(keystone) {
        console.log("Connected to DataBase!!!");
        if (process.argv.includes("--seed-data"))
          await insertSeedData(keystone);
      },
    },
    lists: createSchema({
      //KeyStone refers to data as list ex:list of items
      User,
      Product,
      ProductImage,
    }),
    ui: {
      //show UI only for ppl who pass this test
      isAccessAllowed: ({ session }) => {
        return session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: `id name email`,
      Product: `name`,
    }),
    //TODO:add session values HERE!
  })
);
