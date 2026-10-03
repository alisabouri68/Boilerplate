import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    const { rows } = await pool.query(
      "SELECT id, version, updated_at FROM design_systems_colors ORDER BY updated_at DESC LIMIT 50"
    );
    return NextResponse.json({ items: rows });
  }

  const { rows } = await pool.query("SELECT * FROM design_systems_colors WHERE id = $1", [id]);
  if (!rows[0]) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.palettes || !body?.semanticColors) {
      return NextResponse.json({ error: "invalid payload" }, { status: 400 });
    }

    if (body.id) {
      const { rows } = await pool.query(
        `UPDATE design_systems_colors
           SET data = $1, version = $2, updated_at = now()
         WHERE id = $3
         RETURNING id, updated_at`,
        [body, body.version ?? 1, body.id]
      );
      if (!rows[0]) return NextResponse.json({ error: "not found" }, { status: 404 });
      return NextResponse.json({ id: rows[0].id, updatedAt: rows[0].updated_at });
    }

    const { rows } = await pool.query(
      `INSERT INTO design_systems_colors (data, version)
       VALUES ($1, $2)
       RETURNING id, updated_at`,
      [body, body.version ?? 1]
    );
    return NextResponse.json({ id: rows[0].id, updatedAt: rows[0].updated_at });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}