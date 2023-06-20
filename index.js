const express = require("express");
const app = express();
app.set("port", 3000);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const Sequelize = require('sequelize');
const { Op, where } = require("sequelize");
const { getDB } = require("./dbase");
const joi = require('joi');
const jwt = require("jsonwebtoken");
const axios = require("axios");
const bcrypt = require("bcrypt")
const Mailjet = require('node-mailjet');
const dbase = require("./dbase");
const Barang = require("./models/database/barang");
const Jenis = require("./models/database/jenis");
const user = require("./models/database/user");
const Auction = require("./models/database/auction");
const log_auction = require("./models/database/log_auction");
const User = require("./models/database/user");
const sequelize = getDB();

// const mailjet = Mailjet.apiConnect(
//     process.env.MJ_APIKEY_PUBLIC,
//     process.env.MJ_APIKEY_PRIVATE,
// );
Barang.belongsTo(Jenis, { foreignKey: "id_jenis" });
Auction.belongsTo(Barang, { foreignKey: "id_barang" });
Auction.belongsTo(User, { foreignKey: "pemenang" })


app.listen(app.get("port"), () => {
    console.log(`Server started at http://localhost:${app.get("port")}`);
});
// status user 1 => akftif
// status user 0 => tidak akftif


app.post("/api/register", async (req, res) => {
    // try {
    //     var {error} = await joi.object({
    //         nama: joi.string().require(),
    //         username: joi.string().required(),
    //         password: joi.string().required(),
    //         nik: joi.string().required(),
    //         alamat: joi.string().required(),
    //         notelp: joi.string().required(),
    //         saldo: joi.string().required(),
    //     }).validateAsync(req.body);
    // } catch (error) {
    //     return res.status(400).send(error.toString());
    // }

    var id_user = "";
    await user.findAll().then((duser) => {
        var double = 0;
        var tipeUser = req.body.tipe_user;
        var saldo = 0;

        for (var i = 0; i < duser.length; i++) {
            if (duser[i].username == req.body.username) {
                double += 1;
            }
        }
        if (tipeUser == "customer" || tipeUser == "Customer" || tipeUser == "CUSTOMER") {
            if (double == 0) {
                if (duser.length + 1 < 10) { id_user = "C00" + (duser.length + 1).toString(); }
                else if (duser.length + 1 < 100) { id_user = "C0" + (duser.length + 1).toString(); }
                else { id_user = "C" + (duser.length + 1).toString(); }


                bcrypt.genSalt(10).then(salt => { return bcrypt.hash(req.body.password, salt); })
                    .then(hash => {
                        user.create({
                            id_user: id_user,
                            nama_user: req.body.nama,
                            username_user: req.body.username,
                            email_user: req.body.email,
                            password_user: hash,
                            nik_user: req.body.nik,
                            alamat_user: req.body.alamat,
                            notelp_user: req.body.notelp,
                            tipe_user: tipeUser,
                            saldo_user: saldo,
                            status_user: 1
                        }).then((data) => {
                            res.json({
                                id_user: id_user,
                                nama_user: req.body.nama,
                                username_user: req.body.username,
                                email_user: req.body.email,
                                password_user: hash,
                                nik_user: req.body.nik,
                                alamat_user: req.body.alamat,
                                notelp_user: req.body.notelp,
                                tipe_user: tipeUser,
                                saldo_user: saldo,
                                status_user: 1
                            });
                        })

                            .catch((err) => { });
                    })
                    .catch(err => console.error(err.message))
                const Mailjet = require('node-mailjet')

                const mailjet = Mailjet.apiConnect(
                    "b82c023d81135edb416f540324336f01",
                    "6af6ae99683e4e5adffaa00d35707597",
                    {
                        config: {},
                        options: {}
                    }
                )

                const request = mailjet
                    .post("send", { 'version': 'v3.1' })
                    .request({
                        "Messages": [
                            {
                                "From": {
                                    "Email": "albert.g20@mhs.istts.ac.id",
                                    "Name": "Library API"
                                },
                                "To": [
                                    {
                                        "Email": "" + req.body.email + "",
                                        "Name": "'" + req.body.nama + "'"
                                    }
                                ],
                                "Subject": "Confirmation Register",
                                "TextPart": "Click link below to activate your account",
                                "HTMLPart": "<h3>This is " + req.body.username + " as " + tipeUser + "?</h3><br />",
                                "CustomID": "AppGettingStartedTest"
                            }
                        ]
                    })
                request
                    .then((result) => {
                        console.log(result.body)
                    })
                    .catch((err) => {
                        console.log(err.statusCode)
                    })
            }
            else {
                return res.status(400).send({
                    message: "username sudah terdaftar"
                });
            }
        } else if (tipeUser == "Admin" || tipeUser == "admin" || tipeUser == "ADMIN") {
            if (double == 0) {
                if (duser.length + 1 < 10) { id_user = "A00" + (duser.length + 1).toString(); }
                else if (duser.length + 1 < 100) { id_user = "A0" + (duser.length + 1).toString(); }
                else { id_user = "A" + (duser.length + 1).toString(); }

                bcrypt.genSalt(10).then(salt => { return bcrypt.hash(req.body.password, salt); })
                    .then(hash => {
                        user.create({
                            id_user: id_user,
                            nama_user: req.body.nama,
                            username_user: req.body.username,
                            email_user: req.body.email,
                            password_user: hash,
                            nik_user: req.body.nik,
                            alamat_user: req.body.alamat,
                            notelp_user: req.body.notelp,
                            tipe_user: tipeUser,
                            saldo_user: saldo,
                            status_user: 1
                        }).then((data) => {
                            res.json({
                                id_user: id_user,
                                nama_user: req.body.nama,
                                username_user: req.body.username,
                                email_user: req.body.email,
                                password_user: hash,
                                nik_user: req.body.nik,
                                alamat_user: req.body.alamat,
                                notelp_user: req.body.notelp,
                                tipe_user: tipeUser,
                                saldo_user: saldo,
                                status_user: 1
                            });
                        })
                            .catch((err) => { });
                    })
                    .catch(err => console.error(err.message))
                const Mailjet = require('node-mailjet')

                const mailjet = Mailjet.apiConnect(
                    "b82c023d81135edb416f540324336f01",
                    "6af6ae99683e4e5adffaa00d35707597",
                    {
                        config: {},
                        options: {}
                    }
                )

                const request = mailjet
                    .post("send", { 'version': 'v3.1' })
                    .request({
                        "Messages": [
                            {
                                "From": {
                                    "Email": "albert.g20@mhs.istts.ac.id",
                                    "Name": "Proyek SOA"
                                },
                                "To": [
                                    {
                                        "Email": "" + req.body.email + "",
                                        "Name": "'" + req.body.nama + "'"
                                    }
                                ],
                                "Subject": "Confirmation Register",
                                "TextPart": "Click link below to activate your account",
                                "HTMLPart": "<center><h1>This is " + req.body.username + " as " + tipeUser + "</h1></center><br><center>click button below for activated </center><br><center><button >CLICK HERE</button> </center>",
                                "CustomID": String
                            }
                        ]
                    })
                request
                    .then((result) => {
                        console.log(result.body)
                    })
                    .catch((err) => {
                        console.log(err.statusCode)
                    })
            }
            else {
                return res.status(400).send({
                    message: "username sudah terdaftar"
                });
            }
        } else {
            return res.status(400).send({ "message": "salah masuk tipe user" })
        }
    }).catch((err) => { });
});

