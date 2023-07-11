let subjectObjects = []
        function Initialize(){
            prerequisites = {
                'CS 111':[],
                'CIS 101':[],
                'MATH 101':[],
                'STAT 111':[],
                'CS 111L':[],
                'BIT 221':['CIS 101'],
                'CIS 260':['CIS 101', 'CS 210'],
                'BIT 381':['CIS 260'],
                'CIS 260L':['CIS 260'],
                'CS 210':['CS 111'],
                'CS 351': ['CS 250', 'CS 142'],
                'CS 142':['MATH 101'],
                'CS 250':['CS 210'],
                'DA 201':['CIS 101'],
                'DA 202':['CS 210'],
                'DA 220':['DA 201', 'DA 202'],
                'DA 210':['DA 201','DA 202'],
                'MATH 241':['MATH 101'],
                'STAT 101':[],
                'CIS 464':['CIS 260'],
                'CIS 240':['CIS 101', 'CS 210'],
                'CYS 230':['CS 111', 'CIS 101'],
                'DA 360':['DA 350'],
                'DA 370':['DA 350'],
                'DA 380':['STAT 111', 'CIS 260'],
                'DA 450':['DA 350'],
                'DA 460':['DA 330'],
                'DA 330':['DA 201', 'CIS 260'],
                'DA 480':['DA 350'],
                'DA 499':[],
                'DA 340':['DA 202'],
                'DA 350':['DA 202'],
                'DA 470':['DA 370'] 
            
            }

            const parentElement = document.getElementById('mainDiv');
            Object.keys(prerequisites).forEach(key => {
                childElement = document.createElement('button')
                childElement.id = key
                childElement.textContent = key
                parentElement.appendChild(childElement)
                
            
                
            })
        
            

            
            

            class Subjects{

                constructor(buttonElement, id){
                    console.log('created instance', this.id)
                    this.button = buttonElement;
                    this.indegree = 0;
                    this.initial_indegree = 0
                    this.is_taken = false;
                    this.id = id
                    this.neighbors = []
                    this.addClickListener();
                    
                }
                reset() {
                    this.indegree = this.initial_indegree
                    this.is_taken = false
                    if (this.initial_indegree != 0)
                        document.getElementById(this.id).style.backgroundColor = ' #656565' //not white more like grey
                    else {document.getElementById(this.id).style.backgroundColor = 'yellow' 

                    }

                }
                add_neighbor(nei) {
                    this.neighbors.push(nei)
                }
                set_indegree(x){
                    this.indegree = x
                    this.initial_indegree = x
                    if (this.indegree == 0) {
                        document.getElementById(this.id).style.backgroundColor = 'yellow'
                    }
                }
                increase_indegree(){
                    if (this.is_taken){
                        //for neighbor in adj[thisbutton]: increase_indegree()
                        this.neighbors.forEach(neighbor =>
                        neighbor.increase_indegree());
                    }
                    this.is_taken = false
                    this.indegree ++
                    document.getElementById(this.id).style.backgroundColor = '#656565';
                    
                }
                decrease_indegree(){
                    this.indegree -= 1
                    if (this.indegree == 0){
                        document.getElementById(this.id).style.backgroundColor = 'yellow';
                    }
                }
    
                is_taken_click(){
                    console.log(this.id, 'is_taken')

                    this.is_taken = false
                    document.getElementById(this.id).style.backgroundColor = 'yellow';
                    //toposearch dec
                    //for neighbor in adj[thisbutton]: increase_indegree()
                    this.neighbors.forEach(neighbor =>
                    neighbor.increase_indegree());
                }
                is_not_taken_click(){
                    console.log(this.id, 'is_not_taken')
                    this.is_taken = true
                    //change color to green
                    document.getElementById(this.id).style.backgroundColor = 'green'
                    //for neighbors in adj[thisbutton]: decrease_indegree()
                    this.neighbors.forEach(neighbor =>
                    neighbor.decrease_indegree());
                }
    
                addClickListener(){
                    this.button.addEventListener('click', ()=>{
                        var available = ((this.indegree) == 0)
                        console.log(available)
                        if (!available) {}
                        else if (this.is_taken) {this.is_taken_click()}
                        else {this.is_not_taken_click()}
                        /*
                        if indegree > 0: do nothing or send message 'you cant take this subject yet'
                        else:
                        if taken: to topological sort of all neighbors and after cascade , all decendents should become grey (indegree>0)
                        if not taken: all neighbors should now degrees indegree by 1 and if it reaches 0 become yellow
                                      it becomes taken
                        */
                    })
                }
            //what is remaining is to feed in the adj list, and the queue of 
            //subjects that have indegree == 0
            //after that somehow find the indegrees of all subjects accordingly
            //join the javascript whith the colors
            //maybe feed in each subject and its prerequisites, this way you can
            //automatically find the indegree of each subject and build the adjlist of it.
            }
    
            /*const prerequisites = {
                'subject1': [],
                'subject2': ['subject1'],
                'subject3': ['subject1'],
                'subject4': ['subject2', 'subject3']
            }
            */
            
            
            const key_object = {
            

            }
            Object.keys(prerequisites).forEach(key => {
                const buttonElement = document.getElementById(key)
                const Subject = new Subjects(buttonElement, key)
                key_object[key] = Subject
                Subject.set_indegree(prerequisites[key].length)
                subjectObjects.push(Subject)

            })

            Object.keys(prerequisites).forEach(key => {

                prerequisites[key].forEach(element => {
                    key_object[element].add_neighbor(key_object[key])})
            })
            
            
                console.log(subjectObjects)
                resetButton = document.createElement('button')
                resetButton.id = 'resetButton'
                resetButton.textContent = 'Reset All'
                parentElement.appendChild(resetButton)
                resetButton.addEventListener('click', ()=>{
                    console.log('resetting <><><><>')
                    subjectObjects.forEach(element => {
                        element.reset()
                    })
                
                })
            };
        
            
        
            adj = {}

            Object.keys(prerequisites).forEach(key => {
                prerequisites[key].forEach(element =>{
                    if (adj.hasOwnProperty(element)){
                        adj[element].push(key)}
                    else {
                        adj[element] = [key]
                    }
                    })
                });
                var sortedArray = Object.entries(prerequisites).sort(function(a, b) {
                    return a[1].length - b[1].length;
                  });
                
                parentElement = document.getElementById('mainDiv')
                sortedArray.forEach(element =>{
                    childElement = createElement('div')
                    childElement.textContent = element
                    parentElement.appendChild(childElement)
                    
                })
            
        
    
// adj = {}

// Object.keys(prerequisites).forEach(key => {
//     prerequisites[key].forEach(element =>{
//         if (adj.hasOwnProperty(element)){
//             adj[element].push(key)}
//         else {
//             adj[element] = [key]
//         }
//         })
//     });
//     var sortedArray = Object.entries(prerequisites).sort(function(a, b) {
//         return a[1].length - b[1].length;
//       });
    
    
    
