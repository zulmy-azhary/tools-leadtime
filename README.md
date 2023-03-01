# Leadtime Management Body Repair & Paint 

## Sekilas mengenai project aplikasi kami
Project ini merupakan sebuah aplikasi berbasis ***web app*** yang dibangun untuk memenuhi program kerja KKN di **[PT. Hadji Kalla Toyota Cabang Urip Sumohardjo](https://www.kallatoyota.co.id/dealer/kalla-toyota-cab-urip-sumohardjo)**. Fungsi utama dari aplikasi ini adalah untuk menyediakan sistem manajemen leadtime yang dapat membantu pengelola/admin untuk melakukan pemantauan dan evaluasi terhadap tahap-tahap atau proses pengerjaan kendaraan roda empat, serta memastikan bahwa prosedur-prosedur yang telah ditetapkan telah diikuti dengan baik dan selesai tepat waktu.

Dengan hadirnya aplikasi ini, diharapkan kinerja para karyawan di Kalla Toyota Cabang Urip Sumohardjo dapat ditingkatkan, dan pada akhirnya dapat meningkatkan kepuasan pelanggan.

## Bagaimana cara menggunakan?
Untuk menggunakan aplikasi ini, anda bisa mengikuti langkah-langkah berikut :
- Anda dapat memulai dengan menggunakan command `git clone <url>` untuk mengunduh repository dari project ini ke perangkat lokal anda.

	```sh
	# clone tools-leadtime repository
	git clone https://github.com/zulmy-azhary/tools-leadtime
	```

- Anda dapat membuka direktori `tools-leadtime` dengan menggunakan command `cd <nama_folder>` pada terminal.
	```sh
	# access tools-leadtime folder
	cd tools-leadtime
	```

- Setelah Anda berhasil masuk ke direktori `tools-leadtime`, langkah selanjutnya adalah menginstal semua package yang dibutuhkan dengan menjalankan command `npm run install-all` pada terminal.
	```sh
	# install all package
	npm run install-all
	```
	tujuannya agar package yang dibutuhkan pada direktori utama & sub-direktori (client & server) diinstal secara otomatis.

- Setelah proses instalasi package selesai maka project siap dijalankan. Untuk menjalankan silahkan gunakan command `npm run all` pada direktori utama/root.
	```sh
	# run project
	npm run all
	```
	Karena aplikasi ini memiliki sub-direktori client & server yang seharusnya dijalnkan secara terpisah, maka command ini dibuat untuk menjalankan keduanya secara konkuren dalam sekali eksekusi pada direktori utama/root.

- Jika anda ingin menjalankan aplikasi ini pada ***stagging environment***, anda bisa menggunakan command `npm run preview-all`.
	```sh
	# run at stagging environment
	npm run preview-all
	```