import fileManager from './FileManager.js'
import readLineSync from 'readline-sync'
import path from 'path'
import url, { fileURLToPath } from 'url'

async function main(){
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const baseDir = path.join(__dirname, 'My_files')
    fileManager.createDirectory(baseDir)

    while(true){
        console.log("\nMenu")
        console.log("1. Criar Arquivos")
        console.log("2. Listar Arquivos")
        console.log("3. Ler arquivo")
        console.log("4. Escrever arquivo")
        console.log("5. Deletar arquivo")
        console.log("6. Sair")

        const choice = readLineSync.question('Escolha uma opcao: ')

        try {
            switch(choice){
            
                case '1':
                    const fileName = readLineSync.question('Digite o nome do arquivo: ')
                    const fileContent = readLineSync.question('Digite o conteudo do novo arquivo (ou deixe em branco): ')
                    const filePath = path.join(baseDir, fileName)
                    const fileMessage = await fileManager.createFile(filePath, fileContent)
    
                    console.log(fileMessage)
                    break
                case '2':
                    const files = await fileManager.listFiles(baseDir)
                    console.log('Arquivos no diretório: ', files)
                    break
                case '3':
                    const readFileName = readLineSync.question('Digite o nome e extensão do arquivo: ')
                    const readFilePath = path.join(baseDir, readFileName)
                    const content = await fileManager.readFile(readFilePath)
                    console.log('Conteúdo do arquivo: ', content)
                    break
                case '4':
                    const writeFileName = readLineSync.question('Digite o nome e extesao do arquivo: ')
                    const writeFilePath = path.join(baseDir, writeFileName)
                    const newContent = readLineSync.question('Digite o conteúdo a ser escrito: ')
                    const writeMessage = await fileManager.writeFile(writeFilePath, newContent)
                    console.log(writeMessage)
                    break
                case '5':
                    const deleteFileName = readLineSync.question('Digite o nome e extensao do arquivo: ')
                    const deleteFilePath = path.join(baseDir, deleteFileName)
                    const deleteMessage = await fileManager.deleteFile(deleteFilePath)
                    console.log(deleteMessage)
                    break
                case '6':
                    console.log('Saindo...')
                    return
                default:
                    console.log('Opcao Invalida. Tente novamente.')
            }
        } catch (error) {
            console.log(error)
        }

    }

}

main()