const frontend_url=process.env.CLIENT_URL 
console.log(frontend_url);

const allowedOrigin = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  frontend_url
];

module.exports=allowedOrigin