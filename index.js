const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

app.use(cors())
app.use(express.json())

//Connect to Database
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'QuanLySpa'
})
//Listen on port 3001
app.listen(3001,()=>{
    console.log('Yey, your server is running on port 3001')
})


// ----------------------------------- Device---------------------------------
//List device
app.get('/listDevice',(req,res)=>{
    const sql = 'SELECT (CONVERT(substring(MaTB,4), UNSIGNED)) AS soCuoiMaTB, MaTB, TenTB, HinhAnh ,TenPhong FROM ThietBi t JOIN Phong p ON t.MaPhong = p.MaPhong ORDER BY soCuoiMaTB ASC'
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
            console.log('Lỗi select * from ThietBi')
        }else{
            res.send(result)
        }
    })
})

//Get final MaTB device
app.get('/getFinalMaTB',(req,res)=>{
    const sql = 'SELECT s.SoCuoiMaTB FROM ( SELECT (CONVERT(substring(MaTB,4), UNSIGNED)) AS SoCuoiMaTB FROM ThietBi) s ORDER BY s.SoCuoiMaTB DESC LIMIT 1'
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error: Get faile!')
        }
    })  
})

//Add device
app.post('/addDevice',(req,res)=>{
    const maTB = req.body.maTB
    const tenTB = req.body.tenTB
    const hinhanhTB = req.body.hinhanhTB

    const sql = 'INSERT INTO ThietBi (MaTB,TenTB,HinhAnh) VALUES(?,?,?)'
    db.query(sql,[maTB,tenTB,hinhanhTB],(err,result)=>{
        if(!err){
            res.send('Added device')
        }else{
            console.log(err)
            res.send('Error: Add device')
        }
    })
    
})

//Get infomation of device to edit
app.get('/getDevice/:maTB',(req,res)=>{
    const maTB = req.params.maTB

    const sql = 'SELECT * FROM ThietBi WHERE MaTB = ?'
    db.query(sql,maTB,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error: get information of device')
        }
    })
})
//Update device
app.put('/updateDevice/:maTB',(req,res)=>{
    const maTB = req.params.maTB
    const tenTB = req.body.tentbEdit
    const hinhanhTB = req.body.hinhanhtbEdit

    console.log(maTB)
    console.log(tenTB)
    console.log(hinhanhTB)

    const sql = 'UPDATE ThietBi SET TenTB = ? , HinhAnh = ? WHERE MaTB = ?'
    db.query(sql,[tenTB,hinhanhTB,maTB],(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            res.send('Error')
        }
    })
})

//Delete device
app.delete('/deleteDevice/:maTB',(req,res)=>{
    const maTB = req.params.maTB

    const sql = 'DELETE FROM ThietBi WHERE MaTB = ?'
    db.query(sql,maTB,(err,result)=>{
        if(!err){
            res.send('Deleted device')
        }else{
            console.log(err)
            res.send('Error: delete device')
        }
    })
})

// ---------------------------Service---------------------------

app.get('/listService',(req,res)=>{
    const sql = 'SELECT * FROM DichVu'
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            res.send(err)
        }
    })
})


//Get final MaDV service
app.get('/getFinalMaDV',(req,res)=>{
    const sql = 'SELECT s.SoCuoiMaDV FROM ( SELECT (CONVERT(substring(MaDV,4), UNSIGNED)) AS SoCuoiMaDV FROM DichVu) s ORDER BY s.SoCuoiMaDV DESC LIMIT 1'
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error: Get faile!')
        }
    })  
})


//Add service
app.post('/addService',(req,res)=>{
    const maDV = req.body.maDV
    const tenDV = req.body.tenDV
    const giaDV = req.body.giaDV

    const sql = 'INSERT INTO DichVu (MaDV,TenDV,Gia) VALUES(?,?,?)'
    db.query(sql,[maDV,tenDV,giaDV],(err,result)=>{
        if(!err){
            res.send('Added service')
        }else{
            console.log(err)
            res.send('Error: Add service')
        }
    })
    
})


//Get infomation of service to edit
app.get('/getServiceEdit/:maDV',(req,res)=>{
    const maDV = req.params.maDV

    const sql = 'SELECT * FROM DichVu WHERE MaDV = ?'
    db.query(sql,maDV,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error: Get information of service')
        }
    })
})

//Update service
app.put('/updateService/:maDV',(req,res)=>{
    const maDV = req.params.maDV
    const tenDV = req.body.tendvEdit
    const giaDV = req.body.giadvEdit

    console.log(maDV)
    console.log(tenDV)
    console.log(giaDV)

    const sql = 'UPDATE DichVu SET TenDV = ? , Gia = ? WHERE MaDV = ?'
    db.query(sql,[tenDV,giaDV,maDV],(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            res.send('Error')
        }
    })

})


