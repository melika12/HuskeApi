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

    // /user/index : GET
    if (req.url === "/user/index" && req.method === "GET") {
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

    // /user/index/:id : GET
    else if (req.url.match(/\/user\/index\/([0-9]+)/) && req.method === "GET") {
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
    // /user/delete/:id : DELETE
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

    // /api/todos/:id : DELETE
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE") {
        try {
            // get the id from url
            const id = req.url.split("/")[3];
            // delete todo
            let message = await new Todo().delUser(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify({ message }));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/todos/:id : UPDATE
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PATCH") {
        try {
            // get the id from the url
            const id = req.url.split("/")[3];
            // update todo
            let updated_todo = await new Todo().updateTodo(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify(updated_todo));
        } catch (error) {
            // set the status code and content type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
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
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});