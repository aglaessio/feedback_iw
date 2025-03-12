import supabase from './supabase-config.js';

// Inicializa o EmailJS
emailjs.init('SEU_USER_ID_DO_EMAILJS'); // Substitua pelo seu User ID do EmailJS

document.getElementById('feedbackForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    console.log("Formulário enviado!");

    const files = document.getElementById('fileAttachments').files;
    const fileUrls = [];

    try {
        // Envia os arquivos para o Supabase Storage
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log("Enviando arquivo:", file.name);
            const { data, error } = await supabase.storage.from('uploads').upload(`/${Date.now()}_${file.name}`, file);
            
            if (error) throw error;
            if (!data) throw new Error('Falha ao obter informações do arquivo.');
            
            const url = supabase.storage.from('uploads').getPublicUrl(data.path).data.publicUrl;
            if (!url) throw new Error('URL do arquivo não foi gerada corretamente.');
            
            fileUrls.push(url);
            console.log("Arquivo enviado com sucesso:", url);
        }

        // Salva os dados do formulário no Supabase
        const formData = {
            event_name: document.getElementById('eventName').value,
            technician_name: document.getElementById('technicianName').value,
            arrival_datetime: document.getElementById('arrivalDateTime').value,
            box_office_opening_time: document.getElementById('boxOfficeOpeningTime').value,
            box_office_count: document.getElementById('boxOfficeCount').value,
            gate_opening_time: document.getElementById('gateOpeningTime').value,
            internet_provided: document.getElementById('internetProvided').value,
            other_observations: document.getElementById('otherObservations').value,
            file_urls: fileUrls
        };

        const { data: insertedData, error: insertError } = await supabase.from('feedback').insert([formData]);
        if (insertError) throw insertError;

        console.log("Dados inseridos com sucesso:", insertedData);

        // Gera o link de visualização
        const reportId = insertedData[0].id; // Supondo que o Supabase retorne o ID do registro
        const viewLink = `https://seu-usuario.github.io/seu-repositorio/view-report.html?id=${reportId}`; // Substitua pelo seu link do GitHub Pages

        // Envia o e-mail com o link de visualização
        const emailParams = {
            link: viewLink
        };

        await emailjs.send('SEU_SERVICE_ID_DO_EMAILJS', 'SEU_TEMPLATE_ID_DO_EMAILJS', emailParams); // Substitua pelos seus IDs do EmailJS
        console.log("E-mail enviado com sucesso!");

        // Envia uma cópia para o WhatsApp
        const whatsappMessage = `Olá,\n\nUm novo formulário de feedback foi enviado. Acesse o relatório aqui: ${viewLink}`;
        const whatsappLink = `https://wa.me/5541988272932?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappLink, '_blank'); // Abre o link em uma nova aba

        alert('Relatório enviado com sucesso! Um link de visualização foi enviado para o e-mail e WhatsApp.');
        document.getElementById('feedbackForm').reset();
    } catch (error) {
        console.error('Erro no processo:', error);
        alert('Erro ao enviar relatório. Tente novamente.');
    }
});

// Função para gerar o PDF
document.getElementById('generatePdf').addEventListener('click', function () {
    const doc = new jspdf.jsPDF();

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

    // Salva o PDF
    doc.save('formulario_feedback.pdf');
});

function checkFileCount(input) {
    const maxFiles = 20;
    if (input.files.length > maxFiles) {
        alert(`Por favor, selecione no máximo ${maxFiles} arquivos.`);
        input.value = '';
    }
}
