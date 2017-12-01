class Model extends BaseModel {

    constructor() {
        super()  
        this.APIS = {
            Employees : 'http://localhost:3001/api/v1/employees'
        }
    }
    
    
    getTodoList() {
        return this.http.get(this.APIS.Employees)
                .then( data => {
                    data.forEach(row => {
                      row.salary = `$${this.formatNumber(row.salary)}` 
                      row.startDate = this.formatDate(row.startDate)  
                    })
                   return Components.employeeTable(data).then(html => { return this.dataBindModel.todoTable = html })
                })
    }
    
    deleteTodo(evt) {
       const url = `${this.APIS.Employees}${evt.target.dataset.id}`
       return this.http.delete(url)
                .then( ()=>{
                   return this.dataBindModel.deleteResultMsg = 'Todo Deleted'                                
                }).catch( err => {
                    return this.dataBindModel.deleteResultMsg = 'Todo was NOT Deleted'                                 
                }).then( () => {
                   return this.getTodoList()
                })
    
    }
    
    saveTodo(evt) {
        
        let form = evt.target.form        
        if (!form.checkValidity()) {
            this.dataBindModel.saveResultMsg = 'All fields are required'
            return Promise.resolve()
        }
        const data = {
           firstName : this.dataBindModel.firstName,
           lastName : this.dataBindModel.lastName,
           department : this.dataBindModel.department,
           startDate : this.dataBindModel.startDate,
           jobTitle : this.dataBindModel.jobTitle,
           salary : this.dataBindModel.salary
        }                    
        return this.http.post(this.APIS.Employees, data)
                .then( data => {
                   this.dataBindModel.saveResultMsg = 'Employee Saved'
                   return data
                }).catch( err => {
                   this.dataBindModel.saveResultMsg = 'Employee was NOT Saved'   
                   return err
                })  
    }
    
    goToUpdatePage(evt) {
        this.redirect('update',{id: evt.target.dataset.id})
        return Promise.resolve()
    }
        
    updatePageLoad() {
        const url = `${this.APIS.Employees}${this.urlParams().get('id')}`
        return this.http.get(url).then( data => {           
            this.dataBindModel = {title: data.title, completed: data.completed, id: data.id }
            return data
        })     
    }

    updateTodo(evt) {
        let form = evt.target.form        
         if (!form.checkValidity()) {
             this.dataBindModel.updateResultMsg = 'All fields are required'
             return Promise.resolve()
         }
        const data = {
            title : this.dataBindModel.title,
            completed : this.dataBindModel.completed
        }
         const url = `${this.APIS.Employees}${this.dataBindModel.id}`
         return this.http.put(url, data)
                 .then( data => {
                     this.dataBindModel.updateResultMsg = 'Todo updated'
                     return data
                 }).catch( err => {
                     this.dataBindModel.updateResultMsg = 'Todo was NOT updated'   
                     return err
                 })  
    }

    get isDeleted() {
        const msg = this.dataBindModel.deleteResultMsg
        return msg && msg.toLowerCase().indexOf('not') === -1
    }

    get isAdded() {
        const msg = this.dataBindModel.saveResultMsg
        return msg && msg.toLowerCase().indexOf('not') === -1 && msg.toLowerCase().indexOf('required') === -1
    }

    get isUpdated() {
        const msg = this.dataBindModel.updateResultMsg
        return msg && msg.toLowerCase().indexOf('not') === -1 && msg.toLowerCase().indexOf('required') === -1
    }
}