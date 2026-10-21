import { NextResponse } from 'next/server';
import { getMessages, saveMessages } from '@/lib/db';

export async function GET() {
  try {
    const messages = getMessages();
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Name, email, and message are required' }, { status: 400 });
    }

    const messages = getMessages();
    const newMessage = {
      id: 'msg-' + Date.now(),
      name,
      email,
      subject: subject || 'Portfolio Inquiry',
      message,
      date: new Date().toISOString(),
      read: false
    };

    messages.unshift(newMessage);
    saveMessages(messages);

    return NextResponse.json({ success: true, message: 'Message sent successfully! Arif will reach out soon.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
