/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import dayjs from "dayjs";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const capstoneRouter = createTRPCRouter({
  createCapstone: publicProcedure
    .input(
      z.object({
        studentCourse: z.string(),
        title: z.string(),
        abstract: z.string(),
        topic: z.string(),
        adviser: z.string(),
        url: z.string(),
        studentMembers: z.string(),
        studentNo: z.string(),
        status: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hasStudent = await ctx.prisma.students.findUnique({
        where: {
          studentNo: input.studentNo,
        },
      });
      if (hasStudent) {
        const createCapstone = await ctx.prisma.capstone
          .create({
            data: {
              studentCourse: input.studentCourse,
              date: "3/232",
              title: input.title,
              abstract: input.abstract,
              topic: input.topic,
              adviser: input.adviser,
              url: input.url,
              studentMembers: input.studentMembers,
              status: input.status,
            },
            include: {
              Students: true,
            },
          })
          .then(async (data) => {
            return await ctx.prisma.students.update({
              where: {
                studentNo: input.studentNo,
              },
              data: {
                capstoneId: data.id,
              },
            });
          });
        return createCapstone;
      } else {
        return null;
      }
    }),

  createAdminCapstone: publicProcedure
    .input(
      z.object({
        course: z.string(),
        title: z.string(),
        abstract: z.string(),
        topic: z.string(),
        adviser: z.string(),
        url: z.string(),
        studentMembers: z.string(),
        studentNo: z.string(),
        date: z.string(),
        status: z.string(),
        courseId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createCapstone = await ctx.prisma.capstone.create({
        data: {
          studentCourse: input.course,
          date: input.date,
          title: input.title,
          abstract: input.abstract,
          topic: input.topic,
          adviser: input.adviser,
          url: input.url,
          studentMembers: input.studentMembers,
          status: input.status,
          courseId: input.courseId,
        },
        include: {
          Students: true,
        },
      });

      return createCapstone;
    }),

  updateCapstone: publicProcedure
    .input(
      z.object({
        id: z.string(),
        course: z.string(),
        title: z.string(),
        abstract: z.string(),
        topic: z.string(),
        adviser: z.string(),
        url: z.string().nullish(),
        studentMembers: z.string(),
        date: z.string(),
        status: z.string(),
        courseId: z.string(),
      }),
    )

    .mutation(async ({ ctx, input }) => {
      if (input.url) {
        const createCapstone = await ctx.prisma.capstone.update({
          where: {
            id: input.id,
          },
          data: {
            studentCourse: input.course,
            date: input.date,
            title: input.title,
            abstract: input.abstract,
            topic: input.topic,
            adviser: input.adviser,
            url: input.url || "",
            studentMembers: input.studentMembers,
            status: input.status,
            courseId: input.courseId,
          },
          include: {
            Students: true,
          },
        });
        return createCapstone;
      } else {
        const createCapstone1 = await ctx.prisma.capstone.update({
          where: {
            id: input.id,
          },
          data: {
            studentCourse: input.course,
            date: input.date,
            title: input.title,
            abstract: input.abstract,
            topic: input.topic,
            adviser: input.adviser,
            studentMembers: input.studentMembers,
            status: input.status,
            courseId: input.courseId,
          },
          include: {
            Students: true,
          },
        });

        return createCapstone1;
      }
    }),

  notApprovedCapstone: publicProcedure
    .input(
      z.object({
        studentCourse: z.string(),
        title: z.string(),
        abstract: z.string(),
        topic: z.string(),
        adviser: z.string(),
        url: z.string(),
        studentMembers: z.string(),
        studentNo: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hasStudent = await ctx.prisma.students.findUnique({
        where: {
          studentNo: input.studentNo,
        },
      });
      if (hasStudent) {
        const formattedDate = dayjs().format("MM/DD/YYYY");

        const createCapstone = await ctx.prisma.capstone
          .create({
            data: {
              studentCourse: input.studentCourse,
              date: formattedDate,
              title: input.title,
              abstract: input.abstract,
              topic: input.topic,
              adviser: input.adviser,
              url: input.url,
              studentMembers: input.studentMembers,
              status: "notapproved",
            },
            include: {
              Students: true,
            },
          })
          .then(async (data) => {
            return await ctx.prisma.students.update({
              where: {
                studentNo: input.studentNo,
              },
              data: {
                capstoneId: data.id,
              },
            });
          });
        return createCapstone;
      } else {
        return null;
      }
    }),

  notApprovedCapstoneDetails: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.capstone.findMany({
      where: {
        status: "notApproved",
      },
      include: {
        Students: {
          include: {
            Course: true,
          },
        },
      },
    });
  }),

  ApprovedCapstoneDetails: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.capstone.findMany({
      include: {
        Course: {
          include: {
            Departments: true,
          },
        },
      },
    });
  }),

  approveCapstone: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const student = await ctx.prisma.capstone.update({
        where: {
          id: input.id,
          status: "notapproved",
        },
        data: {
          status: "approved",
        },
      });
      return { success: true, student };
    }),
  capstoneIsAdded: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const hasCapstone = await ctx.prisma.students.findUnique({
        where: {
          id: input.id,
        },
        include: {
          capstone: true,
        },
      });
      if (hasCapstone?.capstone) {
        return true;
      } else {
        return false;
      }
    }),
});
