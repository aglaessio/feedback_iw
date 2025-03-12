import supabase from './supabase-config.js';

// Inicializa o EmailJS
emailjs.init('zqK9tEVCcUHGTfGnW'); // Substitua pelo seu User ID do EmailJS

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
        const viewLink = `https://aglaessio.github.io/feedback_iw/view-report.html?id=${reportId}`; // Substitua pelo seu link do GitHub Pages

        // Envia o e-mail com o link de visualização
        const emailParams = {
            link: viewLink
        };

        await emailjs.send('service_c9d89ee', 'template_owuaduf', emailParams); // Substitua pelos seus IDs do EmailJS
        console.log("E-mail enviado com sucesso!");

        alert('Relatório enviado com sucesso! Um link de visualização foi enviado para o e-mail.');
        document.getElementById('feedbackForm').reset();
    } catch (error) {
        console.error('Erro no processo:', error);
        alert('Erro ao enviar relatório. Tente novamente.');
    }
});

function checkFileCount(input) {
    const maxFiles = 20;
    if (input.files.length > maxFiles) {
        alert(`Por favor, selecione no máximo ${maxFiles} arquivos.`);
        input.value = '';
    }
}
