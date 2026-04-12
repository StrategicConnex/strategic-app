import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, company, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios en el formulario' },
        { status: 400 }
      );
    }

    // Configuración del Transporter para enviar el correo
    // Utilizaremos variables de entorno (.env.local) para mantener las contraseñas seguras
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Es necesario generar una "App Password" si usas Gmail
      },
    });

    const mailOptions = {
      from: `"Plataforma Strategic" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // A quién le va a llegar el mail
      replyTo: email,
      subject: `Nueva solicitud corporativa: ${name} de ${company || 'Independiente'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px;">
          <h2 style="color: #D4AF37; margin-top: 0;">Nuevo Contacto Web - Strategic Connex</h2>
          <p>Has recibido una nueva propuesta estratégica a través del formulario B2B:</p>
          <ul style="list-style: none; padding-left: 0; margin-bottom: 24px;">
            <li style="margin-bottom: 8px;"><strong>👤 Nombre:</strong> ${name}</li>
            <li style="margin-bottom: 8px;"><strong>🏢 Organización:</strong> ${company || 'N/A'}</li>
            <li style="margin-bottom: 8px;"><strong>✉ Correo Técnico:</strong> <a href="mailto:${email}" style="color: #2563EB;">${email}</a></li>
          </ul>
          <h3 style="border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; color: #333;">Detalle del Requerimiento</h3>
          <p style="background: #f9f9f9; padding: 20px; border-left: 6px solid #D4AF37; border-radius: 4px; color: #444; line-height: 1.5;">
            ${message}
          </p>
        </div>
      `,
    };

    // Intentamos procesar y enviar el correo
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Correo enviado a los consultores con éxito' },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Fallo general al intentar enviar solicitud Nodemailer:", error);
    return NextResponse.json(
      { error: 'Error del servidor, no pudimos procesar el correo', details: error.message },
      { status: 500 }
    );
  }
}
