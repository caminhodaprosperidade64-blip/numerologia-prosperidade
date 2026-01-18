import PDFDocument from 'pdfkit';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const interpretations = {
  1: {
    title: "Caminho da Liderança",
    traits: "Independência, iniciativa, coragem, pioneirismo, espírito de liderança.",
    prosperity: "Prospera quando assume a frente, toma decisões e cria seus próprios projetos."
  },
  2: {
    title: "Caminho da Cooperação",
    traits: "Diplomacia, parceria, sensibilidade, apoio, mediação.",
    prosperity: "Prospera em trabalhos em equipe, parcerias e ambientes harmoniosos."
  },
  3: {
    title: "Caminho da Expressão",
    traits: "Criatividade, comunicação, sociabilidade, alegria.",
    prosperity: "Prospera quando usa a comunicação, arte, marketing ou expressão criativa."
  },
  4: {
    title: "Caminho da Estrutura",
    traits: "Organização, disciplina, praticidade, foco.",
    prosperity: "Prospera em projetos estáveis, planejamento financeiro e construção a longo prazo."
  },
  5: {
    title: "Caminho da Liberdade",
    traits: "Mudança, movimento, versatilidade, aventura.",
    prosperity: "Prospera em áreas flexíveis, vendas, viagens, inovação e novos mercados."
  },
  6: {
    title: "Caminho do Cuidado",
    traits: "Responsabilidade, amor, harmonia, família.",
    prosperity: "Prospera ao servir, cuidar, orientar e criar ambientes acolhedores."
  },
  7: {
    title: "Caminho da Sabedoria",
    traits: "Análise, espiritualidade, introspecção, pesquisa.",
    prosperity: "Prospera em estudos, consultorias, terapias e trabalhos com profundidade."
  },
  8: {
    title: "Caminho do Poder Material",
    traits: "Gestão, ambição, sucesso material, liderança executiva.",
    prosperity: "Tem grande potencial para riqueza material, negócios e cargos de liderança."
  },
  9: {
    title: "Caminho da Humanidade",
    traits: "Compromisso social, compaixão, altruísmo.",
    prosperity: "Prospera ajudando muitas pessoas, criando impacto e trabalhando com causas maiores."
  }
};

