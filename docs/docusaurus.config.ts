import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';

const config: Config = {
  title: 'Mesh API Documentation',
  tagline: 'Comprehensive API documentation for Mesh trading platform',
  favicon: 'img/favicon.ico',

  url: 'https://meshtrade.github.io',
  baseUrl: '/api/',

  organizationName: 'meshtrade',
  projectName: 'api',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    format: 'mdx',
    mermaid: false, // Disabled due to dependency conflicts
  },

  // themes: ['@docusaurus/theme-mermaid'], // Temporarily disabled due to dependency issues

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/meshtrade/api/tree/main/docs-new/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [],
          rehypePlugins: [],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/meshtrade/api/tree/main/docs-new/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
      image: 'img/logo.svg',
      navbar: {
        title: 'Mesh API',
        logo: {
          alt: 'Mesh Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/meshtrade/api',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
              {
                label: 'API Reference',
                to: '/docs/api/overview',
              },
            ],
          },
          {
            title: 'SDKs',
            items: [
              {
                label: 'SDK Overview',
                to: '/docs/sdks/overview',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/meshtrade/api',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Mesh Trading Platform. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['protobuf', 'go', 'python', 'typescript'],
      },
      // algolia: {
      //   appId: 'YOUR_APP_ID',
      //   apiKey: 'YOUR_SEARCH_API_KEY',
      //   indexName: 'YOUR_INDEX_NAME',
      //   contextualSearch: true,
      //   searchParameters: {},
      //   searchPagePath: 'search',
      // },
      // mermaid: {
      //   theme: {light: 'neutral', dark: 'dark'},
      // },
    },
};

export default config;
