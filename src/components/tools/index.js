import Table from './Table'
import MyButton from './MyButton'
// console.log(Table);
export default {
    install(app){
        app.component(Table.name,Table)
        app.component(MyButton.name,MyButton)
    }
}