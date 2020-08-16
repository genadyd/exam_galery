export default class UniqeGenerator{
  static getKey(keyLong = 32){
        let keysArray =  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",'A','B','C','D','E','F','G','H','I','J','K','L',
            "m", "n", "o", "p", "q", "r", "s",'U','V','W','X','Y','Z', "t", "u", "v", "w", "x", "y", "z" ,'M','N','O','P','Q','R','S','T', '1', '2', '3', '4', '5',
            '6', '7', '8','9','0'];
        keysArray = UniqeGenerator.shuffle(keysArray);
        let uniqueKey = '',
        i = 0;
        for (; i<=keyLong; i++){
            let uniqe =  parseInt(Math.random()*keysArray.length)
            uniqueKey +=keysArray[uniqe]
        }
        return uniqueKey;
    }
    static shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}
