let max = 90
let min = 0
export function createEventId() {
    var aleatorio = 0
    aleatorio= Math.floor((Math.random()* (max - min +1 )) + min);
    
    return String(aleatorio);
    
    
  }
  