app.post("/api/login", async (req, res) => {

    try {
        var { error } = await joi.object({
            username: joi.string().required(),
            password: joi.string().required(),
        }).validateAsync(req.body);

        var unik = await user.findAll({ where: { username_user: req.body.username } })
        if (unik.length > 0) {
            bcrypt.compare(req.body.password, unik[0].password_user, function (err, result) {
                if (unik.length > 0) {
                    var usertoken = jwt.sign({
                        "userlogin": unik[0]
                    }, "proyekSOA", { expiresIn: '300m' })
                    var replymsg = {
                        "username": req.body.username,
                        "status user": unik[0].tipe_user,
                        "token": usertoken
                    }
                    res.status(200).send(replymsg);
                }
                else {
                    res.status(200).json({
                        message: "Password salah"
                    });
                }
            });
        }
        else {
            res.status(200).json({
                message: "User tidak terdaftar"
            });
        }
    }
    catch (error) {
        return res.status(400).send(error.toString());
    }
});

app.post("/api/banuser", async (req, res) => {
    try {
        var { error } = await joi.object({
            userid: joi.string().required(),
        }).validateAsync(req.body);

        if (!req.header("x-auth-token")) {
            return res.status(401).send({ "message": "UNATHORIZED" });
        }
        try {
            userlogin = jwt.verify(req.header("x-auth-token"), "proyekSOA");
            if (userlogin.userlogin.tipe_user == "admin") {
                var datauser = await user.findAll({ where: { id_user: req.body.userid } });
                if (datauser.length > 0) {
                    user.update({ status_user: 0 }, { where: { id_user: req.body.userid } });
                    return res.status(200).send({ "message": "sukses banned" });
                } else {
                    return res.status(200).send({ "message": "user id tidak ditemukan" });
                }
            }
        } catch (error) {
            res.status(400).send({ "message": "BUKAN ADMIN" });
        }

    } catch (error) {
        return res.status(400).send(error.toString());
    }
});

