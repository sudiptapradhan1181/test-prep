const schedules = [
    {"id" : "a", "dependencies": ["b", "c"]},
    {"id" : "b", "dependencies": ["d"]},
    {"id" : "c", "dependencies": ["e"]},
    {"id" : "d", "dependencies": []},
    {"id" : "e", "dependencies": ["f"]},
    {"id" : "f", "dependencies": []}
]

const schedulesCircular = [
    {"id" : "a", "dependencies": ["b", "c"]},
    {"id" : "b", "dependencies": ["d"]},
    {"id" : "c", "dependencies": ["e"]},
    {"id" : "d", "dependencies": []},
    {"id" : "e", "dependencies": ["c"]},
    {"id" : "f", "dependencies": []}
]

const removeTaskFromDependencies = (arr, id) => {
    arr.map(task => {
        const index = task.dependencies.indexOf(id)
        if(index !== -1){
            task.dependencies.splice(index, 1)
        }
    })
}

const executeTasks = (arr) => {
    const totalTasks = arr.length;
    let tasksExecuted = 0;
    let currentTask = 0;

    while(tasksExecuted < totalTasks){
        let task = arr[currentTask]
        if(!task.dependencies.length && !task.executed) {
            console.log(task.id)
            task.executed = true
            removeTaskFromDependencies(arr, task.id)
            tasksExecuted ++;
        } else if(!task.visited) task.visited = 1
        else if(task.visited > totalTasks + 1){
            console.log("Cycle formed")
            break;
        }
        else task.visited += 1

        if(currentTask === totalTasks - 1) currentTask = 0
        else currentTask +=1
        
    }
}

executeTasks(schedulesCircular)