document.getElementById("generatePdf").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const now = new Date();
    const formattedDate = now.toLocaleDateString("pt-BR");
    const formattedTime = now.toLocaleTimeString("pt-BR");
    
    doc.setFont("helvetica", "bold");
    doc.text("Relatório Técnico Pós Evento", 105, 20, { align: "center" });
    doc.setFont("helvetica", "normal");
    
    let y = 30;
    document.querySelectorAll(".form-group").forEach((group) => {
        const label = group.querySelector("label").innerText;
        const input = group.querySelector("input, select, textarea");
        const value = input.value || "Não informado";
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(label, 10, y);
        
        doc.setFont("helvetica", "normal");
        doc.text(value, 10, y + 6);
        
        y += 12;
    });
    
    doc.setFontSize(10);
    doc.text(`Data de Geração: ${formattedDate} ${formattedTime}`, 160, 280);
    
    doc.save("relatorio_tecnico.pdf");
});
