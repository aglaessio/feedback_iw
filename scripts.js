document.getElementById("generatePdf").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const now = new Date();
    const formattedDate = now.toLocaleDateString("pt-BR");
    const formattedTime = now.toLocaleTimeString("pt-BR");
    
    // Cores do PDF
    const primaryColor = [37, 117, 252]; // Azul
    const secondaryColor = [33, 37, 41]; // Cinza escuro
    const bgColor = [240, 240, 240]; // Cinza claro
    
    doc.setFillColor(...bgColor);
    doc.rect(0, 0, 210, 297, "F"); // Fundo colorido
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("Relatório Técnico Pós Evento", 105, 20, { align: "center" });
    
    let y = 30;
    document.querySelectorAll(".form-group").forEach((group) => {
        const label = group.querySelector("label").innerText;
        const input = group.querySelector("input, select, textarea");
        const value = input.value || "Não informado";
        
        doc.setFontSize(12);
        doc.setTextColor(...secondaryColor);
        doc.setFont("helvetica", "bold");
        doc.text(label, 10, y);
        
        doc.setFont("helvetica", "normal");
        doc.text(value, 10, y + 6);
        
        y += 12;
    });
    
    doc.setFontSize(10);
    doc.setTextColor(...secondaryColor);
    const footerText = `Gerado em: ${formattedDate} ${formattedTime}`;
    const textWidth = doc.getTextWidth(footerText);
    doc.text(footerText, 200 - textWidth, 280);
    
    doc.save("relatorio_tecnico.pdf");
});
