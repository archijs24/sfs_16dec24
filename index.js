const express=require("express");
const cors=require("cors");
const mysql=require("mysql2");
const multer=require("multer");
const path=require("path");
const fs=require("fs");

const app=express();
app.use(cors());
app.use(express.json());

const con=mysql.createConnection({
	host:"sql12.freesqldatabase.com",
	user:"sql12752568",
	password:"GDxb9LaDpK",
	database:"sql12752568"
});

const storage=multer.diskStorage({
	destination:(req,file,cb)=>{
	cb(null,'uploads/');
},
filename:(req,file,cb)=>{
	cb(null,Date.now()+path.extname(file.originalname));
},
});

const upload=multer({storage});

app.use('/uploads',express.static('uploads'));

app.post("/save",upload.single('file'),(req,res)=>{
	let data=[req.body.rno,req.body.name,req.body.marks,req.file.filename];
	console.log(data);
	let sql="insert into student values(?,?,?,?)";
	con.query(sql,data,(err,result)=>{
		if(err)	res.send(err);
		else		res.send(result);
	});
});

app.get("/gs",(req,res)=>{
	let sql="select * from student";
	con.query(sql,(err,result)=>{
		if(err)	res.send(err);
		else		res.send(result);
	});
});

app.delete("/ds",(req,res)=>{
	console.log(req.body.rno,req.body.image);
	let data=[req.body.rno];
	fs.unlink("./uploads/"+req.body.image,()=>{});
	let sql="delete from student where rno=?";
	con.query(sql,data,(err,result)=>{
		if(err)	res.send(err);
		else		res.send(result);
	});
});
app.listen(8000,()=>{console.log("ready@8000");});

