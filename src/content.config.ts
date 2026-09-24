import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const contentSidebarSchema = z
  .object({
    discriminant: z.boolean(),
    value: z
      .object({
        show: z.boolean().optional().default(true),
        position: z.enum(["left", "right"]).optional().default("right"),
      })
      .nullable()
      .optional(),
  })
  .optional();

// Hero singleton
const hero = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc,yaml}", base: "./src/content/hero" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string(),
      description: z.string(),
      avatar: image(),
      location: z.string().optional(),
      socialLinks: z.array(
        z.object({
          url: z.string(),
          icon: z.enum([
            "GitHub",
            "LinkedIn",
            "Twitter",
            "Bluesky",
            "Instagram",
            "YouTube",
            "Email",
            "FolderCode",
          ]),
          label: z.string(),
        })
      ),
    }),
});

// Work experience collection
const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc,yaml}", base: "./src/content/work" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      location: z.string().optional(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      logo: image().optional(),
      link: z.url().optional(),
      skills: z.array(z.string()).optional(),
      hideDuration: z.boolean().optional().default(false),
    }),
});

// Education collection
const education = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdoc,yaml}",
    base: "./src/content/education",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      logo: image().optional(),
      link: z.url().optional(),
      hideDuration: z.boolean().optional().default(false),
    }),
});

// Project Categories collection
const projectCategories = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdoc,yaml}",
    base: "./src/content/projectCategories",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    sortOrder: z.number().optional().default(0),
  }),
});

// Projects collection
const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdoc,yaml}",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    z.object({
      featured: z.boolean().optional().default(false),
      sortOrder: z.number().optional().default(999),
      category: z.string().optional(),
      title: z.string(),
      description: z.string(),
      image: image().optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      skills: z.array(z.string()),
      demoLink: z.url().optional(),
      sourceLink: z.url().optional(),
      contentSidebar: contentSidebarSchema,
    }),
});

// Personal portfolio projects collection
const portfolioProjects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdoc,yaml}",
    base: "./src/content/portfolioProjects",
  }),
  schema: ({ image }) =>
    z.object({
      sortOrder: z.number().optional().default(999),
      title: z.string(),
      description: z.string(),
      image: image().optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      skills: z.array(z.string()),
      demoLink: z.url().optional(),
      sourceLink: z.url().optional(),
      contentSidebar: contentSidebarSchema,
    }),
});

// Hackathons collection
const hackathons = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdoc,yaml}",
    base: "./src/content/hackathons",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      titleZh: z.string(),
      award: z.string(),
      awardZh: z.string(),
      tier: z.enum(["international", "national", "provincial", "school"]),
      awardOrder: z.number().int().min(1).max(3),
      sortOrder: z.number().int().optional().default(999),
      location: z.string().optional(),
      description: z.string().optional(),
      descriptionZh: z.string().optional(),
      startDate: z.coerce.date().optional(),
      datePrecision: z.enum(["day", "month"]).optional().default("day"),
      endDate: z.coerce.date().optional(),
      logo: image().optional(),
      certificate: image().optional(),
      rotateCertificate: z.boolean().optional().default(false),
      certificateRotation: z.enum(["clockwise", "counterclockwise"]).optional(),
      sourceLink: z.url().optional(),
    }),
});

// Blog collection
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc,yaml}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      published: z.boolean().optional().default(true),
      title: z.string(),
      description: z.string(),
      image: image(),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).optional(),
      contentSidebar: contentSidebarSchema,
    }),
});

// About singleton
const about = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc,yaml}", base: "./src/content/about" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      photo: image().optional(),
      link: z.url().optional(),
    }),
});

// General singleton
const general = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc,yaml}", base: "./src/content/general" }),
  schema: z.object({
    enableThemeSelector: z.boolean(),
    extraLinksEnabled: z.boolean(),
    extraLinks: z.array(
      z.object({
        link: z.string(),
        icon: z.enum([
          "Flower2",
          "BookOpen",
          "FileText",
          "CodeXml",
          "Mail",
          "Home",
          "User",
          "Briefcase",
          "GraduationCap",
          "Link",
        ]),
        label: z.string(),
        displayOn: z.enum(["both", "dock", "fab"]).optional().default("both"),
      })
    ),
    showAboutSection: z.boolean(),
    showProjectsSection: z.boolean(),
    showBlogSection: z.boolean(),
    showWorkSection: z.boolean(),
    showEducationSection: z.boolean(),
    showHackathonsSection: z.boolean(),
    showContactSection: z.boolean(),
    projectsLayout: z
      .enum(["grid", "tabs-horizontal", "tabs-vertical"])
      .optional()
      .default("grid"),
    showContentSidebar: z.boolean().optional().default(true),
    contentSidebarPosition: z
      .enum(["left", "right"])
      .optional()
      .default("right"),
  }),
});

// Contact singleton
const contact = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc,yaml}", base: "./src/content/contact" }),
  schema: z.object({
    icon: z.enum(["MessageCircleCode", "Mail", "Phone"]),
    linkUrl: z.url(),
    linkText: z.string(),
    footerIcon: z.enum(["Pickaxe", "Hammer", "Heart"]),
    footerText: z.string(),
    footerLinkText: z.string(),
    footerLinkUrl: z.url(),
  }),
});

export const collections = {
  hero,
  work,
  education,
  projectCategories,
  projects,
  portfolioProjects,
  hackathons,
  blog,
  about,
  general,
  contact,
};
