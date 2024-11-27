import { Config, Plugin } from 'payload'

export const testPlugin: Plugin = (incomingConfig: Config): Config => {
  return {
    ...incomingConfig,
    admin: {
      ...incomingConfig.admin,
      components: {
        ...incomingConfig.admin?.components,
        views: {
          TestAdminView: {
            path: '/test-plugin',
            Component: '@/plugins/test-plugin/TestAdminView#TestAdminView',
          },
        },
        afterNavLinks: ['@/plugins/test-plugin/AfterNav#AfterNav'],
      },
    },
  }
}
