import supabase from './supabase-config.js';

async function loadReport() {
    const urlParams = new URLSearchParams(window.location.search);
    const reportId = urlParams.get('id');

    if (!reportId) {
        alert('ID do relatório não encontrado.');
        return;
    }

    try {
        const { data, error } = await supabase
            .from('feedback')
            .select('*')
            .eq('id', reportId)
            .single();

        if (error) throw error;
        if (!data) throw new Error('Relatório não encontrado.');

        const reportDetails = document.getElementById('reportDetails');
        reportDetails.innerHTML = `
            <h2>${data.event_name}</h2>
            <p><strong>Técnico:</strong> ${data.technician_name}</p>
            <p><strong>Data de Chegada:</strong> ${data.arrival_datetime}</p>
            <p><strong>Horário de Abertura da Bilheteria:</strong> ${data.box_office_opening_time}</p>
            <p><strong>Quantidade de Bilheterias:</strong> ${data.box_office_count}</p>
            <p><strong>Horário de Abertura da Portaria:</strong> ${data.gate_opening_time}</p>
            <p><strong>Quantidade de Portarias:</strong> ${data.gate_count}</p>
            <p><strong>Internet Disponibilizada:</strong> ${data.internet_provided}</p>
            <p><strong>Outras Observações:</strong> ${data.other_observations}</p>
            <h3>Arquivos Anexados:</h3>
            <ul>
                ${data.file_urls.map(url => `<li><a href="${url}" target="_blank">${url.split('/').pop()}</a></li>`).join('')}
            </ul>
        `;
    } catch (error) {
        console.error('Erro ao carregar relatório:', error);
        alert('Erro ao carregar relatório. Tente novamente.');
    }
}

document.addEventListener('DOMContentLoaded', loadReport);