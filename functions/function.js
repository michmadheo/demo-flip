export function statusColor(status){
    if(status === "SUCCESS"){
        return "#53b783"
    }
    else{
        return "#f5693d"
    }
}

//Fungsi untuk memberi digit separator (cth: 3000 menjadi 3.000)
export function digitSeparator(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

//Fungsi untuk rubah tanggal yang diterima dari callback, dengan catatan kalau format penulisan nya sama
export function dateConverter(date){
    let months = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
    let newDate = date.slice(0,10)
    let splitDate = newDate.split("-")
    let getMonth = 0
    if(parseInt(splitDate[1])>9){
        getMonth = splitDate[1].slice(0)
    }
    else{
        getMonth = parseInt(splitDate[1].slice(1))
    }
    let getDate = 0
    if(parseInt(splitDate[2])>9){
        getDate = splitDate[2].slice(0)
    }
    else{
        getDate = splitDate[2].slice(1)
    }
    let getYear = splitDate[0]
    let convertedDate = getDate+" "+months[getMonth]+" "+getYear
    return convertedDate;
}

//Fungsi untuk rubah format tanggal jadi angka yang bisa di compare. Nanti nya untuk di compare saat sorting
export function comparableDate(date){
    let arr = []
    let newDate = date.slice(0, 10)
    let time = date.slice(11)
    let splitDate = newDate.split("-")
    let splitTime = time.split(":")
    arr.push(splitDate.join(""))
    arr.push(splitTime.join(""))
    let comparableTime = arr.join("")
    return parseInt(comparableTime)
}