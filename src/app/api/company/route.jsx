import { NextResponse } from "next/server";
import connection from '@/lib/mysql';

// To handle a GET request to /api
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('id');

    let query = "";
    if(companyId > 0) {
        query = `SELECT * FROM company where id=${companyId}`;
    }else {
        query = `SELECT * FROM company`;
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


// **POST request to add a new user**
export async function POST(req) {
    try {
      const { name, totalUsers } = await req.json();
  
      if (!name || !totalUsers) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
      }

      return new Promise((resolve, reject) => {
        connection.query('INSERT INTO company (name, totalUsers) VALUES (?, ?)',
        [name, totalUsers], (err, results) => {
        if (err) {
          console.error("err......");
          console.error(err);
          return reject(new NextResponse('Database query failed', { status: 500 }));
        }
        return resolve(new NextResponse(JSON.stringify({ message: 'Company added', userId: results.insertId }), { status: 200 }));
      });
    });

    } catch (error) {
      console.error('Error inserting company:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
  }

  export async function PUT(req) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      const { name, totalUsers } = await req.json();
  
      console.log("update name")
      console.log(name)
      console.log(id)
      if (!id) {
        return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
      }
  
      // 6. Update User
      if (name || email) {
        return new Promise((resolve, reject) => {
          connection.query("UPDATE company SET name = ?, totalUsers = ? WHERE id = ?", [name, totalUsers, id], (err, results) => {
          if (err) {
            console.error("err......");
            console.error(err);
            return reject(new NextResponse('Database query failed', { status: 500 }));
          }
    
          return resolve(new NextResponse(JSON.stringify({ message: 'User updated' }), { status: 200 }));
        });
      });

      }
    
  
    } catch (error) {
      return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 });
    }
  }
  

  export async function DELETE(req) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
  
      if (!id) {
        return new Response(JSON.stringify({ error: "Company ID is required" }), { status: 400 });
      }
  
      return new Promise((resolve, reject) => {
        connection.query("DELETE FROM company WHERE id = ?", [id], (err, results) => {
        if (err) {
          console.error("err......");
          console.error(err);
          return reject(new NextResponse('Database query failed', { status: 500 }));
        }
        console.error("company deleted......");
        return resolve(new NextResponse(JSON.stringify({ message: 'company Deleted' }), { status: 200 }));
      });
    });
  
    } catch (error) {
      return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 });
    }
  }