//Delete service
app.delete('/deleteService/:maDV',(req,res)=>{
    const maDV = req.params.maDV

    const sql = 'DELETE FROM DichVu WHERE MaDV = ?'
    db.query(sql,maDV,(err,result)=>{
        if(!err){
            res.send('Deleted service')
        }else{
            console.log(err)
            res.send('Error: Delete service')
        }
    })
})


// ---------------------------Staff---------------------------
//List staff
app.get('/listStaff',(req,res)=>{
    const sql = "SELECT * FROM NhanVien WHERE MaNV <> 'NV00'"
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
            
        }else{
            res.send(err)
        }
    })
})


//Get final MaNV staff
app.get('/getFinalMaNV',(req,res)=>{
    const sql = 'SELECT s.SoCuoiMaNV FROM ( SELECT (CONVERT(substring(MaNV,4), UNSIGNED)) AS SoCuoiMaNV FROM NhanVien) s ORDER BY s.SoCuoiMaNV DESC LIMIT 1'
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error: Get faile!')
        }
    })  
})

//Add staff
app.post('/addStaff',(req,res)=>{
    const maNV = req.body.maNV
    const tenNV = req.body.tenNV
    const gioitinhNV = req.body.gioitinhNV
    const namsinhNV = req.body.namsinhNV
    const emailNV = req.body.emailNV
    const sdtNV = req.body.sdtNV
    const diachiNV = req.body.diachiNV
    const matkhauNV = req.body.matkhauNV
    const hinhanhNV = req.body.hinhanhNV

    
    console.log(maNV)
    console.log(tenNV)
    console.log(gioitinhNV)
    console.log(namsinhNV)
    console.log(emailNV)
    console.log(sdtNV)
    console.log(diachiNV)
    console.log(matkhauNV)
    console.log( hinhanhNV)

    // const sql = 'INSERT INTO NhanVien (MaNV,TenNV,GioiTinh,NamSinh,Email,SDT,DiaChiNV,MatKhau,HinhAnh) VALUES(?,?,?,?,?,?,?,?,?)'
    // db.query(sql,[maNV,tenNV,gioitinhNV,namsinhNV,emailNV,sdtNV,diachiNV,matkhauNV,hinhanhNV],(err,result)=>{
    //     if(!err){
    //         res.send('Success')
    //     }else{
    //         console.log(err)
    //         res.send('Error')
    //     }
    // })
    
})


//Detail staff
//Get infomation of staff
app.get('/getStaff/:maNV',(req,res)=>{
    const maNV = req.params.maNV

    const sql = 'SELECT * FROM NhanVien WHERE MaNV = ?'
    db.query(sql,maNV,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error: Get information of staff')
        }
    })
})

//Delete staff
app.delete('/deleteStaff/:maNV',(req,res)=>{
    const maNV = req.params.maNV

    const sql = 'DELETE FROM NhanVien WHERE MaNV = ?'
    db.query(sql,maNV,(err,result)=>{
        if(!err){
            res.send('Deleted service')
        }else{
            console.log(err)
            res.send('Error: Delete service')
        }
    })
})



//Update staff
app.put('/updateStaff/:maNV',(req,res)=>{
    const maNV = req.params.maNV
    const tenNV = req.body.tenNV
    const gioitinhNV = req.body.gioitinhNV
    const namsinhNV = req.body.namsinhNV
    const emailNV = req.body.emailNV
    const sdtNV = req.body.sdtNV
    const diachiNV = req.body.diachiNV
    const matkhauNV = req.body.matkhauNV
    const hinhanhNV = req.body.hinhanhNV

    console.log(req.params)
    console.log(req.body)

    const sql = 'UPDATE NhanVien SET TenNV = ? , GioiTinh = ? , NamSinh = ? , Email = ? , SDT = ? , DiaChiNV = ? , MatKhau = ? , HinhAnh = ? WHERE MaNV = ?'
    db.query(sql,[tenNV,gioitinhNV,namsinhNV,emailNV,sdtNV,diachiNV,matkhauNV,hinhanhNV,maNV],(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            res.send('Error')
        }
    })
})

// ---------------------------Room---------------------------
//List room
app.get('/listRoom',(req,res)=>{
    const sql = 'SELECT * FROM Phong'
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
            
        }else{
            res.send(err)
        }
    })
})

//Get list device to add room
app.get('/getDeviceToAddRoom',(req,res)=>{
    const sql = 'SELECT * FROM ThietBi WHERE MaPhong = ?'
    db.query(sql,'MP00',(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            res.send(err)
            console.log('Lỗi select * from ThietBi')
        }
    })
})

