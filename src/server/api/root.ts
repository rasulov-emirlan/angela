import { createTRPCRouter } from "angela/server/api/trpc";
import { exampleRouter } from "angela/server/api/routers/example";
import { leaderboardRouter } from "./routers/leaderboard";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  leaderboard: leaderboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
