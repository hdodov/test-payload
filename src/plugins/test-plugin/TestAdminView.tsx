import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import type { AdminViewProps } from 'payload'
import { TestForm } from './TestForm'

export function TestAdminView({ initPageResult, params, searchParams }: AdminViewProps) {
  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
    >
      <Gutter>
        <h1 className="doc-header">Test Plugin</h1>
        <TestForm />
      </Gutter>
    </DefaultTemplate>
  )
}
