// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"

// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseconfig = {
  apiKey: "AIzaSyAoa6XVwvLudjkyHxzF2Q8Xp61BEaG8_Ho",
  authDomain: "insancemerlang-e829c.firebaseapp.com",
  projectId: "insancemerlang-e829c",
  storageBucket: "insancemerlang-e829c.firebasestorage.app",
  messagingSenderId: "544747474491",
  appId: "1:544747474491:web:be2b4a1553734a5c53961e"
}

const app = initializeApp(firebaseconfig)
const db = getFirestore(app)
const tanamancollection = collection(db, "tanaman")

// fungsi untuk menampilkan daftar tanaman
export async function daftartanaman() {
  
  // ambil snapshot data dari koleksi tanaman
  const snapshot = await getDocs(tanamancollection)
  
  // ambil elemen tabel data
  const tabel = document.getElementById('tabelData')
  
  // kosongkan isi tabel nya
  tabel.innerHTML = ""
  
  // loop setiap dokumen dalam snapshot
  snapshot.forEach((doc) => {
    // variabel untuk menyimpan data
    const data = doc.data()
    const id = doc.id
    
    // buat elemen kolom untuk nomor urut
    
    
    // buat elemen baris baru
    const baris = document.createElement("tr")
    const nomorUrut = document.createElement("td")
    nomorUrut.textContent = tabel.rows.length + 1
    // buat elemen kolom untuk tanaman
    const kolomtanaman = document.createElement("td")
    kolomtanaman.textContent = data.tanaman
    
    // buat elemen untuk kolom warna 
    const kolomwarna = document.createElement("td")
    kolomwarna.textContent = data.warna
    
    // buat elemen kolom untuk jenis
    const kolomjenis = document.createElement('td')
    kolomjenis.textContent = data.jenis
    
    // buat elemen kolom untuk aksi
    const kolomAksi = document.createElement('td')
    
    // tombol tanaman
    // tombol edit
    const tombolEdit = document.createElement('a')
    tombolEdit.textContent = 'Edit'
    tombolEdit.href = 'edit.html?id=' + id
    tombolEdit.className = 'button edit'
    
    // tombol hapus
    const tombolHapus = document.createElement('button')
    tombolHapus.textContent = 'Hapus'
    tombolHapus.className = 'button delete'
    tombolHapus.onclick = async () => {
      await hapustanaman(id)
    }
    
    //tambahkan elemen ke dalam kolom aksi
    kolomAksi.appendChild(tombolEdit)
    kolomAksi.appendChild(tombolHapus)
    
    // tambahkan kolom ke dalam baris
    baris.appendChild(nomorUrut)
    baris.appendChild(kolomtanaman)
    baris.appendChild(kolomwarna)
    baris.appendChild(kolomjenis)
    baris.appendChild(kolomAksi)
    
    // tambahkan baris ke dalam tabel
    tabel.appendChild(baris)
    
  })
}

//fungsi untuk menambahkan tanaman baru
export async function tambahtanaman(data) {
  //ambil nilai dari from
  const tanaman = document.getElementById('namatanaman').value
  const warna = document.getElementById('warna').value
  const jenis = document.getElementById('jenis').value
  
  // tambahkan data ke firestore
  await addDoc(tanamancollection, {
    tanaman: tanaman,
    warna: warna,
    jenis: jenis
  })
  
  // alihkan ke halaman daftar tanaman
  window.location.href = 'daftar.html'
}

 //fungsi untuk mengambil data tanaman bedasarkan id
 //agar data ditampilkan di form. ubah
 export async function ambiltanaman(id) {
   const docRef = doc(db, "tanaman", id)
   const docSnap = await getDoc(docRef)
   
   return await docSnap.data()
 }
 
 //fungsi untuk mengubah data tanaman
 export async function ubahtanaman(id, namatanaman, warna, jenis) {
   // mengubah data di firestore
   await updateDoc(doc(db, "tanaman", id), {
     namatanaman: tanaman,
     warna: warna,
     jenis: jenis,
   })
   
   //alihkan ke halaman daftar tanaman
   window.location.href = 'daftar.html'
 }