module.exports = async function (context, req) {
    context.log('Adding a task to the planner');

    const task = req.body;
    // Implement the response
    const responseMessage = { response: {id: Math.random(), description: task.description, nameResponsible: task.nameResponsible, emailResponsible: task.emailResponsible, status: task.status, dueDate: task.dueDate}};
    context.log(responseMessage);

    context.res = {
        status: 201,
        body: responseMessage
    };
}


