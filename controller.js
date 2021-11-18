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

    // updating a note
    updateNote(id, noteData) {
        var data = JSON.parse(noteData);
        return new Promise((resolve, reject) => {
            // get the note
            config.conn.query("UPDATE Notes SET Name = '" + data["name"] + "', Description = '" + data["description"] + "' WHERE ID = " + id, function(err, data) {
                if(err){
                    reject(`Note with id ${id} not found`);
                } else {
                    resolve(`Note with id ${id} was successfully updated`);
                }
            });
        });
    }

    // creating a note
    createNote(noteData) {
        let note = JSON.parse(noteData);
        return new Promise((resolve, reject) => {
            // create a note
            config.conn.query("INSERT INTO Notes (Name, Description) VALUES ('" + note["name"] + "', '" + note["description"] + "')", function(err, data) {
                if(err){
                    reject(`Note with name: ${note["name"]} could not be created`);
                } else {
                    resolve(data);
                }
            });
        });
    }

    //____________________________________________User queries______________________________________________

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
            config.conn.query(" DELETE FROM User WHERE ID = " + id, function(err, data) {
                if(err){
                    reject(`User with id ${id} not found`);
                } else {
                    resolve(`User with id ${id} was deleted successfully`);
                }    
            });    
        });    
    }    

    //add new user
    addUser(userData) {
        var user = JSON.parse(userData);
        return new Promise((resolve, reject) => {
            config.conn.query("INSERT INTO User (Name, Password) VALUES ('"+ user["name"] +"', '"+ user["password"] +"')", function(err, data) {
                if(err){
                    reject(err);
                } else {
                    resolve(data);
                }    
            });    
        });    
    }
    
    // updating a user
    updateUser(id, userData) {
        var data = JSON.parse(userData);
        return new Promise((resolve, reject) => {
            // get the note
            config.conn.query("UPDATE User SET Name = '" + data["name"] + "', Password = '" + data["password"] + "' WHERE ID = " + id, function(err, data) {
                if(err){
                    reject(`User with id ${id} not found`);
                } else {
                    resolve(`User with id ${id} was successfully updated`);
                }
            });
        });
    }  
    
    //____________________________________________Login/Logout______________________________________________
    login(userData) {
        var data = JSON.parse(userData);
        return new Promise((resolve, reject) => {
            config.conn.query("SELECT Id FROM User WHERE Name = '"+ data["name"] +"' AND Password = '"+ data["password"] +"'", function(err, data) {
                if(err) {
                    console.log(err);
                    reject(`User not found`);
                } else {
                    resolve(data[0]);
                }
            });
        });
    }

    logout() {

    }
}