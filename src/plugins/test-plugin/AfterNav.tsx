'use client'

import { NavGroup, useConfig } from '@payloadcms/ui'
import Link from 'next/link'

export function AfterNav() {
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()

  return (
    <NavGroup key="test" label="Test">
      <Link href={`${adminRoute}/test-plugin`}>Test Plugin</Link>
    </NavGroup>
  )
}
