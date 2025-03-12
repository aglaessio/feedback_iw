// Inicializa o jsPDF
const { jsPDF } = window.jspdf;

// Função para gerar o PDF
document.getElementById('generatePdf').addEventListener('click', function () {
    const doc = new jsPDF();

    // Adiciona a logo
    const logoUrl = "https://via.placeholder.com/150x50?text=Logo+Teste";
    doc.addImage(logoUrl, 'PNG', 20, 10, 40, 15); // Ajuste a posição e o tamanho da logo

    // Título do PDF
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text("Relatório de Feedback", 105, 20, { align: "center" });

    // Linha divisória
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Dados do formulário
    const formData = {
        "Nome do Evento": document.getElementById('eventName').value,
        "Nome do Técnico": document.getElementById('technicianName').value,
        "Data e Hora de Chegada": document.getElementById('arrivalDateTime').value,
        "Horário de Abertura da Bilheteria": document.getElementById('boxOfficeOpeningTime').value,
        "Quantidade de Bilheterias": document.getElementById('boxOfficeCount').value,
        "Horário de Abertura da Portaria": document.getElementById('gateOpeningTime').value,
        "Quantidade de Portarias": document.getElementById('gateCount').value,
        "Internet Disponibilizada": document.getElementById('internetProvided').value,
        "Outras Observações": document.getElementById('otherObservations').value,
    };

    // Converte os dados do formulário em uma lista
    const data = Object.entries(formData).map(([key, value]) => ({ key, value }));

    // Adiciona os dados ao PDF
    let yPos = 40; // Posição inicial
    data.forEach((item, index) => {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(40, 40, 40);
        doc.text(`${item.key}:`, 20, yPos);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(80, 80, 80);
        doc.text(item.value, 70, yPos);

        yPos += 10; // Espaçamento entre os itens
    });

    // Rodapé do PDF (canto inferior direito)
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const footerText = `Gerado em: ${new Date().toLocaleString()}`;
    const footerWidth = doc.getTextWidth(footerText);
    doc.text(footerText, doc.internal.pageSize.width - footerWidth - 20, doc.internal.pageSize.height - 10);

    // Abre o PDF em uma nova aba
    const pdfOutput = doc.output('bloburl'); // Gera um URL para o PDF
    window.open(pdfOutput, '_blank'); // Abre o PDF em uma nova aba

    // Oferece a opção de download
    doc.save('relatorio_feedback.pdf');
});
