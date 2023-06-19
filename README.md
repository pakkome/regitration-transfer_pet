# Regitration and Transfer Pet
ลงทะเบียนสัตว์เลี้ยงและโอนกรรมสิทธิ์ของสัตว์ผ่าน Smart Contract

## ตัวอย่างของ Workflow 
- เจ้าของสัตว์เลี้ยงเข้าสู่ระบบด้วย Address ของตัวเอง
- เจ้าของสัตว์เลี้ยงกรอกข้อมูลลงทะเบียนสัตว์เลี้ยงตามที่กำหนด
- เจ้าของสัตว์เลี้ยงระบุได้ว่าสัตว์เลี้ยงได้รับวิคซีนแล้วหรือไม่ สามารถระบุหายหลังได้
- เจ้าของสัตว์ต้องการโอนกรรมสิทธิ์สัตว์เลี้ยง สามารถทำได้เพียงระบุ Address ของเจ้าของคนใหม่
- เจ้าของสัตว์เลี้ยงคนใหม่เข้าสู่ระบบ เพื่อตรวจเช็คการโอนกรรมสิทธิ์ เมื่อธุรกรรมสำเร็จสัตว์ที่ถูกโอนกรรมสิทธิ์จะปรากฏขึ้น

### Requirements

- [Node.js](https://nodejs.org)
- [Tailwind CSS](https://www.trufflesuite.com/truffle)
- [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs)
- [Metamask](https://metamask.io/) (Browser Extension)

#### Getting the requirements

1. Download and install **NodeJS**

   Download and install NodeJS from [here](https://nodejs.org/en/download/ "Go to official NodeJS download page.").

2. Install **metamask** browser extension

   Download and install metamask from [here](https://metamask.io/download "Go to official metamask download page.").

##### Launch the development server (frontend)

```shell
   cd client_app
   npm run dev
   ```