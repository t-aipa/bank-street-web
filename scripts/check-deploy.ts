import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'

// Load environment variables
config()

const requiredEnvVars = [
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'DATABASE_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'MAPBOX_TOKEN',
]

function checkEnvVariables() {
  console.log('🔍 Checking environment variables...')
  const missing = requiredEnvVars.filter(env => !process.env[env])
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:')
    missing.forEach(env => console.error(`   - ${env}`))
    process.exit(1)
  }
  
  console.log('✅ All required environment variables are present')
}

function checkDependencies() {
  console.log('🔍 Checking dependencies...')
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
  )
  
  const required = [
    '@prisma/client',
    'next',
    'react',
    'react-dom',
    '@auth/prisma-adapter',
    'next-auth'
  ]
  
  const missing = required.filter(dep => !packageJson.dependencies[dep])
  
  if (missing.length > 0) {
    console.error('❌ Missing required dependencies:')
    missing.forEach(dep => console.error(`   - ${dep}`))
    process.exit(1)
  }
  
  console.log('✅ All required dependencies are present')
}

function checkBuildFiles() {
  console.log('🔍 Checking build files...')
  const requiredFiles = [
    'next.config.js',
    'package.json',
    'prisma/schema.prisma',
    'app/layout.tsx',
    'app/page.tsx'
  ]
  
  const missing = requiredFiles.filter(file => 
    !fs.existsSync(path.join(process.cwd(), file))
  )
  
  if (missing.length > 0) {
    console.error('❌ Missing required files:')
    missing.forEach(file => console.error(`   - ${file}`))
    process.exit(1)
  }
  
  console.log('✅ All required files are present')
}

async function main() {
  console.log('🚀 Starting deployment checks...\n')
  
  checkEnvVariables()
  checkDependencies()
  checkBuildFiles()
  
  console.log('\n✨ All checks passed! Ready for deployment.')
}

main().catch(error => {
  console.error('❌ Deployment check failed:', error)
  process.exit(1)
})
