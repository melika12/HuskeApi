const http = require("http");
const Controller = require("./controller.js");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 8080;
var cookie = "";
let session = {};

const server = http.createServer(async (req, res) => {
    // /notes/index : GET
    
    if (req.url === "/notes/index" && req.method === "GET") {
        if (req.headers.cookie === cookie) {
            var controller = new Controller();
            res.writeHead(200, { "Content-Type": "application/json" });
            try {
                const list = await controller.getListOfNotes();
                res.write(JSON.stringify(list));
            } catch (error) {
                res.write("ERROR");
                console.log(error);
            }
        } else {
            res.write("Your session has expired - please login again");
        }
        res.end();
    }
    
    // /notes/index/:id : GET
    else if (req.url.match(/\/notes\/index\/([0-9]+)/) && req.method === "GET") {
        if (req.headers.cookie === cookie) {
            var controller = new Controller();
            res.writeHead(200, { "Content-Type": "application/json" });
            try {
                const id = req.url.split("/")[3];
                const note = await controller.getNote(id);
                res.write(JSON.stringify(note));
            } catch (error) {
                res.write(JSON.stringify({ message: error }));
            }
        } else {
            res.write("Your session has expired - please login again");
        }
        res.end();
    }

    // /note/add : CREATE
    else if (req.url === "/note/add" && req.method === "POST") {
        if (req.headers.cookie === cookie) {        
            var controller = new Controller();
            res.writeHead(200, { "Content-Type": "application/json" });
            try {
                let noteData = await getReqData(req);
                let note = await controller.createNote(noteData);
                res.write(JSON.stringify(note));
            } catch (error) {
                res.write(JSON.stringify({ message: error }));
            }
        } else {
            res.write("Your session has expired - please login again");
        }
        res.end();
    }

    // /note/delete/:id : DELETE
    else if (req.url.match(/\/note\/delete\/([0-9]+)/) && req.method === "DELETE") {
        if (req.headers.cookie === cookie) {        
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
        } else {
            res.write("Your session has expired - please login again");
        }
        res.end();
    }    

    // /note/edit/:id : PATCH
    else if (req.url.match(/\/note\/edit\/([0-9]+)/) && req.method === "PATCH") {
        if (req.headers.cookie === cookie) {        
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
        } else {
            res.write("Your session has expired - please login again");
        }
        res.end();
    }

    //____________________________________________User calls______________________________________________

    // /users/index : GET
    if (req.url === "/users/index" && req.method === "GET") {
        if (req.headers.cookie === cookie) {        
            var controller = new Controller();
            res.writeHead(200, { "Content-Type": "application/json" });
            try {
                const list = await controller.getListOfUsers();
                res.write(JSON.stringify(list));
            } catch (error) {
                res.write("ERROR");
                console.log(error);
            }
        } else {
            res.write("Your session has expired - please login again");
        }
        res.end();
    }

    // /users/index/:id : GET
    else if (req.url.match(/\/users\/index\/([0-9]+)/) && req.method === "GET") {
        if (req.headers.cookie === cookie) {        
            var controller = new Controller();
            res.writeHead(200, { "Content-Type": "application/json" });
            try {
                const id = req.url.split("/")[3];
                const user = await controller.getUser(id);
                res.write(JSON.stringify(user));
            } catch (error) {
                res.write(JSON.stringify({ message: error }));
            }
        } else {
            res.write("Your session has expired - please login again");
        }
        res.end();
    }

    // /user/delete/:id : DELETE
    else if (req.url.match(/\/user\/delete\/([0-9]+)/) && req.method === "DELETE") {
        if (req.headers.cookie === cookie) {        
            var controller = new Controller();
            res.writeHead(200, { "Content-Type": "application/json" });
            try {
                const id = req.url.split("/")[3];
                const user = await controller.deleteUser(id);
                res.write(JSON.stringify(user));
            } catch (error) {
                res.write(JSON.stringify({ message: error }));
            }
        } else {
            res.write("Your session has expired - please login again");
        }
        res.end();
    }

    // /user/register : POST
    else if (req.url === "/user/register" && req.method === "POST") {
        if (req.headers.cookie === cookie) {        
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
        } else {
            res.write("Your session has expired - please login again");
        }
        res.end();
    }

    // /user/edit/:id : PATCH
    else if (req.url.match(/\/user\/edit\/([0-9]+)/) && req.method === "PATCH") {
        if (req.headers.cookie === cookie) {        
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
        } else {
            res.write("Your session has expired - please login again");
        }
        res.end();
    }

    //____________________________________________Login/Logout______________________________________________

    else if (req.url === "/login" && req.method === "POST") {
        var controller = new Controller();
        res.writeHead(200, { "Content-Type": "application/json" });
        try {
            // get the data sent along
            let userData = await getReqData(req);
            const user = await controller.login(userData);
            
            const uuid = Number("57913824"+user["Id"]+"7946");
            res.writeHead(200, {
                'Set-Cookie': `loginsession=${uuid}`,
                'Expires': new Date(new Date().getTime()+10000).toUTCString(),
                'Content-Type': 'text/plain'
            });
            cookie = "loginsession="+uuid;

            res.write('You have successfully logged in');
        } catch (error) {
            res.write(JSON.stringify({ message: error }));
        }
        res.end();
    }

    else if (req.url === "/logout" && req.method === "POST") {
        res.setHeader('set-cookie', cookie + '; max-age=0');
        res.write('You have successfully logged out');
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


/*

    /\_____/\
   /  o   o  \
  ( ==  ^  == )
   )         (
  (           )
 ( (  )   (  ) )
(__(__)___(__)__)

*/