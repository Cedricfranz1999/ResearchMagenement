/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import dayjs from "dayjs";
import { Input } from "postcss";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const settingsRouter = createTRPCRouter({
  getListOfDepartment: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.department.findMany({
      include: {
        Course: {
          select: {
            coursename: true,
            id: true,
          },
        },
      },
    });
  }),

  FilterCourseByDepartment: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.department.findMany({
        where: { id: input.id },
        include: { Course: true },
      });
    }),

  UpdateFilterCourseByDepartment: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.department.findMany({
        where: { id: input.id },
        include: { Course: true },
      });
    }),

  getListOfStaff: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.admin.findMany({});
  }),

  getListOfCourses: publicProcedure
    .input(
      z.object({
        departmentId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.course.findMany({
        where: { departmentid: input.departmentId },
      });
    }),

  createDepartment: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createCapstone = await ctx.prisma.department.create({
        data: {
          depeartName: input.name,
        },
      });

      return createCapstone;
    }),

  createCourse: publicProcedure
    .input(
      z.object({
        name: z.string(),
        departmentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createCapstone = await ctx.prisma.course.create({
        data: {
          coursename: input.name,
          departmentid: input.departmentId,
        },
      });

      return createCapstone;
    }),

  createAdmin: publicProcedure
    .input(
      z.object({
        name: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createCapstone = await ctx.prisma.admin.create({
        data: {
          username: input.name,
          password: input.password,
        },
      });

      return createCapstone;
    }),

  FindCourse: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.department.findMany({
        where: { id: input.id },
      });
    }),

  FindDepartment: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.course.findMany({
        where: { id: input.id },
      });
    }),

  updateCourse: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createCapstone = await ctx.prisma.course.update({
        where: {
          id: input.id,
        },
        data: {
          coursename: input.name,
        },
      });

      return createCapstone;
    }),

  updateDepartment: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createCapstone = await ctx.prisma.department.update({
        where: {
          id: input.id,
        },
        data: {
          depeartName: input.name,
        },
      });

      return createCapstone;
    }),
});
