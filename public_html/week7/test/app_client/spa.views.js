class View {

    get home() {
        return Promise.resolve(`<h1>Home page</h1>`)
    }
    
//    step 3 add view
    get test() {
    return Promise.resolve(`<h1>Test page</h1>
        
        <button data-bind-event="click:toggle">Toggle Function</button>
    
        <p data-bind-model="firstName" data-bind-class="{'good' : 'yay', 'bad': '!yay'}"></p>
        <input type="text" name="firstName" />
        
        <button data-bind-event="click:loadTestData">Button</button>
    `)
    }
    
}