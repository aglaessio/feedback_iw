document.getElementById("generatePdf").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Relatório Técnico Pós Evento", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    const formElements = document.querySelectorAll("input, select, textarea");
    let y = 40;
    
    formElements.forEach(element => {
        if (element.value.trim() !== "") {
            doc.text(`${element.previousElementSibling.textContent} ${element.value}`, 20, y);
            y += 10;
        }
    });
    
    doc.save("relatorio_evento.pdf");
});
