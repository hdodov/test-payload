import initBundleAnalyzer from '@next/bundle-analyzer'
import { withPayload } from '@payloadcms/next/withPayload'

const withBundleAnalyzer = initBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
}

export default withBundleAnalyzer(withPayload(nextConfig))
