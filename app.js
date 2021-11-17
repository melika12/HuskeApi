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

    // /user/delete/:id : GET
    else if (req.url.match(/\/user\/delete\/([0-9]+)/) && req.method === "GET") {
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

    // /user/register : GET
    else if (req.url.match(/\/user\/register\/([A-z]+)\/([A-z]+)/) && req.method === "GET") {
        var controller = new Controller();
        res.writeHead(200, { "Content-Type": "application/json" });
        try {
            const name = req.url.split("/")[3];
            const password = req.url.split("/")[4];
            const user = await controller.addUser(name, password);
            res.write(JSON.stringify(user));
        } catch (error) {
            res.write(JSON.stringify({ message: error }));
        }
        res.end();
    }

    // /note/edit/:id : UPDATE
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

    // /api/todos/ : POST
    else if (req.url === "/api/todos" && req.method === "POST") {
        // get the data sent along
        let todo_data = await getReqData(req);
        // create the todo
        let todo = await new Todo().createTodo(JSON.parse(todo_data));
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        //send the todo
        res.end(JSON.stringify(todo));
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