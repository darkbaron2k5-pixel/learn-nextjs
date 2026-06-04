import { revalidateTag } from "next/cache";

export async function GET() {
    const users = await fetch("http://localhost:8000/users");
    const data = await users.json();
    revalidateTag("user");
    return Response.json({ message: "Day la danh sach user", data });
}