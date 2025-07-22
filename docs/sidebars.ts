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
    'introduction',
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/service-structure',
        'architecture/group-ownership', 
        'architecture/role-based-access',
        'architecture/authentication'
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api-reference/index',
        {
          type: 'category',
          label: 'IAM Domain',
          items: [
            'api-reference/iam/index',
            {
              type: 'category',
              label: 'API User Service',
              items: [
                'api-reference/iam/api_user/v1/index',
                'api-reference/iam/api_user/v1/types',
                {
                  type: 'category',
                  label: 'Service Methods',
                  items: [
                    'api-reference/iam/api_user/v1/service/index',
                    'api-reference/iam/api_user/v1/service/create-api-user',
                    'api-reference/iam/api_user/v1/service/get-api-user',
                    'api-reference/iam/api_user/v1/service/list-api-users',
                    'api-reference/iam/api_user/v1/service/search-api-users',
                    'api-reference/iam/api_user/v1/service/activate-api-user',
                    'api-reference/iam/api_user/v1/service/deactivate-api-user',
                    'api-reference/iam/api_user/v1/service/get-api-user-by-key-hash'
                  ]
                }
              ]
            }
          ]
        }
      ],
    },
    'roadmap',
  ],
};

export default sidebars;
