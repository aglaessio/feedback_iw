document.getElementById("generatePdf").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    
    // Estilo do cabeçalho
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(37, 117, 252);
    doc.text("Relatório Técnico Pós Evento", 105, 20, { align: "center" });
    
    // Estilo dos dados
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    
    const formElements = document.querySelectorAll(".form-group");
    let y = 40;
    const lineHeight = 8;
    
    formElements.forEach(element => {
        const label = element.querySelector("label").textContent;
        const input = element.querySelector("input, select, textarea");
        if (input && input.value.trim() !== "") {
            doc.setFont("helvetica", "bold");
            doc.text(`${label}:`, 20, y);
            doc.setFont("helvetica", "normal");
            doc.text(`${input.value}`, 80, y);
            y += lineHeight;
        }
    });
    
    // Data de Geração no canto inferior direito
    const date = new Date();
    const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Data de Geração: ${formattedDate}`, 200, 290, { align: "right" });
    
    doc.save("relatorio_evento.pdf");
});
