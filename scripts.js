import supabase from './supabase-config.js';

// Inicializa o EmailJS
emailjs.init('SEU_USER_ID_DO_EMAILJS'); // Substitua pelo seu User ID do EmailJS

// Função para gerar o PDF
document.getElementById('generatePdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf; // Inicializa o jsPDF

    const doc = new jsPDF();

    // Título do PDF
    doc.setFontSize(18);
    doc.text("Formulário de Feedback", 10, 20);

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
    });

    // Adiciona os anexos ao PDF
    const files = document.getElementById('fileAttachments').files;
    if (files.length > 0) {
        doc.setFontSize(14);
        doc.text("Anexos:", 10, doc.autoTable.previous.finalY + 10);

        files.forEach((file, index) => {
            doc.text(`${index + 1}. ${file.name}`, 10, doc.autoTable.previous.finalY + 20 + (index * 10));
        });
    }

    // Abre o PDF em uma nova aba
    const pdfOutput = doc.output('bloburl'); // Gera um URL para o PDF
    window.open(pdfOutput, '_blank'); // Abre o PDF em uma nova aba

    // Oferece a opção de download
    doc.save('formulario_feedback.pdf');
});

function checkFileCount(input) {
    const maxFiles = 20;
    if (input.files.length > maxFiles) {
        alert(`Por favor, selecione no máximo ${maxFiles} arquivos.`);
        input.value = '';
    }
}
