import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';

const config: Config = {
  title: 'Mesh API Documentation',
  tagline: 'Trading APIs for digital asset platforms',
  favicon: 'img/favicon.svg',

  url: 'https://meshtrade.github.io',
  baseUrl: '/api/',

  organizationName: 'meshtrade',
  projectName: 'api',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    format: 'mdx',
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: [
    '@docusaurus/theme-mermaid',
    // Local (offline) search. Builds a Lunr.js index at build time and serves a
    // ⌘K / Ctrl+K search modal entirely from the static site — no external
    // service, account, or API key required. See docs: https://github.com/easyops-cn/docusaurus-search-local
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // Index hand-written guides + generated API reference (docs) and News (blog).
        indexDocs: true,
        indexBlog: true,
        // The custom React pages (homepage, etc.) are navigational, not content —
        // excluding them keeps results focused on documentation.
        indexPages: false,
        // Match this site's non-default blog route (`routeBasePath: 'news'`).
        blogRouteBasePath: '/news',
        docsRouteBasePath: '/docs',
        // Cache-bust the generated index files via content hash for long-term caching.
        hashed: true,
        language: ['en'],
        // Do not highlight/mark the matched terms on the destination page.
        highlightSearchTermsOnTargetPage: false,
        searchResultLimits: 8,
      },
    ],
  ],

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
      type: 'text/css',
    },
  ],

  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          remarkPlugins: [],
          rehypePlugins: [],
        },
        blog: {
          routeBasePath: 'news',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: undefined,
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
      image: 'img/favicon.svg',
      docs: {
        sidebar: {
          hideable: true,
        },
      },      
      navbar: {
        title: 'Mesh API',
        logo: {
          alt: 'Mesh Logo',
          src: 'img/mesh-logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          { to: '/news', label: 'News', position: 'left' },
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
                to: '/docs/introduction',
              },
              {
                label: 'API Reference',
                to: '/docs/api-reference',
              },
            ],
          },
          {
            title: 'Architecture',
            items: [
              {
                label: 'Access Control',
                to: '/docs/access-control',
              },
              {
                label: 'Service Structure',
                to: '/docs/service-structure',
              },
              {
                label: 'SDK Configuration',
                to: '/docs/sdk-configuration',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'News',
                to: '/news',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/meshtrade/api',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Mesh B.V.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['protobuf', 'go', 'python', 'typescript', 'java'],
      },
      // Search is provided by the local (offline) search theme configured in the
      // top-level `themes` array above — no Algolia account required.
      mermaid: {
        theme: {light: 'neutral', dark: 'dark'},
      },
    },
};

export default config;
