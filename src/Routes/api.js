const express = require('express');
const router = express.Router()


const MemberControler = require("../Controllers/MemberController")


//MEMBER API
router.post('/member', MemberControler.AddMember )
router.get('/members', MemberControler.MemberList )
router.post('/member/:memberID', MemberControler.UpdateMember)





module.exports = router