app.post("/api/topup/:userid", async (req, res) => {
    try {
        var { error } = await joi.object({
            nominal: joi.string().required(),
        }).validateAsync(req.body);

        if (!req.header("x-auth-token")) {
            return res.status(401).send({ "message": "UNATHORIZED" });
        }
        try {
            userlogin = jwt.verify(req.header("x-auth-token"), "proyekSOA");
            if (userlogin.userlogin.tipe_user == "admin") {
                var datauser = await user.findAll({ where: { id_user: req.params.userid } });
                if (datauser.length > 0) {
                    var saldobaruku = datauser[0].saldo_user + parseInt(req.body.nominal);
                    user.update({ saldo_user: saldobaruku }, { where: { id_user: req.params.userid } });
                    return res.status(200).send({ "message": "sukses topup" });
                } else {
                    return res.status(200).send({ "message": "user id tidak ditemukan" });
                }
            }
        } catch (error) {
            res.status(400).send({ "message": "BUKAN ADMIN" });
        }

    } catch (error) {
        return res.status(400).send(error.toString());
    }
});

app.get("/api/cek_saldo/:userid", async (req, res) => {

    try {
        userlogin = jwt.verify(req.header("x-auth-token"), "proyekSOA");
        if (userlogin.userlogin.tipe_user == "user") {
            var datauser = await user.findAll({ where: { id_user: req.params.userid } });
            if (datauser.length > 0) {
                // console.log(datauser[0].saldo_user);
                return res.status(200).send({ "saldo user": datauser[0].saldo_user });
            } else {
                return res.status(200).send({ "message": "user id tidak ditemukan" });
            }
        }
    } catch (error) {
        res.status(400).send({ "message": "BUKAN ADMIN" });
    }
});

app.get("/api/list-winning", async function (req, res) {
    let date_ob = new Date();
    var jamnow = date_ob.getHours() + ":" + date_ob.getMinutes() + ":" + date_ob.getSeconds();

    var jamnya = await Auction.findAll({
        where: {
            waktu_akhir: 
            {
                [Op.lte]: jamnow,
            }
        }
    })

    res.status(200).json(jamnya);
});

app.get("/api/search_action/:auctionid", async (req, res) => {

    try {
        var dataauction = await Auction.findAll({ where: { id_auction: req.params.auctionid } });
        if (dataauction.length > 0) {
            var replymsg = {
                "ID Auction": dataauction[0].id_auction,
                "Nama Auction": dataauction[0].nama,
                "Tanggal Auction": dataauction[0].tanggal,
                "Waktu Awal ": dataauction[0].waktu_awal,
                "Waktu Akhir ": dataauction[0].waktu_akhir,
                "ID Barang": dataauction[0].id_barang,
                "Minimmal Auction": dataauction[0].minimal_bid
            }
            res.status(200).send(replymsg);
        } else {
            return res.status(200).send({ "message": "user id tidak ditemukan" });
        }

    } catch (error) {
        res.status(400).send({ "message": "BUKAN ADMIN" });
    }
});


