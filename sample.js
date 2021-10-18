const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const transporter = nodemailer.createTransport({
	service: "hotmail",
	auth: {
		user: "lovishagrawal@outlook.com",
		pass: "Jungle05@"
	}
});


function sendEmail(email){
	const data = {
		from: "lovishagrawal@outlook.com",
		to: email,
		subject: "Invitation for the wedding ceremony",
		html:
		`<h2>You're Invited</h2>
		<p>You have been invited for the ceremony</p>`
	}

	transporter.sendMail(data, function(err, info){
		if(err){
			console.log(err);
			return;
		}
		console.log("sent:" + info.response);
	});
}

app.get("/event", function(req, res){
	res.sendFile(__dirname + "/event.html");
});

app.post("/event", function(req, res){
	const email = req.body.email;
	console.log(email);
	sendEmail(email);
	res.redirect("/event");
})

app.listen(3000, function(req, res){
	console.log("Listening at port 3000");
})