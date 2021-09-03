class Note {
    constructor(id, title, text) {
        this.id = id;
        this.title = title;
        this.text = text;
    }

    getID() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getText() {
        return this.text;
    }
}

module.exports = Note;