/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MAILCHIMP_URL: process.env.NEXT_PUBLIC_MAILCHIMP_URL,
    NEXT_MAILCHIMP_API_KEY: process.env.NEXT_MAILCHIMP_API_KEY,
    NEXT_MAILCHIMP_API_SERVER: process.env.NEXT_MAILCHIMP_API_SERVER,
    NEXT_MAILCHIMP_AUDIENCE_ID: process.env.NEXT_MAILCHIMP_AUDIENCE_ID,
  }
}

module.exports = nextConfig
