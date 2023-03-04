type Words = {
    //객체의 property에 대해 모르지만 타입만을 알 떄 유용
    [key: string]: (string | string[])
}

class Dict {
    private words: Words
    constructor() {
        this.words = {}
    }
    add(word: Word) {   // word는 Word 클래스의 인스턴스 타입
        if (!this.words[word.term]) {
            this.words[word.term] = word.def;
        }
    }
    getDef(term: string) {
        return this.words[term];
    }
    deleteWord(term: string) {
        if (this.words[term] !== undefined) {
            delete this.words[term]
        }
    }
    updateName(oldTerm: string, newTerm: string) {
        if (this.words.hasOwnProperty(oldTerm)) {
            this.words[newTerm] = this.words[oldTerm];
            delete this.words[oldTerm]
        }
    }
    all() {
        for (let [key, value] of Object.entries(this.words)) {
            console.log(`${key}: ${value}`)
        }
    }
}

class Word {
    constructor(
        public term: string,
        public def: (string | string[])
    ) { }
    updateDef(oldDef: string, newDef: string) {
        if (typeof this.def === "string") {
            if (oldDef === this.def) this.def = newDef
        }
        else {
            this.def.filter(val => val !== oldDef)
            this.def.push(newDef)
        }
    }
}

const kimchi = new Word("kimchi", "한국의 음식")
const sushi = new Word("sushi", "일본의 음식")
const dict = new Dict()
dict.add(kimchi)
dict.add(sushi)
dict.all()
dict.updateName("kimchi", "김치")
dict.all()
kimchi.updateDef("한국의 음식", "김치")
dict.all()