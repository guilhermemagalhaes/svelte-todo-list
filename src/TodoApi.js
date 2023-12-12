export default class TodoApi{
    static localStorageKey = "todo-list";
    
    static async getAll(){
        return JSON.parse(localStorage.getItem(TodoApi.localStorageKey) || "[]");
    }

    static save(items){
        localStorage.setItem(TodoApi.localStorageKey, JSON.stringify(items));
    }    
}