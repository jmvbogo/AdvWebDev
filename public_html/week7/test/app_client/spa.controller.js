class Controller {

    constructor(model) {
        this.Model = model
    }

    home() {
        return Promise.resolve()
    }
//    step 1 add view
        test() {
        return this.Model.loadTestData()
    }

}