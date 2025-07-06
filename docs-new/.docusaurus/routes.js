import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/api/__docusaurus/debug',
    component: ComponentCreator('/api/__docusaurus/debug', '882'),
    exact: true
  },
  {
    path: '/api/__docusaurus/debug/config',
    component: ComponentCreator('/api/__docusaurus/debug/config', 'ef6'),
    exact: true
  },
  {
    path: '/api/__docusaurus/debug/content',
    component: ComponentCreator('/api/__docusaurus/debug/content', '8a4'),
    exact: true
  },
  {
    path: '/api/__docusaurus/debug/globalData',
    component: ComponentCreator('/api/__docusaurus/debug/globalData', '21c'),
    exact: true
  },
  {
    path: '/api/__docusaurus/debug/metadata',
    component: ComponentCreator('/api/__docusaurus/debug/metadata', 'f13'),
    exact: true
  },
  {
    path: '/api/__docusaurus/debug/registry',
    component: ComponentCreator('/api/__docusaurus/debug/registry', 'c85'),
    exact: true
  },
  {
    path: '/api/__docusaurus/debug/routes',
    component: ComponentCreator('/api/__docusaurus/debug/routes', 'f18'),
    exact: true
  },
  {
    path: '/api/blog',
    component: ComponentCreator('/api/blog', '0a8'),
    exact: true
  },
  {
    path: '/api/blog/archive',
    component: ComponentCreator('/api/blog/archive', '385'),
    exact: true
  },
  {
    path: '/api/blog/authors',
    component: ComponentCreator('/api/blog/authors', 'a27'),
    exact: true
  },
  {
    path: '/api/blog/tags',
    component: ComponentCreator('/api/blog/tags', '53a'),
    exact: true
  },
  {
    path: '/api/blog/tags/api',
    component: ComponentCreator('/api/blog/tags/api', 'f8b'),
    exact: true
  },
  {
    path: '/api/blog/tags/documentation',
    component: ComponentCreator('/api/blog/tags/documentation', 'f03'),
    exact: true
  },
  {
    path: '/api/blog/tags/mesh',
    component: ComponentCreator('/api/blog/tags/mesh', '78f'),
    exact: true
  },
  {
    path: '/api/blog/welcome',
    component: ComponentCreator('/api/blog/welcome', '58b'),
    exact: true
  },
  {
    path: '/api/docs',
    component: ComponentCreator('/api/docs', '2b2'),
    routes: [
      {
        path: '/api/docs',
        component: ComponentCreator('/api/docs', 'a7a'),
        routes: [
          {
            path: '/api/docs',
            component: ComponentCreator('/api/docs', '220'),
            routes: [
              {
                path: '/api/docs/api/overview',
                component: ComponentCreator('/api/docs/api/overview', '6c1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/api/docs/examples/basic-usage',
                component: ComponentCreator('/api/docs/examples/basic-usage', 'daf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/api/docs/getting-started/installation',
                component: ComponentCreator('/api/docs/getting-started/installation', 'cb7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/api/docs/intro',
                component: ComponentCreator('/api/docs/intro', '8de'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/api/docs/sdks/overview',
                component: ComponentCreator('/api/docs/sdks/overview', 'f53'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/api/',
    component: ComponentCreator('/api/', 'b94'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
