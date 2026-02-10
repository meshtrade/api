/* eslint-disable */
// @ts-nocheck

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import {api_reference_sidebar } from "./docs/api-reference/sidebar_meshdoc";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'introduction/index',
    'access-control/index',
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/service-structure',
        'architecture/sdk-configuration'
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api-reference/index',
        ...api_reference_sidebar,
      ],
    },
    'roadmap',
    'contributors/index',
  ],
};

export default sidebars;
