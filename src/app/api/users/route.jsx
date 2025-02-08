import { NextResponse } from "next/server";
import connection from '@/lib/mysql';

import cloudinary from "cloudinary";
import multer from "multer";
import { promisify } from "util";
import fs from "fs";
import { writeFile } from "fs/promises";
import path from "path";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// To handle a GET request to /api
export async function GET(request) {
    console.log("request......")
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    const res = searchParams.get('res');

    let query = "";
    if(userId > 0) {
        query = `SELECT * FROM users where id=${userId}`;
    }else if(res == "withCompany") {
      query = `SELECT U.id,U.name,U.email,U.profile_path,C.id as companyId,C.name as companyName FROM users U LEFT JOIN company C ON C.id = U.companyId`;
    }else if(res == "page") {
      query = `SELECT U.id,U.name,U.email,U.profile_path,C.id as companyId,C.name as companyName FROM users U LEFT JOIN company C ON C.id = U.companyId`;
    }else {
        query = `SELECT * FROM users`;
    }
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
        if (err) {
          console.error("err......");
          console.error(err);
          return reject(new NextResponse('Database query failed', { status: 500 }));
        }
  
        return resolve(new NextResponse(JSON.stringify(results), { status: 200 }));
      });
    });
  }
  
export async function POST(req) {
    try {
      
        const formData = await req.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const file = formData.get("file");
        const companyId = formData.get("companyId");
      
        return new Promise(async (resolve, reject) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          const tempFilePath = path.join("/tmp", file.name);
          await writeFile(tempFilePath, buffer);
        
          // Upload to Cloudinary
          const result = await cloudinary.v2.uploader.upload(tempFilePath, {
            folder: "next_uploads",
          });
          const profile_path = result.url;
          connection.query('INSERT INTO users (name, email, companyId, profile_path) VALUES (?, ?, ?, ?)',
          [name, email, companyId, profile_path], (err, results) => {
            if (err) {
              console.error("err......");
              console.error(err);
              return reject(new NextResponse('Database query failed', { status: 500 }));
            }      
            return resolve(new NextResponse(JSON.stringify({ message: 'User added' }), { status: 200 }));
            // return resolve(new NextResponse(JSON.stringify({ message: 'User added', userId: results.insertId }), { status: 200 }));
          });
        });

    } catch (error) {
      console.error('Error inserting user:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
  }

  export async function PUT(req) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      const formData = await req.formData();
      const name = formData.get("name");
      const email = formData.get("email");
      // const file = formData.get("file");
      const companyId = formData.get("companyId");
    
      return new Promise(async (resolve, reject) => {
        // const buffer = Buffer.from(await file.arrayBuffer());
        // const tempFilePath = path.join("/tmp", file.name);
        // await writeFile(tempFilePath, buffer);
      
        // Upload to Cloudinary
        // const result = await cloudinary.v2.uploader.upload(tempFilePath, {
        //   folder: "next_uploads",
        // });
        // const profile_path = result.url;
        connection.query("UPDATE users SET name = ?, email = ?, companyId = ? WHERE id = ?", [name, email, companyId, id], (err, results) => {
          if (err) {
            console.error("err......");
            console.error(err);
            return reject(new NextResponse('Database query failed', { status: 500 }));
          }      
          return resolve(new NextResponse(JSON.stringify({ message: 'User updated' }), { status: 200 }));
          // return resolve(new NextResponse(JSON.stringify({ message: 'User added', userId: results.insertId }), { status: 200 }));
        });
      });

      // const { name, email } = await req.json();
  
      // console.log("update name")
      // console.log(name)
      // console.log(id)
      // if (!id) {
      //   return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
      // }
  
      // // 6. Update User
      // if (name || email) {
      //   return new Promise((resolve, reject) => {
      //     connection.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], (err, results) => {
      //     if (err) {
      //       console.error("err......");
      //       console.error(err);
      //       return reject(new NextResponse('Database query failed', { status: 500 }));
      //     }
    
      //     return resolve(new NextResponse(JSON.stringify({ message: 'User updated' }), { status: 200 }));
      //   });
      // });

      // }
    
  
    } catch (error) {
      return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 });
    }
  }
  

  export async function DELETE(req) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
  
      if (!id) {
        return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
      }
  
      return new Promise((resolve, reject) => {
        connection.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
        if (err) {
          console.error("err......");
          console.error(err);
          return reject(new NextResponse('Database query failed', { status: 500 }));
        }
        console.error("user deleted......");
        return resolve(new NextResponse(JSON.stringify({ message: 'User Deleted', userId: results.insertId }), { status: 200 }));
      });
    });
  
    } catch (error) {
      return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 });
    }
  }