// Inicializa o Supabase
const supabaseUrl = 'https://seu-supabase-url.supabase.co'; // Substitua pelo seu URL do Supabase
const supabaseKey = 'sua-chave-publica'; // Substitua pela sua chave pública do Supabase

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Função para gerar o PDF
document.getElementById('generatePdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf; // Inicializa o jsPDF

    const doc = new jsPDF();

    // Configurações de estilo
    const primaryColor = [33, 37, 41]; // Cor escura
    const secondaryColor = [100, 100, 100]; // Cor cinza
    const accentColor = [37, 117, 252]; // Azul moderno

    // Título do PDF (centralizado)
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    const title = "Relatório Técnico Pós Evento";
    const titleWidth = doc.getTextWidth(title);
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.text(title, (pageWidth - titleWidth) / 2, 20);

    // Dados do formulário
    const formData = {
        "Nome do Evento": document.getElementById('eventName').value,
        "Nome do Técnico": document.getElementById('technicianName').value,
        "Data e Hora de Chegada": document.getElementById('arrivalDateTime').value,
        "Horário de Abertura da Bilheteria": document.getElementById('boxOfficeOpeningTime').value,
        "Quantidade de Bilheterias": document.getElementById('boxOfficeCount').value,
        "Equipamentos de Bilheteria": document.getElementById('boxOfficeEquipmentCount').value,
        "Horário de Abertura da Portaria": document.getElementById('gateOpeningTime').value,
        "Quantidade de Portarias": document.getElementById('gateCount').value,
        "Equipamentos de Portaria": document.getElementById('gateEquipmentCount').value,
        "Internet Disponibilizada": document.getElementById('internetProvided').value,
        "Outras Observações": document.getElementById('otherObservations').value,
    };

    // Adiciona os dados ao PDF
    let yPosition = 40; // Posição inicial para os dados
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);

    Object.entries(formData).forEach(([key, value]) => {
        doc.text(`${key}:`, 20, yPosition);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...secondaryColor);
        doc.text(`${value}`, 80, yPosition);
        yPosition += 10; // Espaçamento entre linhas
    });

    // Adiciona a data de geração no canto inferior direito
    const date = new Date();
    const formattedDate = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...secondaryColor);
    doc.text(`Gerado em: ${formattedDate}`, pageWidth - 50, doc.internal.pageSize.getHeight() - 10);

    // Abre o PDF em uma nova aba
    const pdfOutput = doc.output('bloburl'); // Gera um URL para o PDF
    window.open(pdfOutput, '_blank'); // Abre o PDF em uma nova aba

    // Oferece a opção de download
    doc.save('relatorio_tecnico_pos_evento.pdf');
});

function checkFileCount(input) {
    const maxFiles = 20;
    if (input.files.length > maxFiles) {
        alert(`Por favor, selecione no máximo ${maxFiles} arquivos.`);
        input.value = '';
    }
}
