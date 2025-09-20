// .tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Date"
          },
          {
            type: "string",
            name: "author",
            label: "Author"
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "iframe",
                label: "Embed (YouTube, GHL, Maps, etc.)",
                fields: [
                  {
                    type: "string",
                    name: "src",
                    label: "Embed URL",
                    required: true,
                    description: "Full URL of the embed (e.g., YouTube embed URL, GHL calendar URL, etc.)"
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    description: "Descriptive title for accessibility"
                  },
                  {
                    type: "number",
                    name: "width",
                    label: "Width",
                    description: "Width in pixels (default: 560)"
                  },
                  {
                    type: "number",
                    name: "height",
                    label: "Height",
                    description: "Height in pixels (default: 315)"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
