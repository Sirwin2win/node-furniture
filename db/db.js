const connectDB = async () =>{
  try{
const conn =await mongoose.connect(process.env.DB_URI)
 console.log(`MongoDB Connected: ${conn.connection.host}`);

} catch {
  console.error(`Error: ${error.message}`)
  process.exit()
}
}



module.exports = connectDB