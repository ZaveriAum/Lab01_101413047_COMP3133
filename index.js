const fs = require('fs')
const csv = require('csv-parser')

// A. Delete the canada.txt and usa.txt
files = {
    "Canada":"canada.txt",
    "United States": "usa.txt"
}

for( let key in files){
    fs.exists(files[key], (e)=>{
        if(e){
            fs.unlink(files[key],(e)=>{
                if (e) console.error(e)
                else{
                    console.log(files[key] + " Deleted successfully.")
                    fs.writeFile(files[key], 'country,year,population\r\n', (e)=>{
                        if (e) console.log(e)
                    })
                }
            })
        }else{
            console.log(files[key] + " Does not exists")
        }
    })
}
// B, C :-> Filter data of Canada and write data to canada.txt, Filter data of United States and write data to usa.txt

for( let key in files){

    fs.createReadStream('input_countries.csv')
        .pipe(csv())
        .on('data', (row) => {
            if (row.country == key){
                let input = `${row.country},${row.year},${row.population}\r\n`
                
                fs.appendFile(files[key], input, (e)=>{
                    if (e) console.log(e)
                })
            }
            
        })
        .on('end', () => {
        console.log(files[key] + ' successfully processed');
        });
}

// fs.createReadStream('input_countries.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     console.log(row.country);
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
// });