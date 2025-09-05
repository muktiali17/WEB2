document.addEventListener("DOMContentLoaded", function () {
    const visualCheckItems = document.querySelectorAll(".check-item");
    const hasilPersentaseEl = document.getElementById("hasil-persentase");
    const hasilRekomendasiEl = document.getElementById("hasil-rekomendasi");

    function calculateVisualScore() {
        let totalScore = 0;
        const maxScore = visualCheckItems.length * 1;

        visualCheckItems.forEach((item) => {
            totalScore += parseInt(item.value, 10);
        });

        const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

        if (hasilPersentaseEl && hasilRekomendasiEl) {
            hasilPersentaseEl.textContent = percentage.toFixed(1) + "%";
            hasilRekomendasiEl.classList.remove(
                "rekomendasi-baik",
                "rekomendasi-cukup",
                "rekomendasi-kurang"
            );

            if (percentage >= 80) {
                hasilRekomendasiEl.textContent = "Layak";
                hasilRekomendasiEl.classList.add("rekomendasi-baik");
            } else if (percentage >= 50) {
                hasilRekomendasiEl.textContent = "Perlu Perbaikan";
                hasilRekomendasiEl.classList.add("rekomendasi-cukup");
            } else {
                hasilRekomendasiEl.textContent = "Tidak Layak";
                hasilRekomendasiEl.classList.add("rekomendasi-kurang");
            }
        }
    }

    // Menjalankan fungsi saat ada perubahan dan saat halaman dimuat
    visualCheckItems.forEach((item) => {
        item.addEventListener("change", calculateVisualScore);
    });
    calculateVisualScore();
});
document.querySelectorAll('textarea').forEach(function(textarea) {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';

// // Menjalankan semua kode setelah halaman HTML siap
// document.addEventListener('DOMContentLoaded', () => {

//     // --- BAGIAN INTERAKTIF: HITUNG SKOR VISUAL ---
//     const visualCheckItems = document.querySelectorAll('.visual-check-item');
//     const hasilPersentaseEl = document.getElementById('hasil-persentase');
//     const hasilRekomendasiEl = document.getElementById('hasil-rekomendasi');

//     function hitungSkorVisual() {
//         let totalSkor = 0;
//         const maxSkor = visualCheckItems.length * 2; // Nilai 'Baik' adalah 2

//         visualCheckItems.forEach(select => {
//             totalSkor += parseInt(select.value, 10);
//         });

//         const persentase = (totalSkor / maxSkor) * 100;

//         // Update tampilan hasil
//         hasilPersentaseEl.textContent = persentase.toFixed(1) + '%';

//         if (persentase >= 85) {
//             hasilRekomendasiEl.textContent = 'Layak';
//             hasilRekomendasiEl.style.color = '#28a745';
//         } else if (persentase >= 60) {
//             hasilRekomendasiEl.textContent = 'Layak dengan Catatan';
//             hasilRekomendasiEl.style.color = '#ffc107';
//         } else {
//             hasilRekomendasiEl.textContent = 'Tidak Layak';
//             hasilRekomendasiEl.style.color = '#dc3545';
//         }
//     }

//     // Tambahkan event listener ke setiap item select
//     visualCheckItems.forEach(item => {
//         item.addEventListener('change', hitungSkorVisual);
//     });

//     // Panggil sekali saat halaman dimuat
//     hitungSkorVisual();

//     // --- BAGIAN DOWNLOAD PDF ---
//     const downloadButton = document.getElementById('download-button');
//     const elementToCapture = document.getElementById('form-to-pdf');

//     if (downloadButton && elementToCapture) {
//         downloadButton.addEventListener('click', () => {
//             console.log("Memulai proses pembuatan PDF...");
//             // Nonaktifkan tombol untuk mencegah klik ganda
//             downloadButton.textContent = 'Membuat PDF...';
//             downloadButton.disabled = true;

//             html2canvas(elementToCapture, { scale: 2, useCORS: true }).then(canvas => {
//                 const imgData = canvas.toDataURL('image/png');
//                 const pdf = new jsPDF('p', 'mm', 'a4');
//                 const pdfWidth = pdf.internal.pageSize.getWidth();
//                 const canvasWidth = canvas.width;
//                 const canvasHeight = canvas.height;
//                 const ratio = canvasHeight / canvasWidth;
//                 const imgHeight = pdfWidth * ratio;

//                 let heightLeft = imgHeight;
//                 let position = 0;

//                 pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
//                 heightLeft -= pdf.internal.pageSize.getHeight();

//                 while (heightLeft > 0) {
//                     position = heightLeft - imgHeight;
//                     pdf.addPage();
//                     pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
//                     heightLeft -= pdf.internal.pageSize.getHeight();
//                 }

//                 pdf.save('Laporan-Kelayakan-Instalasi-Listrik.pdf');
//                 console.log("PDF berhasil dibuat.");

//                 // Aktifkan kembali tombol setelah selesai
//                 downloadButton.textContent = 'Unduh PDF';
//                 downloadButton.disabled = false;
//             });
//         });
//     } else {
//         console.error("Elemen untuk PDF tidak ditemukan. Periksa ID #form-to-pdf dan #download-button.");
//     }
// });
