import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Read directly from .env.local
    const validUser = process.env.ADMIN_USERNAME || 'arif';
    const validPass = process.env.ADMIN_PASSWORD || 'Arif@Karachi2026!';

    if (username.trim() === validUser && password === validPass) {
      const response = NextResponse.json({ 
        success: true, 
        message: 'Kamyabi se login ho gaye!' 
      });

      // Secure HTTP-Only Cookie session
      response.cookies.set('admin_session', 'authenticated_token_arif_2026', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days session
      });

      return response;
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Ghalat User ID ya Password. Barah-e-karam apna sahi password darj karein.' 
    }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