//Get final MaPhong room
app.get('/getFinalMaPhong',(req,res)=>{
    const sql = 'SELECT s.SoCuoiMaPhong FROM ( SELECT (CONVERT(substring(MaPhong,4), UNSIGNED)) AS SoCuoiMaPhong FROM Phong) s ORDER BY s.SoCuoiMaPhong DESC LIMIT 1'
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error: Get faile!')
        }
    })  
})

//Update MaPhong of device
app.post('/updateMaPhongOfDevice',(req,res)=>{
    const maPhong = req.body.maPhong
    const maTB = req.body.maTB
    console.log(maPhong)
    console.log(maTB)
    //update lại thiet bi
    const sql = 'UPDATE ThietBi SET MaPhong = ? WHERE MaTB = ?'
    db.query(sql,[maPhong,maTB],(err,result)=>{
        if(!err){
            res.send('Success')
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})

//Get MaTB in room to delete
app.get('/getDeviceInRoom/:maPhong',(req,res)=>{
    const maPhong = req.params.maPhong

    const sql = 'SELECT MaTB, TenTB, HinhAnh FROM ThietBi t JOIN Phong p ON t.MaPhong = p.MaPhong WHERE t.MaPhong = ?'
    db.query(sql,maPhong,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            res.send(err)
        }
    })
})


//Get infomation of room
app.get('/getRoom/:maPhong',(req,res)=>{
    const maPhong = req.params.maPhong

    const sql = 'SELECT * FROM Phong WHERE MaPhong = ?'
    db.query(sql,maPhong,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error: Get information of room')
        }
    })
})


//Add room
app.post('/addRoom',(req,res)=>{
    const maPhong = req.body.maPhong
    const tenPhong = req.body.tenPhong

    console.log(maPhong)
    console.log(tenPhong)

    const sql = 'INSERT INTO Phong (MaPhong,TenPhong) VALUES(?,?)'
    db.query(sql,[maPhong,tenPhong],(err,result)=>{
        if(!err){
            res.send(`Success`)
        }else{
            console.log(err)
            res.send('Error')
        }
    }) 
})

//Update Room
app.put('/updateRoom/:maPhong',(req,res)=>{
    const maPhong = req.params.maPhong
    const tenPhong = req.body.tenPhong
    const trangthaiPhong = req.body.trangthaiPhong

    console.log(maPhong)
    console.log(tenPhong)
    console.log(trangthaiPhong)

    const sql = 'UPDATE Phong SET TenPhong = ? , TrangThai = ? WHERE MaPhong = ?'
    db.query(sql,[tenPhong,trangthaiPhong,maPhong],(err,result)=>{
        if(!err){
            res.send('Update success')
        }else{
            res.send('Error update')
        }
    })
})


//Delete room
app.delete('/deleteRoom/:maPhong',(req,res)=>{
    const maPhong = req.params.maPhong

    const sql = 'DELETE FROM Phong WHERE MaPhong = ?'
    db.query(sql,maPhong,(err,result)=>{
        if(!err){
            res.send('Success')
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})
// ---------------------------Management Bill---------------------------
//Lấy danh sách các hóa đơn có do nhân nhân viên có MaNV = maNV lập
app.get('/ListBill',(req,res)=>{

    const sql = "SELECT MaHD, hd.MaPhieu, hd.MaNV, TenNV, date_format(NgayLapHD,'%d-%m-%Y') AS NgayLapHD, "
                + 'pdk.MaKH , TenKH , kh.GioiTinh, kh.NamSinh, kh.Email, kh.SDT, DiaCHiKH, CONVERT(substring(MaHD,4), UNSIGNED) AS SoCuoiMaHD '
                + 'FROM HoaDon hd JOIN NhanVien nv 	ON nv.MaNV = hd.MaNV '
                + 'JOIN PhieuDangKy pdk ON pdk.MaPhieu = hd.MaPhieu '
                + 'JOIN KhachHang kh 	ON kh.MaKH = pdk.MaKH '
                + 'ORDER BY SoCuoiMaHD ASC '

    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            res.send(err)
        }
    })
})

app.delete('/deleteBill/:maHD',(req,res)=>{
    const maHD = req.params.maHD
    console.log(maHD)

    const sql = 'DELETE FROM HoaDon WHERE MaHD = ?'
    db.query(sql,maHD,(err,result)=>{
        if(!err){
            res.send('Success')
        }else{
            res.send('Error')
        }
    })
})

