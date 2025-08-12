import { NextResponse } from "next/server"

import { auth } from "@web/auth"

export default auth(async (req) => {
    console.log('Middleware - req:', req)
    return NextResponse.next()
})