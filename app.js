const http = require("http");
const Controller = require("./controller.js");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 8080;

const server = http.createServer(async (req, res) => {
    // /notes/index : GET
    if (req.url === "/notes/index" && req.method === "GET") {
        var controller = new Controller();
        res.writeHead(200, { "Content-Type": "application/json" });
        try {
            const list = await controller.getListOfNotes();
            res.write(JSON.stringify(list));
        } catch (error) {
            res.write("ERROR");
            console.log(error);
        }
        res.end();
    }
    
    // /notes/index/:id : GET
    else if (req.url.match(/\/notes\/index\/([0-9]+)/) && req.method === "GET") {
        var controller = new Controller();
        res.writeHead(200, { "Content-Type": "application/json" });
        try {
            const id = req.url.split("/")[3];
            const note = await controller.getNote(id);
            res.write(JSON.stringify(note));
        } catch (error) {
            res.write(JSON.stringify({ message: error }));
        }
        res.end();
    }

    // /note/add : CREATE
    else if (req.url === "/note/add" && req.method === "POST") {
        
        // get the name, time of event and description from the body
        
        var controller = new Controller();
        res.writeHead(200, { "Content-Type": "application/json" });
        try {
            let noteData = await getReqData(req);
            let note = await controller.createNote(noteData);
            res.write(JSON.stringify(note));
        } catch (error) {
            res.write(JSON.stringify({ message: error }));
        }
        res.end();
    }

    // /note/delete/:id : DELETE
    else if (req.url.match(/\/note\/delete\/([0-9]+)/) && req.method === "DELETE") {
        var controller = new Controller();
        res.writeHead(200, { "Content-Type": "application/json" });
        try {
            // get the id from url
            const id = req.url.split("/")[3];
            // delete note
            const message = await controller.deleteNote(id);
            res.write(JSON.stringify(message));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: error }));
        }
        res.end();
    }    

    // /note/edit/:id : PATCH
    else if (req.url.match(/\/note\/edit\/([0-9]+)/) && req.method === "PATCH") {
        var controller = new Controller();
        res.writeHead(200, { "Content-Type": "application/json" });
        try {
            // get the data sent along
            let noteData = await getReqData(req);

            const id = req.url.split("/")[3];
            const note = await controller.updateNote(id, noteData);
            res.write(JSON.stringify(note));
        } catch (error) {
            res.write(JSON.stringify({ message: error }));
        }
        res.end();
    }

    //____________________________________________User calls______________________________________________

    // /users/index : GET
    if (req.url === "/users/index" && req.method === "GET") {
        var controller = new Controller();
        res.writeHead(200, { "Content-Type": "application/json" });
        try {
            const list = await controller.getListOfUsers();
            res.write(JSON.stringify(list));
        } catch (error) {
            res.write("ERROR");
            console.log(error);
        }
        res.end();
    }

    // /users/index/:id : GET
    else if (req.url.match(/\/users\/index\/([0-9]+)/) && req.method === "GET") {
        var controller = new Controller();
        res.writeHead(200, { "Content-Type": "application/json" });
        try {
            const id = req.url.split("/")[3];
            const user = await controller.getUser(id);
            res.write(JSON.stringify(user));
        } catch (error) {
            res.write(JSON.stringify({ message: error }));
        }
        res.end();
    }

    // /user/delete/:id : DELETE
    else if (req.url.match(/\/user\/delete\/([0-9]+)/) && req.method === "DELETE") {
        var controller = new Controller();
        res.writeHead(200, { "Content-Type": "application/json" });
        try {
            const id = req.url.split("/")[3];
            const user = await controller.deleteUser(id);
            res.write(JSON.stringify(user));
        } catch (error) {
            res.write(JSON.stringify({ message: error }));
        }
        res.end();
    }

    // /user/register : POST
    else if (req.url === "/user/register" && req.method === "POST") {
        var controller = new Controller();
        res.writeHead(200, { "Content-Type": "application/json" });
        try {
            // get the data sent along
            let userData = await getReqData(req);

            const user = await controller.addUser(userData);
            res.write(JSON.stringify(user));
        } catch (error) {
            res.write(JSON.stringify({ message: error }));
        }
        res.end();
    }

    // /user/edit/:id : PATCH
    else if (req.url.match(/\/user\/edit\/([0-9]+)/) && req.method === "PATCH") {
        var controller = new Controller();
        res.writeHead(200, { "Content-Type": "application/json" });
        try {
            // get the data sent along
            let userData = await getReqData(req);

            const id = req.url.split("/")[3];
            const user = await controller.updateUser(id, userData);
            res.write(JSON.stringify(user));
        } catch (error) {
            res.write(JSON.stringify({ message: error }));
        }
        res.end();
    }

    // No route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});