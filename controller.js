// controller.js
// Logic behind the functionalities
const config = require('./server.js');

module.exports = class Controller {
    // getting all notes
    getListOfNotes() {
        return new Promise((resolve, reject) => {
            config.conn.query("SELECT * FROM Notes", function(err, data) {
                if(err){
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // getting a single note
    getNote(id) {
        return new Promise((resolve, reject) => {
            // get the note
            config.conn.query("SELECT * FROM Notes WHERE id = " + id, function(err, data) {
                if(err){
                    reject(`Note with id ${id} not found`);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // creating a note
    createNote(noteData) {
        var note = JSON.parse(noteData);
        return new Promise((resolve, _) => {
            // create a note
            config.conn.query("INSERT INTO NOTES (Name, Description) VALUES (" + note.name + ", " + note.description + ")", function(err, data) {
                if(err){
                    reject(`Note with name: ${note.name} could not be created`);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // updating a todo
    async updateTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo.
            let todo = data.find((todo) => todo.id === parseInt(id));
            // if no todo, return an error
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            //else, update it by setting completed to true
            todo["completed"] = true;
            // return the updated todo
            resolve(todo);
        });
    }

    // deleting a todo
    async deleteTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo
            let todo = data.find((todo) => todo.id === parseInt(id));
            // if no todo, return an error
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            // else, return a success message
            resolve(`Todo deleted successfully`);
        });
    }
}