// ---------------------------LoginStaff---------------------------
app.post('/loginStaff',(req,res)=>{
    const email = req.body.email
    const password = req.body.password

    console.log(email)
    console.log(password)

    const sql = 'SELECT * FROM NhanVien WHERE Email = ? and MatKhau = ?'
    db.query(sql,[email,password],(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})



// ---------------------------STAFF---------------------------
// ---------------------RegisterServices---------------------------
// Lay thong tin cua phieu kham tu maNV
app.get('/getRegistration_Customer_Staff',(req,res)=>{
    // const maNV = req.params.maNV
    // const nv00 = 'NV00'

    const sql = 'SELECT pdk.MaPhieu, pdk.MaNV, TrangThai, TenNV, pdk.MaPhong, pdk.MaKH, TenKH, kh.NamSinh, kh.GioiTinh,' + 
                'kh.Email, kh.SDT, DiaChiKH, GhiChu,CONVERT(substring(pdk.MaNV,4), UNSIGNED) AS SoCuoiMaNV ' +
                'FROM PhieuDangKy pdk JOIN KhachHang kh ON kh.MaKH = pdk.MaKH JOIN NhanVien nv ON nv.MaNV = pdk.MaNV '+
                "WHERE TrangThai='Chưa thanh toán' "+ 'ORDER BY SoCuoiMaNV ASC '
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})

//Lay thong tin cua khach hang tu phieu dang ky 
app.get('/getRegistration_Customer_Room_Time/:maPhieu',(req,res)=>{
    const maPhieu = req.params.maPhieu

    const sql = "SELECT pdk.MaPhieu, date_format(NgaySuDung,'%d-%m-%Y') AS NgaySuDung, date_format(NgaySuDung,'%Y-%m-%d') AS NgaySuDungMoi, date_format(NgayLapPhieu,'%d-%m-%Y') AS NgayLapPhieu , pdk.TrangThai, pdk.MaPhong, TenPhong, pdk.STT, Gio, pdk.MaKH, TenKH, NamSinh, GioiTinh, Email, SDT, DiaChiKH, GhiChu " + 
                'FROM PhieuDangKy pdk JOIN KhachHang kh ON kh.MaKH = pdk.MaKH  JOIN Phong p on p.MaPhong = pdk.MaPhong JOIN ThoiGian tg ON tg.STT = pdk.STT ' +
                'WHERE pdk.MaPhieu = ? '
    db.query(sql,maPhieu,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})

//Lay dich vu cua khach hang dang ky tu phieu dang ky (join bang PhieuDangKy - PhieuDangKy_DichVu - DichVu)
app.get('/getRegistration_Registration-Service_Service/:maPhieu',(req,res)=>{
    const maPhieu = req.params.maPhieu

    const sql = 'SELECT pdk.MaPhieu, TrangThai, pdk.MaPhong , pdk_dv.MaDV , TenDV, Gia ' + 
                'FROM PhieuDangKy pdk join PhieuDangKy_DichVu pdk_dv on pdk.MaPhieu = pdk_dv.MaPhieu join DichVu dv on dv.MaDv = pdk_dv.MaDV ' +
                'WHERE pdk.MaPhieu = ? '
    db.query(sql,maPhieu,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})


//Thêm phiếu đăng ký

//Lấy danh sách phòng có trạng thái là hoạt động và không phải là kho thiết bị (MP00)
app.get('/getListRoom',(req,res)=>{

    const maPhong00 = 'MP00'
    // const maPhongTrong = 'KHDK'

    // const sql = 'SELECT * FROM Phong WHERE ( MaPhong <> ? ) AND ( MaPhong <> ? )'
    const sql = 'SELECT * FROM Phong WHERE MaPhong <> ? '
    db.query(sql,[maPhong00],(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})

//Lấy danh sách thời gian
app.get('/getListTime',(req,res)=>{

    const sql = 'SELECT * FROM ThoiGian'
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})


//Lấy danh sách dịch vụ
app.get('/getListService',(req,res)=>{

    const sql = 'SELECT * FROM DichVu'
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})


//Lấy số cuối của MaKH của mẫu tin cuối trong bảng KhachHang
app.get('/getFinalMaKH',(req,res)=>{
    const sql = 'SELECT s.SoCuoiMaKH FROM ( SELECT (CONVERT(substring(MaKh,4), UNSIGNED)) AS SoCuoiMaKH FROM KhachHang) s ORDER BY s.SoCuoiMaKH DESC LIMIT 1 '
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })  
})

//Lấy số cuối của MaPhieu ở mẫu tin cuối trong bảng PhieuDangKy
app.get('/getFinalMaPhieu',(req,res)=>{
    const sql = 'SELECT s.SoCuoiMaPhieu FROM ( SELECT (CONVERT(substring(MaPhieu,5), UNSIGNED)) AS SoCuoiMaPhieu FROM PhieuDangKy ) s ORDER BY s.SoCuoiMaPhieu DESC LIMIT 1'
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })  
})


//Thêm khách hàng

app.post('/addCustomer',(req,res)=>{
    const maKH = req.body.maKH
    const tenKH = req.body.tenKH
    const gioitinhKH = req.body.gioitinhKH
    const namsinhKH = req.body.namsinhKH
    const emailKH = req.body.emailKH
    const sdtKH = req.body.sdtKH
    const diachiKH = req.body.diachiKH
    console.log(maKH)
    console.log(tenKH)
    console.log(gioitinhKH)
    console.log(namsinhKH)
    console.log(emailKH)
    console.log(sdtKH)
    console.log(diachiKH)

    const sql = 'INSERT INTO KhachHang(MaKH,TenKH,GioiTinh,NamSinh,Email,SDT,DiaChiKH)' + 
                'VALUES(?,?,?,?,?,?,?)'
    db.query(sql,[maKH,tenKH,gioitinhKH,namsinhKH,emailKH,sdtKH,diachiKH],(err,result)=>{
        if(!err){
            res.send('Success')
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})

//Thêm phiếu đăng ký
app.post('/addRegistration',(req,res)=>{
    const maPhieu = req.body.maPhieu
    const maKH = req.body.maKH
    const maNV = req.body.maNV
    const maPhong = req.body.maPhong
    const sttGio = req.body.sttGio
    const ngaySD = req.body.ngaySD
    const ngayLapPhieu = req.body.ngayLapPhieu

                                            
    console.log(maPhieu)
    console.log(maKH)
    console.log(maNV)
    console.log(maPhong)
    console.log(sttGio)
    console.log(ngayLapPhieu)
    console.log(ngaySD)


    const sql = 'INSERT INTO PhieuDangKy(MaPhieu,MaKH,MaNV,MaPhong,STT,NgaySuDung,NgayLapPhieu)' + 
                'VALUES(?,?,?,?,?,?,?)'
    db.query(sql,[maPhieu,maKH,maNV,maPhong,sttGio,ngaySD,ngayLapPhieu],(err,result)=>{
        if(!err){
            res.send('Success')
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})

//Thêm MaPhieu và MaDV vào bảng PhieuDangKy_DichVu

app.post('/addRegistrationAndService',(req,res)=>{
    const maPhieu = req.body.maPhieu
    const maDV = req.body.maDV

    console.log(maPhieu)
    console.log(maDV)

    const sql = 'INSERT INTO PhieuDangKy_DichVu(MaPhieu,MaDV)' + 
                'VALUES(?,?)'
    db.query(sql,[maPhieu,maDV],(err,result)=>{
        if(!err){
            res.send('Success')
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})

//Xóa các MaDV có MaPhieu là ...
app.delete('/deleteRegistrationAndService/:maPhieu',(req,res)=>{
    const maPhieu = req.params.maPhieu

    console.log(maPhieu)

    const sql = 'DELETE FROM PhieuDangKy_DichVu WHERE MaPhieu = ?'
            
    db.query(sql,maPhieu,(err,result)=>{
        if(!err){
            res.send('Success')
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})

//Xóa phiếu đăng ký có mã là ...
app.delete('/deleteRegistration/:maPhieu',(req,res)=>{
    const maPhieu = req.params.maPhieu

    console.log(maPhieu)

    const sql = 'DELETE FROM PhieuDangKy WHERE MaPhieu = ?'
            
    db.query(sql,maPhieu,(err,result)=>{
        if(!err){
            res.send('Success')
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})

//Xóa khách hàng có MaKH là ...
app.delete('/deleteCustomer/:maKH',(req,res)=>{
    const maKH = req.params.maKH

    console.log(maKH)

    const sql = 'DELETE FROM KhachHang WHERE MaKH = ?'
            
    db.query(sql,maKH,(err,result)=>{
        if(!err){
            res.send('Success')
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})

//Lấy thông tin của phiếu đăng kí từ maPhieu
app.get('/getRegistration_Customer_Room_Time/:maPhieu',(req,res)=>{
    const maPhieu = req.params.maPhieu

    const sql = 'SELECT pdk.MaPhieu, pdk.TrangThai, NgaySuDung, NgayLapPhieu , pdk.MaPhong, TenPhong, pdk.STT, Gio, pdk.MaKH, TenKH, NamSinh, GioiTinh, Email, SDT, DiaChiKH, GhiChu '
                + 'FROM PhieuDangKy pdk '
                + 'JOIN KhachHang kh ON kh.MaKH = pdk.MaKH '
                + 'JOIN Phong p on p.MaPhong = pdk.MaPhong '
                + 'JOIN ThoiGian tg ON tg.STT = pdk.STT '
                + 'WHERE pdk.MaPhieu = ?'

    db.query(sql,maPhieu,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            res.send(err)
        }
    })
})


//Lấy các dịch vụ có MaPhieu = maPhieu
app.get('/getRegistration_Services/:maPhieu',(req,res)=>{
    const maPhieu = req.params.maPhieu

    const sql = 'SELECT MaPhieu, pdk_dv.MaDV, TenDV, Gia '
                + 'FROM PhieuDangKy_DichVu pdk_dv '
                + 'JOIN DichVu dv ON dv.MaDV = pdk_dv.MaDV '
                + 'WHERE MaPhieu = ?'

    db.query(sql,maPhieu,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            res.send(err)
        }
    })
})

//
//Lấy các dịch vụ không có trong phiếu có MaPhieu = maPhieu
app.get('/getListSevice_NotIn_Registration/:maPhieu',(req,res)=>{
    const maPhieu = req.params.maPhieu

    const sql = 'SELECT * FROM DichVu '
                + 'WHERE MaDV NOT IN '
                + '( SELECT pdk_dv.MaDV FROM PhieuDangKy_DichVu pdk_dv JOIN DichVu dv ON dv.MaDV = pdk_dv.MaDV WHERE MaPhieu = ? )'

    db.query(sql,maPhieu,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            res.send(err)
        }
    })
})


//Cập nhật thông tin khách hàng có MaKH = maKH
app.put('/updateCustomer',(req,res)=>{
    const maKH = req.body.maKH
    const tenKH = req.body.tenKH
    const gioitinhKH = req.body.gioitinhKH
    const namsinhKH = req.body.namsinhKH
    const emailKH = req.body.emailKH
    const sdtKH = req.body.sdtKH
    const diachiKH = req.body.diachiKH

    console.log(maKH)
    console.log(tenKH)
    console.log(gioitinhKH)
    console.log(namsinhKH)
    console.log(emailKH)
    console.log(sdtKH)
    console.log(diachiKH)

    const sql = 'UPDATE KhachHang SET TenKH = ? , GioiTinh = ? , NamSinh = ? , Email = ? , SDT = ? , DiaChiKH = ? '
                + 'WHERE MaKH = ?'

    db.query(sql,[tenKH,gioitinhKH,namsinhKH,emailKH,sdtKH,diachiKH,maKH],(err,result)=>{
        if(!err){
            res.send('Success')
        }else{
            res.send('Error')
        }
    })
})


//Cập nhật thông tin phiếu đăng ký có MaPhieu = maPhieu
app.put('/updateRegistration',(req,res)=>{
    const maPhieu = req.body.maPhieu
    const maPhong = req.body.maPhong
    const maNV = req.body.maNV
    const sttGio = req.body.sttGio
    const ngaySD = req.body.ngaySD


    console.log('maPhieu',maPhieu)
    console.log('maPhong',maPhong)
    console.log('maNV',maNV)
    console.log('sstGio',sttGio)
    console.log('ngaySD',ngaySD)

    const sql = 'UPDATE PhieuDangKy SET MaNV = ? , MaPhong = ? , STT = ? , NgaySuDung = ?' 
                + 'WHERE MaPhieu = ?'

    db.query(sql,[maNV,maPhong,sttGio,ngaySD,maPhieu],(err,result)=>{
        if(!err){
            res.send('Success')
        }else{
            res.send('Error')
        }
    })
})


//Xóa mẫu tin có MaPhieu = maPhieu và MaDV = maDv trong bảng PhieuDangKy_DichVu
app.delete('/deleteRegistrationAndService/:maPhieu/:maDV',(req,res)=>{
    const maPhieu = req.params.maPhieu
    const maDV = req.params.maDV

    console.log(maPhieu)
    console.log(maDV)

    const sql = 'DELETE FROM PhieuDangKy_DichVu WHERE MaPhieu = ? && MaDV = ?'
            
    db.query(sql,[maPhieu,maDV],(err,result)=>{
        if(!err){
            res.send('Success')
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})


// ---------------------Bills---------------------------
//Lấy danh sách các hóa đơn có do nhân nhân viên có MaNV = maNV lập
app.get('/getListBill/:maNV',(req,res)=>{

    const maNV = req.params.maNV
    console.log(maNV)

    const sql = "SELECT MaHD, hd.MaPhieu, hd.MaNV, TenNV, date_format(NgayLapHD,'%d-%m-%Y') AS NgayLapHD, "
                + 'pdk.MaKH , TenKH , kh.GioiTinh, kh.NamSinh, kh.Email, kh.SDT, DiaCHiKH '
                + 'FROM HoaDon hd JOIN NhanVien nv 	ON nv.MaNV = hd.MaNV '
                + 'JOIN PhieuDangKy pdk ON pdk.MaPhieu = hd.MaPhieu '
                + 'JOIN KhachHang kh 	ON kh.MaKH = pdk.MaKH '
                + 'WHERE hd.MaNV = ?'

    db.query(sql,maNV,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            res.send(err)
        }
    })
})

//Lấy thông tin hóa đơn có MaHD = maHD
app.get('/getBill/:maHD',(req,res)=>{

    const maHD = req.params.maHD
    console.log(maHD)

    const sql = "SELECT MaHD, hd.MaPhieu, hd.MaNV, TenNV, date_format(NgayLapHD,'%d-%m-%Y') AS NgayLapHD, "
                + 'pdk.MaKH , TenKH , kh.GioiTinh, kh.NamSinh, kh.Email, kh.SDT, DiaCHiKH '
                + 'FROM HoaDon hd JOIN NhanVien nv 	ON nv.MaNV = hd.MaNV '
                + 'JOIN PhieuDangKy pdk ON pdk.MaPhieu = hd.MaPhieu '
                + 'JOIN KhachHang kh 	ON kh.MaKH = pdk.MaKH '
                + 'WHERE MaHD = ?'

    db.query(sql,maHD,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            res.send(err)
        }
    })
})


//Tổng tiền của bill
app.get('/getTotalMoneyBill/:maPhieu',(req,res)=>{
    const maPhieu = req.params.maPhieu

    const sql = 'SELECT pdk.MaPhieu , SUM(Gia) TongTien '
                + 'FROM PhieuDangKy pdk JOIN PhieuDangKy_DichVu pdk_dv ON pdk.MaPhieu = pdk_dv.MaPhieu JOIN DichVu dv ON dv.MaDv = pdk_dv.MaDV '
                + 'WHERE pdk.MaPhieu = ? '
                + 'GROUP BY pdk.MaPhieu '
    db.query(sql,maPhieu,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})

//Lấy những phiếu đăng ký chưa thanh toán
app.get('/getListRegistrationNotPay',(req,res)=>{
    const sql = "SELECT *, CONVERT(substring(MaPhieu,5), UNSIGNED) AS SoCuoiMaPhieu FROM PhieuDangKy "
                + "WHERE TrangThai = 'Chưa thanh toán' AND MaNV <> 'NV00' "
                + 'ORDER BY SoCuoiMaPhieu ASC'
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })  
})


//Lấy số cuối của MaHD ở mẫu tin cuối trong bảng HoaDon
app.get('/getFinalMaHD',(req,res)=>{
    const sql = 'SELECT s.SoCuoiMaHD FROM ( SELECT (CONVERT(substring(MaHD,4), UNSIGNED)) AS SoCuoiMaHD FROM HoaDon ) s ORDER BY s.SoCuoiMaHD DESC LIMIT 1'
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })  
})

//Thêm bill
app.post('/addBill',(req,res)=>{

    const maHD = req.body.maHD
    const maPhieu = req.body.maPhieu
    const maNV = req.body.maNV
    const ngayLapHD = req.body.ngayLapHD


    console.log(maHD)
    console.log(maPhieu)
    console.log(maNV)
    console.log(ngayLapHD)


    const sql = 'INSERT INTO HoaDon(MaHD,MaPhieu,MaNV,NgayLapHD)' + 
                'VALUES(?,?,?,?)'
    db.query(sql,[maHD,maPhieu,maNV,ngayLapHD],(err,result)=>{
        if(!err){
            res.send('Success')
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})

//Sau khi thêm bill thì cập nhật lại trạng thái của phiếu đăng ký là đã thanh toán
app.put('/updateRegistrationState',(req,res)=>{
    const maPhieu = req.body.maPhieu

    console.log('maPhieu',maPhieu)

    const sql = "UPDATE PhieuDangKy SET TrangThai = 'Đã thanh toán' "
                + 'WHERE MaPhieu = ?'

    db.query(sql,maPhieu,(err,result)=>{
        if(!err){
            res.send('Success')
        }else{
            res.send('Error')
        }
    })
})




// ---------------------TakeCareOf---------------------------
//Lấy những danh sách khách hàng có ghi chú (có nội dung cần tư vấn)

app.get('/getCustomerNeedHelp',(req,res)=>{
    // const maNV = req.params.maNV
    // const nv00 = 'NV00'

    const sql = 'SELECT *,CONVERT(substring(MaKH,4), UNSIGNED) AS SoCuoiMaKH FROM KhachHang ' 
                + 'WHERE MaKH NOT IN (SELECT distinct MaKH FROM PhieuDangKy) '
                + 'ORDER BY SoCuoiMaKH ASC'
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})

//Lấy khách hàng có MaKH = maKH cần được tư vấn
app.get('/getCustomerNeedHelp/:maKH',(req,res)=>{
    const maKH = req.params.maKH

    const sql = 'SELECT * FROM KhachHang WHERE MaKH = ?'
    db.query(sql,maKH,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})


// --------------------------Customer---------------------------
app.post('/addCustomerNeedHelp',(req,res)=>{
    const maKH = req.body.maKH
    const tenKH = req.body.tenKH
    const emailKH = req.body.emailKH
    const sdtKH = req.body.sdtKH
    const ghiChu = req.body.ghiChu
    console.log(maKH)
    console.log(tenKH)
    console.log(emailKH)
    console.log(sdtKH)
    console.log(ghiChu)

    const sql = 'INSERT INTO KhachHang(MaKH,TenKH,Email,SDT,GhiChu) '  
                + 'VALUES(?,?,?,?,?)'
    db.query(sql,[maKH,tenKH,emailKH,sdtKH,ghiChu],(err,result)=>{
        if(!err){
            res.send('Success')
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})


//------------------------------Revenue (Doanh Thu)---------------------------------
//Lấy năm lớn nhất (gần nhất) trong danh sách các hóa đơn
app.get('/MaxYear',(req,res)=>{

    const sql = "SELECT DISTINCT CONVERT(YEAR(NgayLapHD), UNSIGNED) Nam FROM HoaDon ORDER BY Nam DESC LIMIT 1 "
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})

//Lấy danh sách năm hiện có trong bảng HoaDon
app.get('/ListYear',(req,res)=>{
    const sql =  "SELECT DISTINCT YEAR(NgayLapHD) AS Nam FROM HoaDon ORDER BY Nam DESC"

    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})
//Lấy danh sách doanh thu gồm (tháng trong năm = year, tổng số hóa đơn trong từng tháng có năm = year, tổng doanh thu từng tháng có năm = year)
app.get('/ListRevenue/:nam',(req,res)=>{
    const nam = req.params.nam
    console.log(nam)
    const sql =  "SELECT DanhSachThang.Thang, TongTien, NamLapHD, TongHoaDonTrongThang FROM "
                +"( SELECT Thang, SUM(TongTien) TongTien FROM "
                +"( SELECT  Phieu_ThangTrongNam.MaPhieu, TongTien, Thang, Nam FROM (SELECT pdk.MaPhieu , SUM(Gia) TongTien "
                +"FROM PhieuDangKy pdk JOIN PhieuDangKy_DichVu pdk_dv ON pdk.MaPhieu = pdk_dv.MaPhieu JOIN DichVu dv ON dv.MaDv = pdk_dv.MaDV "
                +"WHERE TrangThai = 'Đã thanh toán' "
                +"GROUP BY pdk.MaPhieu) PhieuDaThanhToan JOIN "
                +"(SELECT MaPhieu, MONTH(NgayLapHD) AS Thang , YEAR(NgayLapHD) AS Nam FROM HoaDon "
                +") Phieu_ThangTrongNam ON PhieuDaThanhToan.MaPhieu = Phieu_ThangTrongNam.MaPhieu "
                +"WHERE Nam = ?) DoanhThuTheoNam "
                +"GROUP BY Thang) AS DanhSachTongTienTrongThang JOIN (SELECT DISTINCT MONTH(NgayLapHD) AS Thang, YEAR(NgayLapHD) AS NamLapHD, COUNT(*) TongHoaDonTrongThang FROM HoaDon "
                +"WHERE YEAR(NgayLapHD) = ? "
                +"GROUP BY Thang) AS DanhSachThang "
                +"ON DanhSachTongTienTrongThang.Thang = DanhSachThang.Thang "
                +"ORDER BY DanhSachThang.Thang ASC"

    db.query(sql,[nam,nam],(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})


//Tính tổng doanh thu có năm = year
app.get('/TotalRevenue/:nam',(req,res)=>{
    const nam = req.params.nam
    console.log('total ',nam)
    const sql =  "SELECT SUM(TongTien) AS TongDoanhThu FROM "
                +"(SELECT Thang, SUM(TongTien) TongTien FROM "
                +"(SELECT  Phieu_ThangTrongNam.MaPhieu, TongTien, Thang, Nam FROM "
                +"(SELECT pdk.MaPhieu , SUM(Gia) TongTien "
                +"FROM PhieuDangKy pdk JOIN PhieuDangKy_DichVu pdk_dv ON pdk.MaPhieu = pdk_dv.MaPhieu JOIN DichVu dv ON dv.MaDv = pdk_dv.MaDV "
                +"WHERE TrangThai = 'Đã thanh toán' "
                +"GROUP BY pdk.MaPhieu) PhieuDaThanhToan JOIN "
                +"(SELECT MaPhieu, MONTH(NgayLapHD) AS Thang , YEAR(NgayLapHD) AS Nam FROM HoaDon "
                +") Phieu_ThangTrongNam ON PhieuDaThanhToan.MaPhieu = Phieu_ThangTrongNam.MaPhieu "
                +"WHERE Nam = ?) DoanhThuTheoNam "
                +"GROUP BY Thang ) AS TongDoanhThu "

    db.query(sql,nam,(err,result)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
            res.send('Error')
        }
    })
})
