let todo;
const onHashChange = () => {
    todo.controller.setView(document.location.hash);
};

const onLoad = () => {
    todo = new Todo("javascript-es6-webpack", "todoapp");
    onHashChange();
};

function Todo(name, listHtmlClass) {
    this.storage = new Store(name);
    this.model = new Model(this.storage);
    this.template = new Template();
    this.view = new View(this.template, listHtmlClass);
    this.controller = new Controller(this.model, this.view);
}

window.addEventListener("load", onLoad);
window.addEventListener("hashchange", onHashChange);