app.get("/api/list_barang/:min/:max", async function (req, res) {
    let data = await Auction.findAll({
        include: {
            model: Barang,
            where: {
                harga: {
                    [Op.between]: [parseInt(req.params.min), parseInt(req.params.max)]
                }
            },
        },
        include: [{
            model: Jenis,
            attributes: ['nama_jenis'],
            required: false,
            as: "Jenis"
        }],


    });
    if (data_barang.length == 0) {
        return res.status(404).send({ "message": "Barang tidak ditemukan!" });
    }
    return res.status(200).send(data);
});


app.get("/api/list_barang/:jenis", async function (req, res) {
    let { jenis } = req.params;
    let keyword = `%${jenis}%`
    let data = await Auction.findAll({
        include: {
            model: Barang,
            where: {
                id_jenis: {
                    [Op.like]: keyword
                }
            },
        },
    });
    if (data.length == 0) {
        return res.status(404).send({ "message": "barang tidak ditemukan!" });
    }
    return res.status(200).send(data);
});

app.post("/api/create_auction", async function (req, res) {
    let { nama, tanggal, waktu_awal, waktu_akhir, id_barang, minimal_bid } = req.body;
    try {
        let userlogin = jwt.verify(req.header("x-auth-token"), "proyekSOA");
        if (userlogin.userlogin.tipe_user == "admin") {
            let data_auction = await Auction.findAll();
            let newId = "A" + String(data_auction.length + 1).padStart(4, '0')
            var newtanggal = tanggal.split("-").reverse().join("-");
            Auction.create({
                id_auction: newId,
                nama: nama,
                tanggal: newtanggal,
                waktu_awal: waktu_awal,
                waktu_akhir: waktu_akhir,
                id_barang: id_barang,
                minimal_bid: minimal_bid,
            });
            return res.status(200).send({
                id_auction: newId,
                nama: nama,
                tanggal: tanggal,
                waktu_awal: waktu_awal,
                waktu_akhir: waktu_akhir,
                id_barang: id_barang,
                minimal_bid: minimal_bid
            })
        } else {
            res.status(400).send({ "message": "BUKAN ADMIN" });
        }
    } catch (error) {
        res.status(400).send({ "message": "BUKAN ADMIN" });
    }
})


app.post("/api/admin/addBarang", async function (req, res) {

    let barang = null;
    let { nama_barang, id_jenis, harga, detail_barang } = req.body
    const schema = joi.object({
        nama_barang: joi.string().min(10).required(),
        id_jenis: joi.string().required(),
        harga: joi.number().min(1000000).required(),
        detail_barang: joi.string().required()
    })
    try {
        await schema.validateAsync(req.body)
        let newIdPrefix = "B"
        let keyword = `%${newIdPrefix}%`
        let similarUID = await Barang.findAll(
            {
                where: {
                    id_barang: {
                        [Op.like]: keyword
                    }
                }
            }
        )
        let newId = newIdPrefix + String(similarUID.length + 1).padStart(4, '0')
        barang = await Barang.create({
            id_barang: newId,
            nama_barang: nama_barang,
            id_jenis: id_jenis,
            harga: harga,
            detail_barang: detail_barang
        })
    } catch (error) {
        return res.status(400).send({
            message: "Insert Failed",
            error,
        });
    }
    return res.status(201).send({
        barang
    })
});

app.get("/api/nama_barang/:nama", async function (req, res) {
    let nama = req.params.nama;
    let barang = await Barang.findAll({
        where: {
            nama_barang: {
                [Op.eq]: nama.toString()
            }
        },
        attributes:["id_barang","nama_barang","harga"],
        include: [{
            model: Jenis,
            attributes: ['nama_jenis'],
            required: false,
            as:"Jenis"
        }],
    });
    if (barang.length == 0) {
        return res.status(400).send({
            message: "Barang tidak ditemukkan!"
        });
    } 
    return res.status(201).send({
        barang
    })
});

