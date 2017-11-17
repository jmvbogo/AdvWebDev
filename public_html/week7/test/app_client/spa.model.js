class Model extends BaseModel {

    constructor() {
        super()        
    }
    
    toggle (){
        this.dataBindModel.tggl = !this.dataBindModel.tggl
        return Promise.resolve()
        //model functions always have to return a promise!!!!!!!!
    }
    
    loadTestData(){
        this.dataBindModel.firstName='Jordan-Michael'
        return Promise.resolve()
    }
    
    get yay(){
        return this.dataBindModel.tggl
    }
}