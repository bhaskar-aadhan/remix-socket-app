import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({request}:ActionFunctionArgs) {
    const body  = await request.json();
    const headers  = await request.headers;

    
}