document.getElementById("generatePdf").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const now = new Date();
    const formattedDate = now.toLocaleDateString("pt-BR");
    const formattedTime = now.toLocaleTimeString("pt-BR");

    // Configurações de fonte e cor
    doc.setFont("Times", "normal"); // Define a fonte como Times New Roman
    doc.setTextColor(0, 0, 0); // Cor preta

    // Título do documento (colorido)
    doc.setFont("Times", "bold"); // Fonte em negrito para o título
    doc.setTextColor(0, 0, 255); // Cor azul (RGB: 0, 0, 255)
    doc.setFontSize(14); // Aumenta o tamanho da fonte para o título
    doc.text("RELATÓRIO TÉCNICO PÓS EVENTO", 105, 20, { align: "center" });
    doc.setTextColor(0, 0, 0); // Volta a cor padrão (preto)
    doc.setFont("Times", "normal"); // Volta para a fonte normal

    // Posição inicial para os campos do formulário
    let y = 40;
    document.querySelectorAll(".section").forEach((section) => {
        const sectionTitle = section.querySelector("h2").innerText;

        // Remove os ícones do título da seção
        const cleanSectionTitle = sectionTitle.replace(/<i.*?<\/i>/g, '').trim();

        // Adiciona o título da seção ao PDF (sem ícones)
        doc.setFontSize(12);
        doc.setFont("Times", "bold"); // Fonte em negrito para o título da seção
        doc.text(cleanSectionTitle, 10, y);

        // Incrementa a posição Y para os campos da seção
        y += 10; // Aumenta o espaçamento após o título da seção

        // Itera sobre os campos da seção
        section.querySelectorAll(".form-group").forEach((group) => {
            const label = group.querySelector("label").innerText.replace(/<.*?>/g, '').trim(); // Remove tags HTML
            const cleanLabel = label.replace(/⦁\s*/, ''); // Remove o caractere ⦁ e qualquer espaço após ele
            const input = group.querySelector("input, select, textarea");
            let value = input.value || "Não informado";

            // Formatação especial para "Data e Hora de Chegada"
            if (input.id === "arrivalDateTime") {
                const date = new Date(input.value);
                if (!isNaN(date)) {
                    value = `${date.toLocaleDateString("pt-BR")} ${date.toLocaleTimeString("pt-BR")}`;
                } else {
                    value = "Não informado";
                }
            }

            // Adiciona o rótulo e o valor ao PDF
            doc.setFontSize(10);
            doc.setFont("Times", "bold"); // Fonte em negrito para o rótulo
            doc.text(cleanLabel, 10, y);

            doc.setFont("Times", "normal"); // Fonte normal para o valor
            doc.text(value, 10, y + 6);

            // Incrementa a posição Y para o próximo campo
            y += 12; // Ajusta o espaçamento entre os campos
        });

        // Adiciona um espaço entre as seções
        y += 10; // Ajusta o espaçamento entre as seções
    });

    // Adiciona "Gerado em:" no canto inferior direito
    doc.setFontSize(10);
    const text = `Gerado em: ${formattedDate} ${formattedTime}`;
    const textWidth = doc.getTextWidth(text);
    const pageWidth = doc.internal.pageSize.getWidth();

    // Verifica se o texto ultrapassa a margem e ajusta o tamanho da fonte
    if (textWidth > pageWidth - 20) {
        doc.setFontSize(8); // Reduz o tamanho da fonte se necessário
    }

    // Posiciona o texto no canto inferior direito
    const xPosition = pageWidth - 10 - doc.getTextWidth(text); // 10 é a margem direita
    doc.text(text, xPosition, 280); // 280 é a posição Y próxima ao rodapé

    // Salva o PDF
    // Obter o nome do evento do campo "eventName"
const eventName = document.getElementById("eventName").value;

// Remover caracteres inválidos para nomes de arquivo (opcional)
const sanitizedEventName = eventName.replace(/[^a-zA-Z0-9\s]/g, "").trim();

// Definir o nome do arquivo PDF com base no nome do evento
const fileName = sanitizedEventName ? `${sanitizedEventName}.pdf` : "relatorio_tecnico.pdf";

// Salvar o PDF com o nome personalizado
doc.save(fileName);
});
