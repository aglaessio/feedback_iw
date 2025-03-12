document.getElementById("generatePdf").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Estilo do cabeçalho
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(37, 117, 252);
    doc.text("Relatório Técnico Pós Evento", 105, 20, { align: "center" });
    
    // Estilo dos dados
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    
    const formElements = document.querySelectorAll("input, select, textarea");
    let y = 40;
    
    formElements.forEach(element => {
        if (element.value.trim() !== "") {
            doc.setFont("helvetica", "bold");
            doc.text(`${element.previousElementSibling.textContent}`, 20, y);
            doc.setFont("helvetica", "normal");
            doc.text(`${element.value}`, 80, y);
            y += 10;
        }
    });
    
    // Data de Geração
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
    doc.text(`Data de Geração: ${formattedDate}`, 170, 290, { align: "right" });
    
    doc.save("relatorio_evento.pdf");
});
