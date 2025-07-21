/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/service-structure',
        'guides/group-ownership', 
        'guides/schema-driven-authorization'
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: ['api/reference'],
    },

    'roadmap',
  ],
};

export default sidebars;
