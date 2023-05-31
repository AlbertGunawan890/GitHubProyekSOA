const express = require("express");
const app = express();
app.set("port", 3000);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const Sequelize = require('sequelize');
const { getDB } = require("./dbase");
const joi = require('joi');
const jwt = require("jsonwebtoken");
const axios = require("axios");
const sequelize = getDB();

const user = require('./models/database/user')(sequelize, Sequelize);

app.listen(app.get("port"), () => {
    console.log(`Server started at http://localhost:${app.get("port")}`);
});
// status user 1 => akftif
// status user 0 => tidak akftif


app.post("/api/register/customer", async (req, res) => {
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
        var tipeUser = "user";
        var saldo = 0;

        for (var i = 0; i < duser.length; i++) {
            if (duser[i].username == req.body.username) {
                double += 1;
            }
        }

        if (double == 0) {
            if (duser.length + 1 < 10) { id_user = "C00" + (duser.length + 1).toString(); }
            else if (duser.length + 1 < 100) { id_user = "C0" + (duser.length + 1).toString(); }
            else { id_user = "C" + (duser.length + 1).toString(); }

            user.create({
                id_user: id_user,
                nama_user: req.body.nama,
                username_user: req.body.username,
                password_user: req.body.password,
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
                    password_user: req.body.password,
                    nik_user: req.body.nik,
                    alamat_user: req.body.alamat,
                    notelp_user: req.body.notelp,
                    tipe_user: tipeUser,
                    saldo_user: 0,
                    status_user: 1
                });
            }).catch(err => console.error(err.message))
        }
        else {
            return res.status(400).send({
                message: "username sudah terdaftar"
            });
        }
    }).catch((err) => { });
});

app.post("/api/register/admin", async (req, res) => {
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
        var tipeUser = "admin";
        var saldo = 0;
        for (var i = 0; i < duser.length; i++) {
            if (duser[i].username == req.body.username) {
                double += 1;
            }
        }

        if (double == 0) {
            if (duser.length + 1 < 10) { id_user = "A00" + (duser.length + 1).toString(); }
            else if (duser.length + 1 < 100) { id_user = "A0" + (duser.length + 1).toString(); }
            else { id_user = "A" + (duser.length + 1).toString(); }

            user.create({
                id_user: id_user,
                nama_user: req.body.nama,
                username_user: req.body.username,
                password_user: req.body.password,
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
                    password_user: req.body.password,
                    nik_user: req.body.nik,
                    alamat_user: req.body.alamat,
                    notelp_user: req.body.notelp,
                    tipe_user: tipeUser,
                    saldo_user: 0,
                    status_user: 1
                });
            }).catch(err => console.error(err.message))
        }
        else {
            return res.status(400).send({
                message: "username sudah terdaftar"
            });
        }
    }).catch((err) => { });
});

app.post("/api/login", async (req, res) => {

    try {
        var { error } = await joi.object({
            username: joi.string().required(),
            password: joi.string().required(),
        }).validateAsync(req.body);

        var [unik] = await sequelize.query(`select * from users where username_user = "${req.body.username}"`);

        if (unik.length > 0) {
            var [unik] = await sequelize.query(`select * from users where username_user = "${req.body.username}" and password_user = "${req.body.password}"`);
            if (unik.length > 0) {
                var usertoken = jwt.sign({
                    "userlogin": unik[0]
                }, "proyekSOA", { expiresIn: '100m' })
                var replymsg = {
                    "username": req.body.username,
                    "status user" : unik[0].tipe_user,
                    "token": usertoken
                }
                res.status(200).send(replymsg);
            }
            else {
                res.status(200).json({
                    message: "Password salah"
                });
            }
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
                var [datauser] = await sequelize.query(`select * from users where id_user = '${req.body.userid}' `);
                if (datauser.length > 0) {
                    await sequelize.query(`update users set status_user="0" where id_user = '${req.body.userid}' `);
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
                var [datauser] = await sequelize.query(`select * from users where id_user = '${req.params.userid}' `);
                if (datauser.length > 0) {
                    await sequelize.query(`update users set saldo_user= '${req.body.nominal}' where id_user = '${req.params.userid}' `);
                    return res.status(200).send({ "message": "sukses menambahkan" });
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