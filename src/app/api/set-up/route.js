import dbConnect from "@/app/lib/dbConnect";

export async function GET() {
    const dbStatus = await dbConnect();
    if (dbStatus.connection.readyState !== 1) {
        return new Response(JSON.stringify({ message: "Database connection failed" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    return new Response(JSON.stringify({ message: "Database connected" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}