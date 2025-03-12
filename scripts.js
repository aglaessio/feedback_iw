document.getElementById("generatePdf").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const now = new Date();
    const formattedDate = now.toLocaleDateString("pt-BR");
    const formattedTime = now.toLocaleTimeString("pt-BR");
    
    // Título do documento (colorido)
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 255); // Cor azul (RGB: 0, 0, 255)
    doc.text("Relatório Técnico Pós Evento", 105, 20, { align: "center" });
    doc.setTextColor(0, 0, 0); // Volta a cor padrão (preto)
    doc.setFont("helvetica", "normal");
    
    // Posição inicial para os campos do formulário (com espaçamento maior)
    let y = 40; // Aumentei o valor inicial de Y para 40 (antes era 30)
    document.querySelectorAll(".form-group").forEach((group) => {
        const label = group.querySelector("label").innerText;
        const input = group.querySelector("input, select, textarea");
        const value = input.value || "Não informado";
        
        // Adiciona o rótulo e o valor ao PDF
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(label, 10, y);
        
        doc.setFont("helvetica", "normal");
        doc.text(value, 10, y + 6);
        
        // Incrementa a posição Y para o próximo campo
        y += 12;
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
    doc.save("relatorio_tecnico.pdf");
});
