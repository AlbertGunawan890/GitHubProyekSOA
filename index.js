const express = require("express");
const app = express();
app.set("port", 3000);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const Sequelize = require('sequelize');
const {getDB} = require("./dbase");
const joi = require('joi');
const jwt = require("jsonwebtoken");
const axios = require("axios");
const sequelize = getDB();

const user = require('./models/database/user')(sequelize, Sequelize);

app.listen(app.get("port"), () => {
    console.log(`Server started at http://localhost:${app.get("port")}`);
});

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

        if (double == 0) 
        {
            if (duser.length + 1 < 10) { id_user = "U00" + (duser.length + 1).toString(); }
            else if (duser.length + 1 < 100) { id_user = "U0" + (duser.length + 1).toString(); }
            else { id_user = "U" + (duser.length + 1).toString(); }

            user.create({
                id_user: id_user,
                nama_user: req.body.nama,
                username_user: req.body.username,
                password_user: req.body.password,
                nik_user: req.body.nik,
                alamat_user: req.body.alamat,
                notelp_user: req.body.notelp,
                tipe_user: tipeUser,
                saldo_user: saldo
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
                    saldo_user: 0
                });
            }).catch(err => console.error(err.message))
        }
        else 
        {
            return res.status(400).send({
                message: "username sudah terdaftar"
            });
        }
    }).catch((err) => {});
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

        if (double == 0) 
        {
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
                saldo_user: saldo
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
                    saldo_user: 0
                });
            }).catch(err => console.error(err.message))
        }
        else 
        {
            return res.status(400).send({
                message: "username sudah terdaftar"
            });
        }
    }).catch((err) => {});
});

app.post("/api/login", async (req, res) => {

    try {
        var { error } = await joi.object({ 
            username: joi.string().required(),
            password: joi.string().required(), 
        }).validateAsync(req.body); 

        var [unik] = await sequelize.query(`select * from users where username_user = "${req.body.username}"`);

        if(unik.length > 0) {
            var [unik] = await sequelize.query(`select * from users where username_user = "${req.body.username}" and password_user = "${req.body.password}"`);
            if(unik.length > 0) {
                var usertoken = jwt.sign({
                    "userlogin": unik[0]
                }   ,"proyekSOA", {expiresIn: '100m'})
                var replymsg = {
                    "username": req.body.username,
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
    catch(error) {
        return res.status(400).send(error.toString());        
    }
});