document.addEventListener("DOMContentLoaded", function () {
    const formulirContainer = document.getElementById("formulir-container");
    const tambahGedungBtn = document.getElementById("tambah-gedung-btn");
    let nomorGedung = 1;

    // Fungsi untuk menginisialisasi setiap formulir gedung secara terpisah
    function inisialisasiFormulir(konteksFormulir) {
        const visualCheckItems = konteksFormulir.querySelectorAll(".visual-check-item");
        const hasilPersentaseEl = konteksFormulir.querySelector(".hasil-persentase");
        const hasilRekomendasiEl = konteksFormulir.querySelector(".hasil-rekomendasi");

        // Fungsi perhitungan berdasarkan logika yang Anda berikan
        function calculateVisualScore() {
            if (!visualCheckItems.length || !hasilPersentaseEl || !hasilRekomendasiEl) return;

            let totalScore = 0;
            const maxScore = visualCheckItems.length * 2; // Nilai 'Baik' adalah 2

            visualCheckItems.forEach((item) => {
                totalScore += parseInt(item.value, 10);
            });

            const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

            hasilPersentaseEl.textContent = percentage.toFixed(1) + "%";

            // Mengganti class untuk styling (lebih baik dari inline style)
            hasilRekomendasiEl.classList.remove("rekomendasi-baik", "rekomendasi-cukup", "rekomendasi-kurang");

            if (percentage >= 85) {
                hasilRekomendasiEl.textContent = "Layak";
                hasilRekomendasiEl.classList.add("rekomendasi-baik");
            } else if (percentage >= 60) {
                hasilRekomendasiEl.textContent = "Perlu Perbaikan";
                hasilRekomendasiEl.classList.add("rekomendasi-cukup");
            } else {
                hasilRekomendasiEl.textContent = "Tidak Layak";
                hasilRekomendasiEl.classList.add("rekomendasi-kurang");
            }
        }

        // Jalankan fungsi saat ada perubahan pada dropdown
        visualCheckItems.forEach((item) => {
            item.addEventListener("change", calculateVisualScore);
        });

        // Panggil sekali saat inisialisasi untuk menampilkan nilai awal
        calculateVisualScore();
    }

    // Inisialisasi formulir pertama yang sudah ada di HTML
    inisialisasiFormulir(document.querySelector(".formulir-gedung"));

    // Fungsi untuk tombol "Tambah Gedung Lain"
    tambahGedungBtn.addEventListener("click", function () {
        nomorGedung++;
        const template = document.querySelector(".formulir-gedung");
        const klon = template.cloneNode(true);

        // Reset semua nilai input dan select di formulir yang baru
        klon.querySelectorAll("input, select").forEach((el) => {
            // Reset nilai
            if (el.type === 'text' || el.type === 'number') {
                el.value = '';
            } else if (el.tagName === 'SELECT') {
                el.selectedIndex = 0;
            }

            // Update ID dan 'for' agar unik
            if (el.id) {
                const oldId = el.id.replace(/-\d+$/, "");
                el.id = `${oldId}-${nomorGedung}`;
            }
        });

        klon.querySelectorAll("label").forEach((label) => {
            if (label.htmlFor) {
                const oldFor = label.htmlFor.replace(/-\d+$/, "");
                label.htmlFor = `${oldFor}-${nomorGedung}`;
            }
        });
        
        // Update label dan placeholder untuk Nama Gedung
        const labelGedung = klon.querySelector('label[for^="nama-gedung"]');
        const inputGedung = klon.querySelector('input[id^="nama-gedung"]');
        if (labelGedung) labelGedung.textContent = `1. Nama Gedung`; // Label tetap sama, nomor urut tidak diubah
        if (inputGedung) inputGedung.placeholder = `Contoh: Gedung ${String.fromCharCode(64 + nomorGedung)}`;

        formulirContainer.appendChild(klon);
        inisialisasiFormulir(klon); // Aktifkan fungsionalitas untuk formulir baru
    });
});

// Fungsi untuk Generate PDF (dibuat di scope global agar bisa dipanggil dari HTML)
function generatePdf() {
    const element = document.getElementById("form-kelayakan");
    const opt = {
        margin: 0.5,
        filename: "formulir_kelayakan_instalasi.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    // Trik agar nilai input dan select yang diubah user ikut tercetak di PDF
    document.querySelectorAll("input[type='text'], input[type='number']").forEach(input => {
        input.setAttribute("value", input.value);
    });
    document.querySelectorAll("select").forEach(select => {
        const selectedOption = select.options[select.selectedIndex];
        if (selectedOption) {
            Array.from(select.options).forEach(opt => opt.removeAttribute("selected"));
            selectedOption.setAttribute("selected", "selected");
        }
    });

    html2pdf().set(opt).from(element).save();
}

// document.addEventListener("DOMContentLoaded", function () {
//     const visualCheckItems = document.querySelectorAll(".visual-check-item");
//     const hasilPersentaseEl = document.getElementById("hasil-persentase");
//     const hasilRekomendasiEl = document.getElementById("hasil-rekomendasi");

//     function calculateVisualScore() {
//         let totalScore = 0;
//         const maxScore = visualCheckItems.length * 2;

//         visualCheckItems.forEach((item) => {
//             totalScore += parseInt(item.value, 10);
//         });

//         const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

//         if (hasilPersentaseEl && hasilRekomendasiEl) {
//             hasilPersentaseEl.textContent = percentage.toFixed(1) + "%";
//             hasilRekomendasiEl.classList.remove(
//                 "rekomendasi-baik",
//                 "rekomendasi-cukup",
//                 "rekomendasi-kurang"
//             );

//             if (percentage >= 85) {
//                 hasilRekomendasiEl.textContent = "Layak";
//                 hasilRekomendasiEl.classList.add("rekomendasi-baik");
//             } else if (percentage >= 60) {
//                 hasilRekomendasiEl.textContent = "Perlu Perbaikan";
//                 hasilRekomendasiEl.classList.add("rekomendasi-cukup");
//             } else {
//                 hasilRekomendasiEl.textContent = "Tidak Layak";
//                 hasilRekomendasiEl.classList.add("rekomendasi-kurang");
//             }
//         }
//     }

//     // Menjalankan fungsi saat ada perubahan dan saat halaman dimuat
//     visualCheckItems.forEach((item) => {
//         item.addEventListener("change", calculateVisualScore);
//     });
//     calculateVisualScore();
// });

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
