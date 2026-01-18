import PDFDocument from 'pdfkit';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Gera o PDF em memória
function generatePdfBuffer({ fullName, lifePath, destiny, soul }) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks = [];

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // ========= CAPA =========
      doc
        .fontSize(26)
        .fillColor('#D4AF37')
        .text('Relatório de Numerologia da Prosperidade', {
          align: 'center'
        })
        .moveDown(1.5);

      doc
        .fontSize(18)
        .fillColor('#333333')
        .text('Análise Completa Personalizada', {
          align: 'center'
        })
        .moveDown(3);

      doc
        .fontSize(14)
        .fillColor('#555555')
        .text(
          'Este relatório foi gerado automaticamente a partir dos seus dados pessoais informados no Mapa de Numerologia da Prosperidade.',
          { align: 'center' }
        )
        .moveDown(2);

      doc
        .fontSize(16)
        .fillColor('#FFFFFF')
        .text(fullName, {
          align: 'center',
          continued: false
        })
        .moveDown(4);

      doc
        .fontSize(11)
        .fillColor('#999999')
        .text('© 2026 - Numerologia da Prosperidade', { align: 'center' });

      doc.addPage();

      // ========= VISÃO GERAL =========
      doc
        .fontSize(20)
        .fillColor('#333333')
        .text('1. Visão Geral dos Seus Números', { underline: true })
        .moveDown(1.5);

      doc
        .fontSize(14)
        .fillColor('#000000')
        .text(`• Caminho da Vida: ${lifePath}`)
        .moveDown(0.3)
        .text(`• Destino: ${destiny}`)
        .moveDown(0.3)
        .text(`• Alma: ${soul}`)
        .moveDown(1.2);

      doc
        .fontSize(12)
        .fillColor('#555555')
        .text(
          'Esses três números formam o núcleo do seu mapa numerológico. Eles revelam seu propósito, sua missão prática e aquilo que sua alma realmente deseja.',
          { align: 'justify' }
        );

      doc.addPage();

      // ========= CAMINHO DA VIDA =========
      doc
        .fontSize(20)
        .fillColor('#333333')
        .text('2. Número do Caminho da Vida', { underline: true })
        .moveDown(1);

      doc
        .fontSize(14)
        .fillColor('#000000')
        .text(`Seu número do Caminho da Vida é: ${lifePath}`)
        .moveDown(0.8);

      doc
        .fontSize(12)
        .fillColor('#555555')
        .text(
          'O Caminho da Vida mostra qual é a grande lição e direção da sua existência. Quando você vive alinhado com esse número, a vida flui com muito mais sentido.',
          { align: 'justify' }
        )
        .moveDown(1.2);

      doc
        .fontSize(12)
        .fillColor('#555555')
        .text(
          'Use este número como um farol: sempre que tiver dúvidas sobre escolhas importantes, pergunte-se se a opção em questão honra essa vibração.',
          { align: 'justify' }
        );

      doc.addPage();

      // ========= DESTINO =========
      doc
        .fontSize(20)
        .fillColor('#333333')
        .text('3. Número do Destino', { underline: true })
        .moveDown(1);

      doc
        .fontSize(14)
        .fillColor('#000000')
        .text(`Seu número do Destino é: ${destiny}`)
        .moveDown(0.8);

      doc
        .fontSize(12)
        .fillColor('#555555')
        .text(
          'O número do Destino mostra como você coloca seu propósito em prática no mundo: sua forma de trabalhar, se relacionar e construir resultados.',
          { align: 'justify' }
        )
        .moveDown(1.2);

      doc
        .fontSize(12)
        .fillColor('#555555')
        .text(
          'Quando seu trabalho, profissão e rotinas respeitam essa energia, você tende a sentir mais realização e prosperidade material.',
          { align: 'justify' }
        );

      doc.addPage();

      // ========= ALMA =========
      doc
        .fontSize(20)
        .fillColor('#333333')
        .text('4. Número da Alma', { underline: true })
        .moveDown(1);

      doc
        .fontSize(14)
        .fillColor('#000000')
        .text(`Seu número da Alma é: ${soul}`)
        .moveDown(0.8);

      doc
        .fontSize(12)
        .fillColor('#555555')
        .text(
          'O número da Alma revela o que você realmente busca por dentro, mesmo quando não conta para ninguém. É o desejo profundo do seu coração.',
          { align: 'justify' }
        )
        .moveDown(1.2);

      doc
        .fontSize(12)
        .fillColor('#555555')
        .text(
          'Alinhar suas escolhas ao número da Alma traz paz, autenticidade e sensação de estar no caminho certo.',
          { align: 'justify' }
        );

      doc.addPage();

      // ========= RECOMENDAÇÕES =========
      doc
        .fontSize(20)
        .fillColor('#333333')
        .text('5. Recomendações para sua Prosperidade', { underline: true })
        .moveDown(1);

      doc
        .fontSize(12)
        .fillColor('#555555')
        .text(
          '1. Honre seu Caminho da Vida nas grandes decisões: carreira, relacionamentos, mudanças de cidade e investimentos.',
          { align: 'justify' }
        )
        .moveDown(0.6);

      doc
        .text(
          '2. Escolha trabalhos e projetos que tenham sintonia com o seu número de Destino. Isso aumenta suas chances de sucesso material.',
          { align: 'justify' }
        )
        .moveDown(0.6);

      doc
        .text(
          '3. Não ignore os desejos da sua Alma. Quando você se abandona, a prosperidade tende a travar.',
          { align: 'justify' }
        )
        .moveDown(0.6);

      doc
        .text(
          '4. Volte a este relatório sempre que estiver em dúvida: ele é um mapa para te lembrar quem você é.',
          { align: 'justify' }
        )
        .moveDown(2);

      doc
        .fontSize(11)
        .fillColor('#999999')
        .text(
          'Relatório gerado automaticamente pelo sistema Numerologia da Prosperidade.',
          { align: 'center' }
        );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

export default async function handler(req, res) {
  // Permitir CORS simples
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { email, fullName, lifePath, destiny, soul } = req.body;

    if (!email || !fullName || !lifePath || !destiny || !soul) {
      return res.status(400).json({ error: 'Dados insuficientes para gerar o relatório' });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY não configurada');
      return res.status(500).json({ error: 'Configuração de email ausente' });
    }

    // Gera o PDF em memória
    const pdfBuffer = await generatePdfBuffer({
      fullName,
      lifePath,
      destiny,
      soul
    });

    // Envia o email com anexo
    await resend.emails.send({
      from: 'Numerologia da Prosperidade <onboarding@resend.dev>',
      to: email,
      subject: `${fullName}, seu Mapa de Numerologia da Prosperidade está pronto!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea;">Olá, ${fullName}!</h2>
          <p>Seu relatório de <strong>Numerologia da Prosperidade</strong> foi gerado com sucesso. ✨</p>
          <p>No anexo deste e-mail você encontra seu PDF completo para download e consulta sempre que quiser.</p>
          <p style="margin-top: 20px;">Com prosperidade,<br>Equipe Numerologia da Prosperidade</p>
        </div>
      `,
      attachments: [
        {
          filename: `Relatorio_Numerologia_${fullName.replace(/\s+/g, '_')}.pdf`,
          content: pdfBuffer.toString('base64'),
          contentType: 'application/pdf'
        }
      ]
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Erro ao gerar/enviar PDF:', err);
    return res.status(500).json({ error: 'Falha ao gerar ou enviar o relatório.' });
  }
}
