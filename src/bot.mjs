import TeleBot from "telebot";
import fs from "fs";
import path from "path";

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);

// Remove a resposta automática de eco para mensagens de texto
bot.on("text", msg => {
    // Não há código aqui, então o bot não enviará uma resposta automática.
});

// Adicionar um comando /disney
bot.on("/disney", msg => {
    const chatId = msg.chat.id;

    // Obtém o diretório de trabalho atual
    const currentWorkingDir = process.cwd();

    // Construa o caminho completo para o arquivo.txt
    const filePath = path.join(currentWorkingDir, "src", "arquivo.txt");

    try {
        // Lê o conteúdo do arquivo.txt de forma síncrona (pode ser assíncrona, dependendo dos requisitos)
        const fileContent = fs.readFileSync(filePath, "utf-8").split('\n');

        // Seleciona uma linha aleatória do conteúdo do arquivo
        const randomLine = fileContent[Math.floor(Math.random() * fileContent.length)];

        // Envia a linha aleatória como resposta
        bot.sendMessage(chatId, randomLine);
    } catch (error) {
        console.error("Error reading file:", error);
        bot.sendMessage(chatId, "Ocorreu um erro ao ler o arquivo.");
    }
});

export default bot;
