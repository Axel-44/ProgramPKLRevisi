<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-100 to-blue-200 relative overflow-hidden">
      <div class="absolute inset-0">
        <svg class="absolute top-0 right-0 w-96 h-96 text-white opacity-20" viewBox="0 0 400 400" fill="currentColor">
          <path d="M100 200 Q200 100 300 200 Q200 300 100 200 Z"/>
        </svg>
        <svg class="absolute bottom-0 left-0 w-64 h-64 text-white opacity-20" viewBox="0 0 400 400" fill="currentColor">
          <path d="M50 150 Q150 50 250 150 Q150 250 50 150 Z"/>
        </svg>
      </div>
      
      <div class="container mx-auto px-4 py-8 relative z-10">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-sm">BKAD</span>
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-800">WEBSITE BKAD</h1>
              <h2 class="text-xl md:text-2xl font-semibold text-gray-700">KOTA BOGOR</h2>
            </div>
          </div>
          
          <!-- Social Media Icons -->
          <div class="flex flex-col space-y-3">
            <a href="#" class="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-4">
        <div class="flex justify-center space-x-8 py-4">
          <a href="#" class="flex flex-col items-center space-y-1 text-blue-600 hover:text-blue-800 transition-colors">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span class="text-sm font-medium">Profil</span>
          </a>
          <a href="#" class="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-600 transition-colors">
            <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <span class="text-sm font-medium">Berita</span>
          </a>
          <a href="#" class="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-600 transition-colors">
            <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V8h-2v5z"/>
              </svg>
            </div>
            <span class="text-sm font-medium">Informasi</span>
          </a>
          <a href="#" class="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-600 transition-colors">
            <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span class="text-sm font-medium">Layanan</span>
          </a>
        </div>
        
        <!-- Secondary Navigation -->
        <div class="flex justify-center space-x-8 py-2 border-t">
          <a href="#" class="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-600 transition-colors">
            <div class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span class="text-xs">Struktur</span>
          </a>
          <a href="#" class="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-600 transition-colors">
            <div class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </div>
            <span class="text-xs">PPID</span>
          </a>
          <a href="#" class="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-600 transition-colors">
            <div class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <span class="text-xs">Kontak</span>
          </a>
        </div>
      </div>
    </nav>

    <!-- Hero Illustration -->
    <section class="bg-gradient-to-b from-teal-400 to-teal-500 py-12">
      <div class="container mx-auto px-4">
        <div class="bg-teal-400 rounded-lg p-8 relative overflow-hidden">
          <!-- Traditional Gate Illustration -->
          <div class="flex justify-center">
            <div class="relative">
              <!-- Mountains Background -->
              <svg class="w-80 h-48" viewBox="0 0 320 192" fill="none">
                <!-- Sky -->
                <rect width="320" height="192" fill="#4FD1C7"/>
                
                <!-- Mountains -->
                <path d="M0 120 L80 60 L160 100 L240 40 L320 80 L320 192 L0 192 Z" fill="#10B981"/>
                <path d="M0 140 L60 80 L120 120 L180 60 L240 100 L320 120 L320 192 L0 192 Z" fill="#059669"/>
                
                <!-- Traditional Gate -->
                <g transform="translate(120, 80)">
                  <!-- Gate Base -->
                  <rect x="0" y="60" width="80" height="40" fill="#6B7280"/>
                  
                  <!-- Gate Pillars -->
                  <rect x="5" y="20" width="15" height="80" fill="#374151"/>
                  <rect x="60" y="20" width="15" height="80" fill="#374151"/>
                  
                  <!-- Gate Roof -->
                  <path d="M-5 20 L40 5 L85 20 L75 15 L40 0 L5 15 Z" fill="#DC2626"/>
                  
                  <!-- Gate Door -->
                  <rect x="25" y="40" width="30" height="60" fill="#8B5CF6"/>
                  
                  <!-- Decorative Elements -->
                  <circle cx="15" cy="10" r="3" fill="#FCD34D"/>
                  <circle cx="65" cy="10" r="3" fill="#FCD34D"/>
                </g>
                
                <!-- Trees -->
                <circle cx="60" cy="140" r="15" fill="#10B981"/>
                <rect x="57" y="140" width="6" height="20" fill="#92400E"/>
                
                <circle cx="260" cy="130" r="12" fill="#10B981"/>
                <rect x="257" y="130" width="6" height="18" fill="#92400E"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Welcome Message -->
          <section class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Sambutan Kepala BKAD Kota Bogor</h3>
            <div class="flex space-x-4">
              <div class="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                <div class="h-4 bg-gray-200 rounded w-4/6"></div>
                <div class="h-4 bg-gray-200 rounded w-3/6"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </section>

          <!-- News Section -->
          <section class="bg-white rounded-lg shadow-md p-6">
            <div class="flex space-x-4 mb-6">
              <button 
                @click="activeTab = 'bkad'" 
                :class="activeTab === 'bkad' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
                class="px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Berita BKAD
              </button>
              <button 
                @click="activeTab = 'bogor'" 
                :class="activeTab === 'bogor' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
                class="px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Berita Kota Bogor
              </button>
            </div>
            
            <div class="space-y-4">
              <div class="flex space-x-4">
                <div class="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div class="space-y-2 flex-1">
                  <div class="h-4 bg-gray-200 rounded w-full"></div>
                  <div class="h-4 bg-gray-200 rounded w-4/5"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/5"></div>
                </div>
              </div>
            </div>
          </section>

          <!-- Photo Gallery -->
          <section class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Foto Terbaru</h3>
            <div class="grid grid-cols-3 gap-4">
              <div v-for="i in 6" :key="i" class="aspect-square bg-gray-200 rounded-lg"></div>
            </div>
          </section>

          <!-- Video Gallery -->
          <section class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Video Terbaru</h3>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="i in 2" :key="i" class="aspect-video bg-gray-200 rounded-lg"></div>
            </div>
          </section>
        </div>

        <!-- Right Sidebar -->
        <div class="space-y-6">
          <!-- Calendar -->
          <section class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Kalender</h3>
            <div class="text-center mb-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600">Umum</span>
                <span class="text-sm text-gray-600">K. Islam</span>
              </div>
              <div class="text-lg font-semibold">Agustus 2025</div>
            </div>
            
            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-1 text-center text-sm">
              <div v-for="day in ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']" :key="day" class="p-2 font-medium text-gray-600">
                {{ day }}
              </div>
              <div v-for="date in calendarDates" :key="date" class="p-2 hover:bg-blue-100 rounded cursor-pointer">
                {{ date }}
              </div>
            </div>
          </section>

          <!-- Agenda -->
          <section class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Agenda</h3>
            <div class="space-y-3">
              <div class="text-sm">
                <div class="font-medium text-gray-800">Rapat Koordinasi Anggaran</div>
                <div class="text-gray-600">15 Agustus 2025, 09:00 WIB</div>
              </div>
              <div class="text-sm">
                <div class="font-medium text-gray-800">Monitoring Realisasi Pendapatan BKAD Kota Bogor</div>
                <div class="text-gray-600">18 Agustus 2025, 10:00 WIB</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 class="text-lg font-bold mb-4">BKAD Kota Bogor</h4>
            <p class="text-gray-300 text-sm">
              Badan Keuangan dan Aset Daerah Kota Bogor berkomitmen untuk mengelola keuangan dan aset daerah secara transparan dan akuntabel.
            </p>
          </div>
          <div>
            <h4 class="text-lg font-bold mb-4">Kontak</h4>
            <div class="text-gray-300 text-sm space-y-2">
              <p>Jl. Ir. H. Juanda No. 10, Bogor</p>
              <p>Telp: (0251) 8321075</p>
              <p>Email: bkad@kotabogor.go.id</p>
            </div>
          </div>
          <div>
            <h4 class="text-lg font-bold mb-4">Jam Pelayanan</h4>
            <div class="text-gray-300 text-sm space-y-2">
              <p>Senin - Kamis: 08:00 - 16:00 WIB</p>
              <p>Jumat: 08:00 - 16:30 WIB</p>
              <p>Sabtu - Minggu: Tutup</p>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center">
          <p class="text-gray-400 text-sm">© 2025 BKAD Kota Bogor. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('bkad')

const calendarDates = computed(() => {
  const dates = []
  // Add empty cells for days before month starts (assuming August 2025 starts on Friday)
  for (let i = 0; i < 5; i++) {
    dates.push('')
  }
  // Add dates 1-31 for August
  for (let i = 1; i <= 31; i++) {
    dates.push(i)
  }
  return dates
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
