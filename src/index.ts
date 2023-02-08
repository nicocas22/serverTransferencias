
import app from "./app"
const port: any = process.env.PORT

async function main() {

    app.listen(port, () => {
        console.log(`server corriendo en el puerto ${port}`);
    })    
}

main()