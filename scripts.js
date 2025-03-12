// Inicializa o jsPDF
const { jsPDF } = window.jspdf;

// Função para gerar o PDF
document.getElementById('generatePdf').addEventListener('click', function () {
    const doc = new jsPDF();

    // Cabeçalho do PDF
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

    // Converte os dados do formulário em uma tabela
    const data = Object.entries(formData).map(([key, value]) => [key, value]);

    // Adiciona a tabela ao PDF
    doc.autoTable({
        head: [['Campo', 'Valor']],
        body: data,
        startY: 30,
        theme: "striped", // Tema da tabela
        headStyles: {
            fillColor: [40, 40, 40], // Cor de fundo do cabeçalho
            textColor: [255, 255, 255], // Cor do texto do cabeçalho
            fontStyle: "bold", // Fonte em negrito
        },
        bodyStyles: {
            textColor: [40, 40, 40], // Cor do texto do corpo
        },
        alternateRowStyles: {
            fillColor: [245, 245, 245], // Cor de fundo das linhas alternadas
        },
        margin: { top: 30 }, // Margem superior
    });

    // Rodapé do PDF
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Gerado em: " + new Date().toLocaleString(), 20, doc.autoTable.previous.finalY + 10);

    // Abre o PDF em uma nova aba
    const pdfOutput = doc.output('bloburl'); // Gera um URL para o PDF
    window.open(pdfOutput, '_blank'); // Abre o PDF em uma nova aba

    // Oferece a opção de download
    doc.save('relatorio_feedback.pdf');
});