app.get("/api/id_barang/:id", async function (req, res) {
    let id = req.params.id;
    let barang = await Barang.findAll({
        where: {
            id_barang: {
                [Op.eq]: id.toString()
            }
        },
        attributes:["id_barang","nama_barang","harga"],
        include: [{
            model: Jenis,
            attributes: ['nama_jenis'],
            required: false,
            as:"Jenis"
        }],
    });
    if (barang.length == 0) {
        return res.status(400).send({
            message: "Barang tidak ditemukkan!"
        });
    } 
    return res.status(201).send({
        barang
    })
});

app.post("/api/admin/addJenis", async function (req, res) {

    let jenis = null;
    let { nama_jenis } = req.body
    const schema = joi.object({
        nama_jenis: joi.string().min(5).required()
    })
    try {
        await schema.validateAsync(req.body)
        let newIdPrefix = nama_jenis.substring(0, 1).toUpperCase()
        let keyword = `%${newIdPrefix}%`
        let similarUID = await Barang.findAll(
            {
                where: {
                    id_jenis: {
                        [Op.like]: keyword
                    }
                }
            }
        )
        let newId = newIdPrefix + String(similarUID.length + 1).padStart(4, '0')
        jenis = await Jenis.create({
            id_jenis: newId,
            nama_jenis: nama_jenis
        })
    } catch (error) {
        return res.status(400).send({
            message: "Insert Failed",
            error,
        });
    }

    return res.status(201).send({
        jenis
    })

});

app.post("/api/bid_auction", async function (req, res) {
    let { id_auction, bid } = req.body;
    try {
        let userlogin = jwt.verify(req.header("x-auth-token"), "proyekSOA");
        if (userlogin.userlogin.tipe_user == "customer") {
            let data_log_auction = await log_auction.findAll();
            if (data_log_auction.length > 0) {
                if (parseInt(data_log_auction[data_log_auction.length - 1].bid) >= parseInt(bid)) {
                    return res.status(400).send({ "message": "Bid sekarang sudah berada di " + data_log_auction[data_log_auction.length - 1].bid })
                }
            }
            let data_auction = await Auction.findAll({
                where: {
                    id_auction: {
                        [Op.eq]: id_auction
                    }
                }
            });
            if (parseInt(bid) < parseInt(data_auction[0].minimal_bid)) {
                return res.status(400).send({ "message": "Bid kurang dari minimal" });
            }

            let newId = "L" + String(data_log_auction.length + 1).padStart(4, '0');
            var d = new Date();
            let jam = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            if(data_auction[0].waktu_akhir<jam){
                return res.status(400).send({"message":"Waktu auction telah berakhir"});
            }
            // console.log((d.getMonth()+1).toString().padStart(2,"0"));
            // console.log(d.getFullYear()+"-"+((d.getMonth()+1)).toString().padStart(2, '0')+"-"+d.getDate());
            // console.log(data_auction[0].tanggal);
            if (d.getFullYear()+"-"+((d.getMonth()+1)).toString().padStart(2, '0')+"-"+d.getDate()!=data_auction[0].tanggal) {
                return res.status(400).send({"message":"tanggal auction sudah terlewat"});
            }
            let log = await log_auction.create({
                "id_log": newId,
                "id_auction": id_auction,
                "id_user": userlogin.userlogin.id_user,
                "bid": bid,
                "waktu": jam
            });
            await Auction.update({
                pemenang:userlogin.userlogin.id_user
            },
            {
                where: {
                    id_auction: {
                        [Op.eq]: id_auction
                    }
                }                
            });
            return res.status(201).send(log);
        }
    } catch (error) {
        return res.status(400).send({
            message: "Bid Gagal",
            error,
        });
    }
});


app.post("/api/admin/deleteItem/:id_barang", async (req,res) => {
    let id_barang = req.params.id_barang
    try {
        const checkBarang = await Barang.findAll({
            where:{
                id_barang: id_barang
            }
        });
        if (!checkBarang) {
            throw "Barang tidak ada!!";
        }
        barang = await Barang.destroy({
            where:{
                id_barang: id_barang
            }
        });  
    } catch (error) {
        return res.status(400).send({
            message: "Delete Failed!!",
            error,
        });
    }
    return res.status(200).send({
        message: "Delete Success!!"
    })
});
