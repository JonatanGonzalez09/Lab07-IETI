module.exports = async function (context, req) {
    context.log('Get tasks of the planner');
    tasks= [ {id: Math.random(), 
        description: "Implement logout View", 
        nameResponsible: "Jonatan Gonzalez",
        emailResponsible: "jonatan@mail.com",
        status: "Ready",
        dueDate: "01-10-2020"
        },
        {id: Math.random(), 
        description: "Implement connection frontend with backend.", 
        nameResponsible: "Patricia Mendoza",
        emailResponsible: "patricia@mail.com",
        status: "In progress",
        dueDate: "09-10-2020"
        },
        {id: Math.random(), 
        description: "Deploy of application", 
        nameResponsible: "Juan Perez",
        emailResponsible: "juan@mail.com",
        status: "Done",
        dueDate: "01-10-2020"
        }]
    const task = req.body;
    tasks.push(task)
    const responseMessage = { response: {tasks}};
    context.log(responseMessage);

    context.res = {
        status: 200,
        body: responseMessage
    };
}
