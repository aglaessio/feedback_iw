document.getElementById("generatePdf").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const now = new Date();
    const formattedDate = now.toLocaleDateString("pt-BR");
    const formattedTime = now.toLocaleTimeString("pt-BR");
    
    // Título do documento
    doc.setFont("helvetica", "bold");
    doc.text("Relatório Técnico Pós Evento", 105, 20, { align: "center" });
    doc.setFont("helvetica", "normal");
    
    // Posição inicial para os campos do formulário
    let y = 30;
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
    
    // Adiciona "Gerado em:" no canto inferior esquerdo
    doc.setFontSize(10);
    const text = `Gerado em: ${formattedDate} ${formattedTime}`;
    const textWidth = doc.getTextWidth(text);
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Verifica se o texto ultrapassa a margem e ajusta a posição
    if (textWidth > pageWidth - 20) {
        doc.setFontSize(8); // Reduz o tamanho da fonte se necessário
    }
    
    // Posiciona o texto no canto inferior esquerdo
    doc.text(text, 10, 280); // 10 é a margem esquerda, 280 é a posição Y próxima ao rodapé
    
    // Salva o PDF
    doc.save("relatorio_tecnico.pdf");
});
