const {Readable} = require('stream');

const advices = [
  "No ice for drinks? Use frozen vegetables.",
  "If you feel alone, watcha horror movie before going to be. You won't feel alone anymore.",
  "Don't have sex after chopping jalapeños",
  "If you can't blind them with brilliance, baffle them with nonsense",
  "Always borrow money from a pessimist, they won't expect it back"
];

class StreamFromArray extends Readable {

  constructor(array){
    super({ objectMode: true}); //encoding: 'UTF-8' => Converts buffer to string
    this.array = array;
    this.index = 0
  }

  _read() {
    if(this.index <= this.array.length){
      const chunk = {
        data: this.array[this.index],
        index: this.index
      }
      this.push(chunk);
      this.index += 1;
    }else this.push(null);
  }
}


const adviceStream = new StreamFromArray(advices);

adviceStream.on('data', (chunk) => console.log(chunk));

adviceStream.on('end', () => console.log("done!"));

