## ขั้นตอนการติดตั้ง

1. โหลดจาก repo 
    1) [frontend](https://github.com/FabuKi-Xr/Concert-webapp) ทดสอบโดยใช้คำสั่ง
    
        ```cmd
        npm run dev
        ```

    2) [backend](https://github.com/FabuKi-Xr/concert-backend)

        เริ่มต้นที่ install database ซึ่งเป็น dependency
        ```bash
        docker compose up -d
        ```

        ```cmd
        npm run start
        ```


## โครงสร้าง achitecture คือ MVC
<img src="https://img2.pic.in.th/pic/Blank-diagram---Page-1.jpeg" alt="mvc" width="700" height="450"/>

ประกอบด้วย
- ส่วนของ view คือหน้า UI ซึ่งเขียนด้วย nextjs 
- ส่วนของ model ที่ประกอบด้วย transactionEntity และ concertEntity
- ส่วนของ controller ทำหน้าที่อัปเดตฐานข้อมูลและส่งกลับไปยัง view

## lib ที่ใช้ได้แก่
- ในส่วน frontend ไม่ได้ใช้ lib เพิ่มเติมจาก framework
- ในส่วน backend ใช้ 
    - mysql เป็นดาต้าเบส 
    - และใช้ typeorm เป็นตัวจัดการฐานข้อมูล

## สามารถรัน unit test ได้ใน repo ของ backend
ใช้คำสั่ง
``` bash
    npm run test:watch
```

เลือก option *a*

## Ans
1. การจัดการข้อมูล และการรองรับความเร็วการเชื่อมต่อ
    1) เพื่อที่จะสามารถ จัดการข้อมูลที่ sensitive ได้ จะต้องใช้การเชื่อมต่อที่น่าเชื่อถืออย่างการจัดการให้เว็บไซต์มี certificate หรือก็คือการใช้โปรโตคอล HTTPS
    2) จัดทำระบบ MQ เพื่อให้สามารถบริหาร traffic ได้คงเดิม และเพิ่ม resource (RAM)ให้มากขึ้น

2. เพื่อที่รองรับผู้ใช้งานจำนวนมาก ต้องเพิ่ม load balancer และ ทำการสร้าง instance ของ web และ backend เพิ่มขึ้น โดยคำนึง consistency ของข้อมูลร่วมด้วย และใช้ MQ ร่วมด้วย
