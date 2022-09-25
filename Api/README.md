  - POSTGRES_USER=postgres
  - POSTGRES_PASSWORD=postgres

  local debugging 
  npm run build
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  npm run debug  --stage dev  
  OR
  serverless offline start --stage dev