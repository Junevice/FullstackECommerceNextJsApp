/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Correct styled-components bug
  compiler:{
    styledComponents:true
  },
  // Redirect our cancel to our home page (if we dont want to create a cancel page)
  async redirects(){
    return[
      {
        source: '/cancel',
        destination: '/',
        permanent:true,
      }
    ]
  }
}

module.exports = nextConfig
