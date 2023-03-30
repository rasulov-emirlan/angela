import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "angela/server/api/trpc";

export const leaderboardRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.character.findMany();
  }),
  paginate: publicProcedure
    .input(
      z.object({
        page: z.number().min(0),
        pageSize: z.number().min(0),
      })
    )
    .query(async ({ input, ctx }) => {
      // when getting characters compute an arithmetic median according to the votes of a character
      const res = await ctx.prisma.character.findMany({
        skip: input.page * input.pageSize,
        take: input.pageSize,
        include: {
          votes: true,
        },
      });

      // sort by median value
      res.sort((a, b) => {
        const medianA =
          a.votes.reduce((acc, curr) => acc + curr.value, 0) / a.votes.length;
        const medianB =
          b.votes.reduce((acc, curr) => acc + curr.value, 0) / b.votes.length;
        return medianB - medianA;
      });

      return res;
    }),
  get: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.character.findUnique({
      where: {
        id: input,
      },
    });
  }),
  create: protectedProcedure.input(z.string()).mutation(({ input, ctx }) => {
    return ctx.prisma.character.create({
      data: {
        name: input,
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  }),
  vote: protectedProcedure
    .input(
      z.object({
        characterId: z.string(),
        value: z.number().min(0).max(10),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.vote.upsert({
        where: {
          characterId_userId: {
            characterId: input.characterId,
            userId: ctx.session.user.id,
          },
        },
        update: {
          value: input.value,
        },
        create: {
          value: input.value,
          character: {
            connect: {
              id: input.characterId,
            },
          },
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ input, ctx }) => {
    // TODO: bruh add some authorization
    return ctx.prisma.character.delete({
      where: {
        id: input,
      },
    });
  }),
});
