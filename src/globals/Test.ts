import type { GlobalConfig } from 'payload'

export const Test: GlobalConfig = {
  slug: 'test',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'holder',
          fields: [
            {
              name: 'text',
              type: 'text',
              localized: true,
            },
            {
              type: 'tabs',
              tabs: [
                {
                  label: 'foo',
                  fields: [
                    {
                      name: 'items',
                      type: 'array',
                      fields: [
                        {
                          name: 'text',
                          type: 'text',
                          localized: true,
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'sections',
                          type: 'blocks',
                          blocks: [
                            {
                              slug: 'block-one',
                              fields: [
                                {
                                  name: 'nonlocalized-one',
                                  type: 'text',
                                },
                                {
                                  name: 'text-one',
                                  type: 'text',
                                  localized: true,
                                },
                              ],
                            },
                            {
                              slug: 'block-two',
                              fields: [
                                {
                                  name: 'nonlocalized-two',
                                  type: 'text',
                                },
                                {
                                  name: 'text-two',
                                  type: 'text',
                                  localized: true,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  label: 'foobar',
                  name: 'NAMED_TAB',
                  fields: [
                    {
                      name: 'inside_named_tab',
                      type: 'text',
                    },
                  ],
                },
                {
                  label: 'foobar',
                  fields: [
                    {
                      name: 'inside_unnamed_tab',
                      type: 'text',
                    },
                    {
                      name: 'group_field',
                      type: 'group',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            {
                              name: 'text_inside_group',
                              type: 'text',
                            },
                            {
                              type: 'tabs',
                              tabs: [
                                {
                                  label: 'unnamed',
                                  fields: [
                                    {
                                      name: 'inside_unnamed_tab_inside_group',
                                      type: 'text',
                                    },
                                  ],
                                },
                                {
                                  name: 'named_tab',
                                  fields: [
                                    {
                                      name: 'inside_named_tab_inside_group',
                                      type: 'text',
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
