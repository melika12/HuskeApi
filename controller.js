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


    //________________________________________________________________________User querys__________________________

    // getting all users
    getListOfUsers() {
        return new Promise((resolve, reject) => {
            config.conn.query("SELECT * FROM User", function(err, data) {
                if(err){
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // getting a single user
    getUser(id) {
        return new Promise((resolve, reject) => {
            // get the note
            config.conn.query("SELECT * FROM User WHERE id = " + id, function(err, data) {
                if(err){
                    reject(`Note with id ${id} not found`);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // deleting a user
    deleteUser(id) {
        return new Promise((resolve, reject) => {
            // get the note
            config.conn.query(" DELETE FROM User WHERE  ID = " + id, function(err, data) {
                if(err){
                    reject(`Note with id ${id} not found`);
                } else {
                    resolve(data);
                }
            });
        });
    }

    //add new user
    addUser(name, password) {
        return new Promise((resolve, reject) => {
            sconfig.conn.query("INSERT INTO User (Name, Password) VALUES ('"+ name +"', '"+ password +"')", function(err, data) {
                if(err){
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    

    // deleting a note
    deleteNote(id) {
        return new Promise((resolve, reject) => {
            // get the note
            config.conn.query("DELETE FROM Notes WHERE ID = " + id, function(err, data) {
                if(err){
                    reject(`Note with id ${id} not found`);
                } else {
                    resolve(`Note with id ${id} was deleted successfully`);
                }
            });
        });
    }    

    // creating a todo
    async createTodo(todo) {
        return new Promise((resolve, _) => {
            // create a todo, with random id and data sent
            let newTodo = {
                id: Math.floor(4 + Math.random() * 10),
                ...todo,
            };

            // return the new created todo
            resolve(newTodo);
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