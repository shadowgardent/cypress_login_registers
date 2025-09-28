1.มีการเข้าสู่ระบบสำเร็จและไม่สำเร็จ 
สำเร็จ
<img width="1000" height="660" alt="login-success" src="https://github.com/user-attachments/assets/5e81ae07-fc3a-4794-9475-3ef797521631" />
ข้อความจะบอกว่า Login successful! Welcome, Boss

ไม่สำเร็จ
<img width="1000" height="660" alt="login-fail" src="https://github.com/user-attachments/assets/46c59191-b261-4030-b531-f3d758ceeaab" />
ข้อความจะบอกว่า Invalid E-mail or password

2.ทดสอบ Api การสมัครสมาชิกว่ามีการยิง ไปที่ url ไหนบ้าง method อะไรบ้าง
หน้าRegisters โดยยิงAPI ไปที่ cypress/fixtures/intercepted_register.json หากจะดูผลลัพธ์ให้ดูในโฟลเดอร์ result จะเห็นผลลัพธ์ การยิงAPI 10 ครั้ง หลัง 30 วิ
<img width="407" height="804" alt="image" src="https://github.com/user-attachments/assets/11ddecf0-10d5-4224-a142-a4fc2ee5c4a3" />

<img width="1000" height="660" alt="register-success" src="https://github.com/user-attachments/assets/7faad153-6aee-473a-90fb-e9eb566da28b" />
<img width="394" height="167" alt="image" src="https://github.com/user-attachments/assets/b0625a6e-946a-4097-989d-9687748a1fe3" />

<img width="1000" height="660" alt="register-fail" src="https://github.com/user-attachments/assets/335fce14-71e7-431b-9bb4-bcf6e49b54d5" />
<img width="397" height="242" alt="image" src="https://github.com/user-attachments/assets/57d96520-d835-4cc0-aa7e-a0479443b40a" />

login โดยใช้ api
สำเร็จ
<img width="1000" height="660" alt="login-success-api" src="https://github.com/user-attachments/assets/208dc9ff-2bf8-4764-b1db-52fcb942cc26" />
<img width="416" height="439" alt="image" src="https://github.com/user-attachments/assets/10f5254d-aa1b-43c7-a9c6-f16d51862281" />

ไม่สำเร็จ
<img width="1000" height="660" alt="login-fail-api" src="https://github.com/user-attachments/assets/e918ac1a-3784-44bc-a042-e0a8721f50ef" />
<img width="400" height="364" alt="image" src="https://github.com/user-attachments/assets/d6bfcaed-7508-4a31-a027-856e16402de7" />