function generatePdfBuffer({ fullName, lifePath, destiny, soul }) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const lifeInfo = interpretations[lifePath] || {};
      const destInfo = interpretations[destiny] || {};
      const soulInfo = interpretations[soul] || {};

      // CAPA
      doc
        .fontSize(26)
        .fillColor('#333333')
        .text('Relatório de Numerologia da Prosperidade', { align: 'center' })
        .moveDown(1.5);

      doc
        .fontSize(18)
        .fillColor('#555555')
        .text('Análise Completa e Personalizada', { align: 'center' })
        .moveDown(3);

      doc
        .fontSize(16)
        .fillColor('#000000')
        .text(`Nome: ${fullName}`, { align: 'center' })
        .moveDown(0.5);

      doc
        .fontSize(12)
        .fillColor('#666666')
        .text('Este relatório foi gerado automaticamente a partir dos seus dados no Mapa de Numerologia da Prosperidade.', {
          align: 'center'
        });

      doc.addPage();

      // PÁGINA 2: SUMÁRIO
      doc
        .fontSize(20)
        .fillColor('#333333')
        .text('Sumário', { underline: true })
        .moveDown(1);

      doc
        .fontSize(12)
        .fillColor('#555555')
        .text('1. Visão Geral dos Seus Números', { continued: false })
        .text('2. Número do Caminho da Vida (Propósito)', { continued: false })
        .text('3. Número do Destino (Missão)', { continued: false })
        .text('4. Número da Alma (Desejos Internos)', { continued: false })
        .text('5. Recomendações Práticas para Prosperidade', { continued: false });

      doc.addPage();

      // PÁGINA 3: VISÃO GERAL
      doc
        .fontSize(20)
        .fillColor('#333333')
        .text('1. Visão Geral dos Seus Números', { underline: true })
        .moveDown(1.5);

      doc
        .fontSize(14)
        .fillColor('#000000')
        .text(`• Caminho da Vida: ${lifePath}`, { continued: false })
        .text(`• Destino: ${destiny}`, { continued: false })
        .text(`• Alma: ${soul}`, { continued: false })
        .moveDown(1.5);

      doc
        .fontSize(12)
        .fillColor('#555555')
        .text(
          'Esses três números formam o núcleo do seu mapa numerológico. Eles revelam seu propósito, sua missão prática e aquilo que sua alma realmente deseja.',
          { align: 'justify' }
        );

      doc.addPage();

      // PÁGINA 4: CAMINHO DA VIDA
      doc
        .fontSize(20)
        .fillColor('#333333')
        .text('2. Número do Caminho da Vida (Propósito)', { underline: true })
        .moveDown(1);

      doc
        .fontSize(14)
        .fillColor('#000000')
        .text(`Seu número do Caminho da Vida é: ${lifePath}`, { continued: false })
        .moveDown(0.5);

      if (lifeInfo.title) {
        doc
          .fontSize(13)
          .fillColor('#444444')
          .text(lifeInfo.title, { italics: true })
          .moveDown(0.8);
      }

      if (lifeInfo.traits) {
        doc
          .fontSize(12)
          .fillColor('#555555')
          .text(`Principais características: ${lifeInfo.traits}`, {
            align: 'justify'
          })
          .moveDown(0.8);
      }

      if (lifeInfo.prosperity) {
        doc
          .fontSize(12)
          .fillColor('#555555')
          .text(`Como esse número se conecta à prosperidade: ${lifeInfo.prosperity}`, {
            align: 'justify'
          })
          .moveDown(1);
      }

      doc.addPage();

      // PÁGINA 5: DESTINO
      doc
        .fontSize(20)
        .fillColor('#333333')
        .text('3. Número do Destino (Missão)', { underline: true })
        .moveDown(1);

      doc
        .fontSize(14)
        .fillColor('#000000')
        .text(`Seu número do Destino é: ${destiny}`, { continued: false })
        .moveDown(0.5);

      if (destInfo.title) {
        doc
          .fontSize(13)
          .fillColor('#444444')
          .text(destInfo.title, { italics: true })
          .moveDown(0.8);
      }

      doc
        .fontSize(12)
        .fillColor('#555555')
        .text(
          'O número do Destino mostra como você coloca seu propósito em prática no mundo: sua forma de trabalhar, se relacionar e construir resultados concretos.',
          { align: 'justify' }
        )
        .moveDown(1);

      doc.addPage();

      // PÁGINA 6: ALMA
      doc
        .fontSize(20)
        .fillColor('#333333')
        .text('4. Número da Alma (Desejos Internos)', { underline: true })
        .moveDown(1);

      doc
        .fontSize(14)
        .fillColor('#000000')
        .text(`Seu número da Alma é: ${soul}`, { continued: false })
        .moveDown(0.5);

      if (soulInfo.title) {
        doc
          .fontSize(13)
          .fillColor('#444444')
          .text(soulInfo.title, { italics: true })
          .moveDown(0.8);
      }

      doc
        .fontSize(12)
        .fillColor('#555555')
        .text(
          'Este número revela aquilo que você realmente busca por dentro, mesmo quando não conta para ninguém. Quando você alinha suas escolhas ao número da Alma, sente mais paz e plenitude.',
          { align: 'justify' }
        )
        .moveDown(1);

      doc.addPage();

      // PÁGINA 7: RECOMENDAÇÕES
      doc
        .fontSize(20)
        .fillColor('#333333')
        .text('5. Recomendações Práticas para sua Prosperidade', { underline: true })
        .moveDown(1);

      doc
        .fontSize(12)
        .fillColor('#555555')
        .text(
          '1. Honre seu Caminho da Vida: traga suas qualidades principais para o trabalho, projetos e decisões financeiras.',
          { align: 'justify' }
        )
        .moveDown(0.5);

      doc
        .text(
          '2. Alinhe sua missão (Destino) com o que sua Alma realmente deseja, para não construir prosperidade às custas do seu bem-estar interno.',
          { align: 'justify' }
        )
        .moveDown(0.5);

      doc
        .text(
          '3. Revise este relatório sempre que for tomar decisões importantes para sua vida financeira, profissional e espiritual.',
          { align: 'justify' }
        )
        .moveDown(2);

      doc
        .fontSize(11)
        .fillColor('#999999')
        .text(
          'Relatório gerado automaticamente pelo sistema de Numerologia da Prosperidade.',
          { align: 'center' }
        );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { email, fullName, lifePath, destiny, soul } = req.body;

    if (!email || !fullName || !lifePath || !destiny || !soul) {
      return res.status(400).json({ error: 'Dados insuficientes para gerar o relatório' });
    }

    // Gera o PDF em memória
    const pdfBuffer = await generatePdfBuffer({
      fullName,
      lifePath,
      destiny,
      soul
    });

    // Envia e-mail com o PDF em anexo via Resend
    await resend.emails.send({
      from: 'Numerologia da Prosperidade <onboarding@resend.dev>',
      to: email,
      subject: `${fullName}, seu mapa numerológico está pronto! 🔮✨`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea;">Olá ${fullName}!</h2>

          <p style="color: #333; font-size: 16px;">
            Seu relatório de <strong>Numerologia da Prosperidade</strong> foi gerado com sucesso! 🎉
          </p>

          <div style="background: #f8f9ff; padding: 20px; border-radius: 10px; border-left: 4px solid #667eea; margin: 20px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Seus Números Principais:</h3>
            <p style="color: #333; font-size: 16px;">
              <strong>Caminho da Vida:</strong> ${lifePath}<br>
              <strong>Destino:</strong> ${destiny}<br>
              <strong>Alma:</strong> ${soul}
            </p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://pay.hotmart.com/J103934459T" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 10px; font-weight: bold; display: inline-block; font-size: 16px;">
              Acessar Relatório Completo - R$ 19,90
            </a>
          </div>

          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 40px;">
            Numerologia da Prosperidade © 2026<br>
            Análise Completa Personalizada
          </p>
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

    return res.status(200).json({
      success: true,
      message: 'PDF gerado e enviado com sucesso!'
    });

  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ error: error.message });
  }
}
