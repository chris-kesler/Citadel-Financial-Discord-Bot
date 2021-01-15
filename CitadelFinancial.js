//Changelog from Currency2.1
    //redefining account initialization to use identical object declarations

//TROUBLESHOOTING
    //updated default object definitions

const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const bank = "631664169707503644";

//const Item = require('./Item')

client.once('ready', () => {
	console.log('Ready!')
	})

//defining class account
class Account {
    constructor(login, nickname, balance, type, transaction, recipient) {
        this.accountLogin = login;
        this.accountNickname = nickname;
        this.accountBalance = balance;
        this.accountType = type;
        this.accountTransaction = transaction;
        this.accountRecipient = recipient;
    }
    get getAccountLogin(){
        return this.accountLogin;
    }
    get getAccountNickname() {
        return this.accountNickname;
    }
    get getAccountBalance() {
        return this.accountBalance;
    }
    get getAccountType() {
        return this.accountType;
    }
    get getAccountTransaction() {
        return this.accountTransaction;
    }
    get getAccountRecipient() {
        return this.accountRecipient;
    }
    set setAccountLogin(input){
        this.accountLogin = input;
    }
    set setAccountNickname(input) {
        this.accountNickname = input;
    }
    set setAccountBalance(input) {
        this.accountBalance = input;
    }
    set setAccountType(input) {
        this.accountType = input;
    }
    set setAccountTransaction(input) {
        this.accountTransaction = input;
    }
    set setAccountRecipient(input) {
        this.accountRecipient = input;
    }
}

//creating account array
var AccountArray = [];


//Reading the actual messages and performing functions based on that
client.on('message', message => {

    //simple test command
    if(message.content.startsWith(`${prefix}test`)){
        tEmbed = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle('A slick little embed')
        // Set the color of the embed
        .setColor(message.member.displayHexColor)
        // Set the main content of the embed
        .setDescription('Hello, this is a slick embed!');
        // Send the embed to the same channel as the message
        message.channel.send(tEmbed);
    }


//DM ONLY COMMANDS
{
    //Mention pull commands
    if(message.content.startsWith(`${prefix}pull for`)){
		if(message.member.roles.find(r => r.name === "DM")){
            if (message.mentions.members.first()){ // there's at least one mentioned user
                key = (`${message.mentions.users.first().id}${message.guild.id}`)
                checkFile(key)
                readAccountVars(key)
                AccountArray.forEach((tAccount) => readAccountNickname(tAccount, key))
                AccountArray.forEach((tAccount) => readAccountBalance(tAccount, key))
                AccountArray.forEach((tAccount) => readAccountType(tAccount, key))
                AccountArray.forEach((tAccount) => readAccountTransaction(tAccount, key))
                AccountArray.forEach((tAccount) => readAccountRecipient(tAccount, key))
                message.channel.send(`${key}\n${tNickname}\n${tBalance}\n${tType}\n${tTransaction}\n${tRecipient}`);
            }
        }
    }


    //Mention check commands
    if(message.content.startsWith(`${prefix}check`)){
        try{
		    if(message.member.roles.find(r => r.name === "DM")){
                if (message.mentions.members.first()){ // there's at least one mentioned user
                    key = (`${message.mentions.users.first().id}${message.guild.id}`)
                    checkFile(key)
                    readAccountVars(key)
                    AccountArray.forEach((tAccount) => readAccountNickname(tAccount, key))
                    AccountArray.forEach((tAccount) => readAccountBalance(tAccount, key))
                    AccountArray.forEach((tAccount) => readAccountType(tAccount, key))
                    AccountArray.forEach((tAccount) => readAccountTransaction(tAccount, key))
                    AccountArray.forEach((tAccount) => readAccountRecipient(tAccount, key))
                    if(tTransaction != 0){
                        readAccountVars(tRecipient)
                        tRecipientNickname = tNickname
                        readAccountVars(key)
                        tEmbed = new Discord.RichEmbed()
                        tEmbed.setTitle('Hello Dungeon Master')
                        tEmbed.setColor(message.member.displayHexColor)
                        tEmbed.setDescription(`${tNickname} has a balance of ${tBalance} ${tType}, and a pending transaction of ${tTransaction} to ${tRecipientNickname}`);
                        tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                        message.channel.send(tEmbed);
                    }
                    else{
                        tEmbed = new Discord.RichEmbed()
                        tEmbed.setTitle('Hello Dungeon Master')
                        tEmbed.setColor(message.member.displayHexColor)
                        tEmbed.setDescription(`${tNickname} has a balance of ${tBalance} ${tType}, and no pending transactions`);
                        tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                        message.channel.send(tEmbed);
                    }
                }
                else{
                    tEmbed = new Discord.RichEmbed()
                    tEmbed.setTitle(`Error!`)
                    tEmbed.setColor(message.member.displayHexColor)
                    tEmbed.setDescription(`That is an invalid command`)
                    tEmbed.addField(`You are missing a mentioned user:`, `${prefix}check <@mention>`)
                    tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                    message.channel.send(tEmbed);
                }
            }
            else{
                tEmbed = new Discord.RichEmbed()
                tEmbed.setTitle(`Error!`)
                tEmbed.setColor(message.member.displayHexColor)
                tEmbed.setDescription(`That is an invalid command`)
                tEmbed.addField(`You are not the Dungeon Master of this server:`, `role of <DM> required`)
                tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                message.channel.send(tEmbed);
            }
        }
        catch{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Error!')
            tEmbed.setColor(000000)
            tEmbed.setDescription(`You must be in a Server to use this command.`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
    }

    //give loot command
    if(message.content.startsWith(`${prefix}give loot`)){
        try{
		    if(message.member.roles.find(r => r.name === "DM")){
                if (message.mentions.members.first()){ // there's at least one mentioned user
                    mentionKey = (`${message.mentions.users.first().id}${message.guild.id}`)
                    checkFile(mentionKey);
                    readAccountVars(mentionKey)
                    myString = message.content
                    inputList = myString.split(",")
                    if(inputList[2] != undefined){
                        if(inputList[3] != undefined){
                            inputList[2] = inputList[2].trim()
                            inputItem = inputList[2]
                            inputItem = parseFloat(inputItem)
                            if(isNaN(inputItem)){
                                tEmbed = new Discord.RichEmbed()
                                tEmbed.setTitle('Error!')
                                tEmbed.setColor(message.member.displayHexColor)
                                tEmbed.setDescription(`That is an invalid command.`);
                                tEmbed.addField(`Your input cannot be converted to an numerical value.`, `${prefix}give loot, <amount>, <@mention>`)
                                tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                                message.channel.send(tEmbed);
                                message.channel.send(`Your input cannot be converted to an numerical value.  You entered ${typeof inputItem} ${inputItem}.`)
                            }
                            else{
                                oldBal = tBalance
                                newBal = tBalance + inputItem;
                                AccountArray.forEach((tAccount) => updateBalance(tAccount, mentionKey, newBal));
                                readAccountVars(mentionKey)
                                saveFile(mentionKey)
                                tEmbed = new Discord.RichEmbed()
                                tEmbed.setTitle(`Hello Dungeon Master`)
                                tEmbed.setColor(message.member.displayHexColor)
                                tEmbed.setDescription(`${tNickname} has been transactioned ${inputItem} ${tType}`);
                                tEmbed.addField(`Previous balance of ${oldBal} ${tType}`, `Current balance of ${tBalance} ${tType}`)
                                tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                                message.channel.send(tEmbed);
                            }
                        }
                        else{
                            tEmbed = new Discord.RichEmbed()
                            tEmbed.setTitle('Error!')
                            tEmbed.setColor(message.member.displayHexColor)
                            tEmbed.setDescription(`That is an invalid command.`);
                            tEmbed.addField(`You are missing a comma after the amount:`, `${prefix}give loot, <amount>, <@mention>`)
                            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                            message.channel.send(tEmbed);
                        }
                    }
                    else{
                        tEmbed = new Discord.RichEmbed()
                        tEmbed.setTitle('Error!')
                        tEmbed.setColor(message.member.displayHexColor)
                        tEmbed.setDescription(`That is an invalid command.`);
                        tEmbed.addField(`You are missing a comma after the command:`, `${prefix}give loot, <amount>, <@mention>`)
                        tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                        message.channel.send(tEmbed);
                    }         
                }
                else{
                    tEmbed = new Discord.RichEmbed()
                    tEmbed.setTitle(`Error!`)
                    tEmbed.setColor(message.member.displayHexColor)
                    tEmbed.setDescription(`That is an invalid command`)
                    tEmbed.addField(`You are missing a mentioned user:`, `${prefix}give loot, <amount>, <@mention>`)
                    tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                    message.channel.send(tEmbed);
                }
            }
            else{
                tEmbed = new Discord.RichEmbed()
                tEmbed.setTitle(`Error!`)
                tEmbed.setColor(message.member.displayHexColor)
                tEmbed.setDescription(`That is an invalid command`)
                tEmbed.addField(`You are not the Dungeon Master of this server:`, `role of <DM> required`)
                tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                message.channel.send(tEmbed);
            }
        }
        catch{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Error!')
            tEmbed.setColor(000000)
            tEmbed.setDescription(`You must be in a Server to use this command.`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
    }
}


//USER commands
{
    //help commands
    if(message.content.startsWith(`${prefix}help`)){
        try{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Hello!  Welcome to Citadel Financial!')
            tEmbed.setColor(message.member.displayHexColor)
            tEmbed.setDescription(`Here are some commands to get you started:`);
            tEmbed.addField('To get a list of Player commands:', `${prefix}player help`)
            tEmbed.addField('To get a list of Dungeon Master commands:', `${prefix}dm help`)
            message.channel.send(tEmbed);
        }
        catch{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Hello!  Welcome to Citadel Financial!')
            tEmbed.setColor(000000)
            tEmbed.setDescription(`Here are some commands to get you started:`);
            tEmbed.addField('To get a list of Player commands:', `${prefix}player help`)
            tEmbed.addField('To get a list of Dungeon Master commands:', `${prefix}dm help`)
            message.channel.send(tEmbed);
        }
    }

    if(message.content.startsWith(`${prefix}player help`)){
        try{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Welcome to Citadel Financial.')
            tEmbed.setColor(message.member.displayHexColor)
            tEmbed.setDescription(`As a player, you will have full control over your financial account:`);
            tEmbed.addField('To get your Account Balance:', `${prefix}balance`)
            tEmbed.addField('To initiate a purchase:', `${prefix}spend, <amount>`)
            tEmbed.addField('To transfer funds to another user:', `${prefix}transfer, <amount>, <@mention>`)
            tEmbed.addField('To check pending transaction:', `${prefix}pending`)
            tEmbed.addField('To cancel any pending transaction:', `${prefix}cancel`)
            tEmbed.addField('To confirm pending transaction:', `${prefix}confirm`)
            tEmbed.addField('To update your Nickname:', `${prefix}call me, <new Nickname>`)
            tEmbed.addField('To update your Currency Type:', `${prefix}call my currency, <new Type>`)
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
        catch{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Welcome to Citadel Financial.')
            tEmbed.setColor(000000)
            tEmbed.setDescription(`As a player, you will have full control over your financial account:`);
            tEmbed.addField('To get your Account Balance:', `${prefix}balance`)
            tEmbed.addField('To initiate a purchase:', `${prefix}spend, <amount>`)
            tEmbed.addField('To transfer funds to another user:', `${prefix}transfer, <amount>, <@mention>`)
            tEmbed.addField('To check pending transaction:', `${prefix}pending`)
            tEmbed.addField('To cancel any pending transaction:', `${prefix}cancel`)
            tEmbed.addField('To confirm pending transaction:', `${prefix}confirm`)
            tEmbed.addField('To update your Nickname:', `${prefix}call me, <new Nickname>`)
            tEmbed.addField('To update your Currency Type:', `${prefix}call my currency, <new Type>`)
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
    }

    if(message.content.startsWith(`${prefix}dm help`)){
        try{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Welcome to Citadel Financial.')
            tEmbed.setColor(message.member.displayHexColor)
            tEmbed.setDescription(`As the DM, you have access to several special commands that others do not.`);
            tEmbed.addField('To give a player money:', `${prefix}give loot, <amount>, <@mention>`)
            tEmbed.addField(`To check a player's account info, including balance:`, `${prefix}check <@mention>`)
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
        catch{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Welcome to Citadel Financial.')
            tEmbed.setColor(000000)
            tEmbed.setDescription(`As the DM, you have access to several special commands that others do not.`);
            tEmbed.addField('To give a player money:', `${prefix}give loot, <amount>, <@mention>`)
            tEmbed.addField(`To check a player's account info, including balance:`, `${prefix}check <@mention>`)
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
    }
        

    //prints the author's balance
    if(message.content.startsWith(`${prefix}balance`)){
        try{
            key = (`${message.author.id}${message.guild.id}`);
            checkFile(key)
            readAccountVars(key)
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle(`Hello ${tNickname}`)
            tEmbed.setColor(message.member.displayHexColor)
            tEmbed.addField(`Your current balance:`, `${tBalance} ${tType}`)
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
        catch{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Error!')
            tEmbed.setColor(000000)
            tEmbed.setDescription(`You must be in a Server to use this command.`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
    }

    //allows the user to update their transaction amount to spend
    if(message.content.startsWith(`${prefix}spend`)){
        try{
            key = (`${message.author.id}${message.guild.id}`);
            checkFile(key)
            readAccountVars(key)
            myString = message.content;
            inputList = myString.split(",")
            if(inputList[2] != undefined){
                inputList[2] = inputList[2].trim()
                inputString = inputList[2]
                inputItem = parseFloat(inputString)
                if(isNaN(inputItem)){
                    tEmbed = new Discord.RichEmbed()
                    tEmbed.setTitle('Error!')
                    tEmbed.setColor(message.member.displayHexColor)
                    tEmbed.setDescription(`That is an invalid command.`);
                    tEmbed.addField(`Your input cannot be converted to an numerical value:`, `${prefix}spend, <amount>`)
                    tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                    message.channel.send(tEmbed);
                }
                else{
                    if(inputItem < 0){
                        inputItem = inputItem * -1;
                    }
                    AccountArray.forEach((tAccount) => updateTransaction(tAccount, key, inputItem))
                    AccountArray.forEach((tAccount) => updateRecipient(tAccount, key, bank))
                    readAccountVars(key)
                    tEmbed = new Discord.RichEmbed()
                    tEmbed.setTitle(`Hello ${tNickname}`)
                    tEmbed.setColor(message.member.displayHexColor)
                    tEmbed.setDescription(`You have initiated a purchase of ${tTransaction}`);
                    tEmbed.addField(`Confirm this transfer with:`, `${prefix}confirm`)
                    tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                    message.channel.send(tEmbed);
                }
            }
            else{
                tEmbed = new Discord.RichEmbed()
                tEmbed.setTitle('Error!')
                tEmbed.setColor(message.member.displayHexColor)
                tEmbed.setDescription(`That is an invalid command.`);
                tEmbed.addField(`You are missing a comma after the command:`, `${prefix}spend, <amount>`)
                tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                message.channel.send(tEmbed);
            }
        }
        catch{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Error!')
            tEmbed.setColor(000000)
            tEmbed.setDescription(`You must be in a Server to use this command.`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
        
    }

    //allows the user to update their transaction amount to spend
    if(message.content.startsWith(`${prefix}transfer`)){
        try{
            if(message.mentions.members.first()){ // there's at least one mentioned user
            key = (`${message.author.id}${message.guild.id}`);
            mentionKey = (`${message.mentions.users.first().id}${message.guild.id}`);
            checkFile(key)
            readAccountVars(key)
            checkFile(mentionKey)
            readAccountVars(mentionKey)
            readAccountVars(key)
            myString = message.content;
            inputList = myString.split(",")
            if(inputList[2] != undefined){
                if(inputList[3] != undefined){
                    inputList[2] = inputList[2].trim()
                    inputString = inputList[2]
                    inputItem = parseFloat(inputString)
                    if(isNaN(inputItem)){
                        tEmbed = new Discord.RichEmbed()
                        tEmbed.setTitle('Error!')
                        tEmbed.setColor(message.member.displayHexColor)
                        tEmbed.setDescription(`That is an invalid command.`);
                        tEmbed.addField(`Your input cannot be converted to an numerical value.`, `${prefix}transfer, <amount>, <@mention>`)
                        tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                        message.channel.send(tEmbed);
                    }
                    else{
                        if(inputItem < 0){
                            inputItem = inputItem * -1;
                        }
                        if(mentionKey == key){
                            tEmbed = new Discord.RichEmbed()
                            tEmbed.setTitle('Error!')
                            tEmbed.setColor(message.member.displayHexColor)
                            tEmbed.setDescription(`That is an invalid command.`);
                            tEmbed.addField(`You cannot transfer funds to yourself.`, `${prefix}transfer, <amount>, <@mention>`)
                            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                            message.channel.send(tEmbed);
                        }
                        else{
                            AccountArray.forEach((tAccount) => updateTransaction(tAccount, key, inputItem))
                            AccountArray.forEach((tAccount) => updateRecipient(tAccount, key, mentionKey))
                            readAccountVars(mentionKey)
                            mentionNickname = tNickname
                            readAccountVars(key)
                            tEmbed = new Discord.RichEmbed()
                            tEmbed.setTitle(`Hello ${tNickname}`)
                            tEmbed.setColor(message.member.displayHexColor)
                            tEmbed.setDescription(`You have initiated a transfer of ${tTransaction} to ${mentionNickname}`);
                            tEmbed.addField(`Confirm this transfer with:`, `${prefix}confirm`)
                            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                            message.channel.send(tEmbed);
                        }
                    }
                }
                else{
                    tEmbed = new Discord.RichEmbed()
                    tEmbed.setTitle('Error!')
                    tEmbed.setColor(message.member.displayHexColor)
                    tEmbed.setDescription(`That is an invalid command.`);
                    tEmbed.addField(`You are missing a comma after the amount:`, `${prefix}transfer, <amount>, <@mention>`)
                    tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                    message.channel.send(tEmbed);
                }
            }
            else{
                tEmbed = new Discord.RichEmbed()
                tEmbed.setTitle('Error!')
                tEmbed.setColor(message.member.displayHexColor)
                tEmbed.setDescription(`That is an invalid command.`);
                tEmbed.addField(`You are missing a comma after the command:`, `${prefix}transfer, <amount>, <@mention>`)
                tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                message.channel.send(tEmbed);
            }
        }
        else{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Error!')
            tEmbed.setColor(message.member.displayHexColor)
            tEmbed.setDescription(`That is an invalid command.`);
            tEmbed.addField(`You have not mentioned a recipient:`, `${prefix}transfer, <amount>, <@mention>`)
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
        }
        catch{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Error!')
            tEmbed.setColor(000000)
            tEmbed.setDescription(`You must be in a Server to use this command.`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
    }

    //prints the author's pending transactions
    if(message.content.startsWith(`${prefix}pending`)){
        try{
            key = (`${message.author.id}${message.guild.id}`);
        checkFile(key)
        readAccountVars(key)
        rKey = tRecipient
        checkFile(rKey)
        readAccountVars(rKey)
        rNickname = tNickname
        readAccountVars(key)
        if(tTransaction == 0){
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle(`Hello ${tNickname}`)
            tEmbed.setColor(message.member.displayHexColor)
            tEmbed.setDescription(`You have no pending transactions.`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
        else{
            if(tRecipient == bank){
                tEmbed = new Discord.RichEmbed()
                tEmbed.setTitle(`Hello ${tNickname}`)
                tEmbed.setColor(message.member.displayHexColor)
                tEmbed.setDescription(`You have one pending transaction of ${tTransaction}.`);
                tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                message.channel.send(tEmbed);
            }
            else{
                tEmbed = new Discord.RichEmbed()
                tEmbed.setTitle(`Hello ${tNickname}`)
                tEmbed.setColor(message.member.displayHexColor)
                tEmbed.setDescription(`You have one pending transaction of ${tTransaction} to ${rNickname}.`);
                tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                message.channel.send(tEmbed);
            }
        }
        }
        catch{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Error!')
            tEmbed.setColor(000000)
            tEmbed.setDescription(`You must be in a Server to use this command.`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
    }

    //clears out the transaction and recipient fields
    if(message.content.startsWith(`${prefix}cancel`)){
        try{
            key = (`${message.author.id}${message.guild.id}`);
        checkFile(key)
        readAccountVars(key)
        rKey = tRecipient
        checkFile(rKey)
        readAccountVars(rKey)
        rNickname = tNickname
        readAccountVars(key)
        if(tTransaction == 0){
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle(`Hello ${tNickname}`)
            tEmbed.setColor(message.member.displayHexColor)
            tEmbed.setDescription(`You have no pending transactions to be cancelled.`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
        else{
            AccountArray.forEach((tAccount) => updateTransaction(tAccount, key, 0))
            AccountArray.forEach((tAccount) => updateRecipient(tAccount, key, undefined))
            if(tRecipient == bank){
                tEmbed = new Discord.RichEmbed()
                tEmbed.setTitle(`Hello ${tNickname}`)
                tEmbed.setColor(message.member.displayHexColor)
                tEmbed.setDescription(`Your pending transaction of ${tTransaction} ${tType} has been cancelled.`);
                tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                message.channel.send(tEmbed);
            }
            else{
                tEmbed = new Discord.RichEmbed()
                tEmbed.setTitle(`Hello ${tNickname}`)
                tEmbed.setColor(message.member.displayHexColor)
                tEmbed.setDescription(`Your pending transaction of ${tTransaction} ${tType} to ${rNickname} has been cancelled.`);
                tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
                message.channel.send(tEmbed);
            }
        }
        }
        catch{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Error!')
            tEmbed.setColor(000000)
            tEmbed.setDescription(`You must be in a Server to use this command.`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
    }

    //confirm pending purchase or transfer
    if(message.content.startsWith(`${prefix}confirm`)){
        try{
            key = (`${message.author.id}${message.guild.id}`);
        checkFile(key)
        readAccountVars(key)
        if(tTransaction != 0){
            exchangeAmount = tTransaction
            newAuthorBalance = tBalance - exchangeAmount
            exchangeRecipient = tRecipient
            checkFile(exchangeRecipient)
            readAccountVars(exchangeRecipient)
            newRecipientBalance = tBalance + exchangeAmount
            AccountArray.forEach((tAccount) => updateTransaction(tAccount, key, 0))
            AccountArray.forEach((tAccount) => updateRecipient(tAccount, key, undefined))
            AccountArray.forEach((tAccount) => updateBalance(tAccount, key, newAuthorBalance))
            AccountArray.forEach((tAccount) => updateBalance(tAccount, exchangeRecipient, newRecipientBalance))
            readAccountVars(key)
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle(`Hello ${tNickname}`)
            tEmbed.setColor(message.member.displayHexColor)
            tEmbed.setDescription(`Your transaction has been confirmed.  You have lost ${exchangeAmount} ${tType} and your new balance is ${tBalance} ${tType}.`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
            saveFile(key)
            saveFile(exchangeRecipient)
        }
        else{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle(`Hello ${tNickname}`)
            tEmbed.setColor(message.member.displayHexColor)
            tEmbed.setDescription(`You do not have a pending transaction.`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
        }
        catch{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Error!')
            tEmbed.setColor(000000)
            tEmbed.setDescription(`You must be in a Server to use this command.`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
    }
    
    //update nickname command
    if(message.content.startsWith(`${prefix}call me`)){
        try{
            key = (`${message.author.id}${message.guild.id}`);
        checkFile(key)
        readAccountVars(key)
        myString = message.content;
        inputList = myString.split(",")
        if(inputList[2] != undefined){
            inputList[2] = inputList[2].trim()
            inputItem = inputList[2]
            oldNickname = tNickname
            AccountArray.forEach((tAccount) => updateNickname(tAccount, key, inputItem))
            readAccountVars(key)
            saveFile(key)
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle(`Hello ${oldNickname}`)
            tEmbed.setColor(message.member.displayHexColor)
            tEmbed.setDescription(`You're nickname has been updated to ${tNickname}`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
        else{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle(`Error!`)
            tEmbed.setColor(message.member.displayHexColor)
            tEmbed.setDescription(`That is an invalid command.`);
            tEmbed.addField(`You are missing a comma after the command:`, `${prefix}call me, <new nickname>`)
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
        }
        catch{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Error!')
            tEmbed.setColor(000000)
            tEmbed.setDescription(`You must be in a Server to use this command.`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
    }

    //update type command
    if(message.content.startsWith(`${prefix}call my currency`)){
        try{
            key = (`${message.author.id}${message.guild.id}`);
        checkFile(key)
        readAccountVars(key)
        myString = message.content;
        inputList = myString.split(",")
        if(inputList[2] != undefined){
            inputList[2] = inputList[2].trim()
            inputItem = inputList[2]
            AccountArray.forEach((tAccount) => updateType(tAccount, key, inputItem))
            readAccountVars(key)
            saveFile(key)
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle(`Hello ${tNickname}`)
            tEmbed.setColor(message.member.displayHexColor)
            tEmbed.setDescription(`You're currency type has been updated to ${tType}`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
        else{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Error!')
            tEmbed.setColor(message.member.displayHexColor)
            tEmbed.setDescription(`That is an invalid command.`);
            tEmbed.addField(`You are missing a comma after the command:`, `${prefix}call my currency, <new Type>`)
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
        }
        catch{
            tEmbed = new Discord.RichEmbed()
            tEmbed.setTitle('Error!')
            tEmbed.setColor(000000)
            tEmbed.setDescription(`You must be in a Server to use this command.`);
            tEmbed.setFooter(`Use <${prefix}help> to get a list of commands`, 'https://media.discordapp.net/attachments/606243861110587403/703738175071322122/unknown.png?width=471&height=471');
            message.channel.send(tEmbed);
        }
    }
}


//SPELL commands
{
    necromancyColor = `27e21a`
    conjurationColor = `ca9b0c`
    evocationColor = `b60205`
    illusionColor = `6504a3`
    enchantmentColor = `c50567`
    divinationColor = `888282`
    abjurationColor = `0691ca`
    transmutationColor = `7e3f05`
    wizardColor = `0125aa`
    //sample spell
    if(message.content.startsWith(`${prefix}sample`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Shape Water')
        tEmbed.setColor(transmutationColor)
        tEmbed.addField(`Level:`, `Cantrip`, true)
        tEmbed.addField('School:', `Transmutation`, true)
        tEmbed.addField('Components:', `S`, true)
        tEmbed.addField('Casting Time:', `1 action`, true)
        tEmbed.addField('Range/Area:', `30ft./5ft.`, true)
        tEmbed.addField('Duration:', `Instantaneous`, true)
        tEmbed.setFooter(`Source: `)
        tEmbed.addField(`Description:`, ``);
        tEmbed.addField(`Description Continued:`, ``)
        message.channel.send(tEmbed);
    }
    //spell commands
    if(message.content.startsWith(`${prefix}chill touch`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Chill Touch')
        tEmbed.setColor(necromancyColor)
        tEmbed.addField(`Level:`, `Cantrip`, true)
        tEmbed.addField('School:', `Necromancy`, true)
        tEmbed.addField('Components:', `V, S`, true)
        tEmbed.addField('Casting Time:', `1 action`, true)
        tEmbed.addField('Range/Area:', `120ft.`, true)
        tEmbed.addField('Duration:', `1 round`, true)
        tEmbed.setFooter(`Source: PHB, pg. 221`)
        tEmbed.addField(`Description`, `You create a ghostly, skeletal hand in the space of a creature within range. Make a ranged spell attack against the creature to assail it with the chill of the grave. On a hit, the target takes 1d8 necrotic damage, and it can't regain hit points until the start of your next turn. Until then, the hand clings to the target.

        If you hit an undead target, it also has disadvantage on attack rolls against you until the end of your next turn.`)
        tEmbed.addField(`Description Continued:`, `This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}mage hand`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Mage Hand')
        tEmbed.setColor(conjurationColor)
        tEmbed.addField(`Level:`, `Cantrip`, true)
        tEmbed.addField('School:', `Conjuration`, true)
        tEmbed.addField('Components:', `V, S`, true)
        tEmbed.addField('Casting Time:', `1 action`, true)
        tEmbed.addField('Range/Area:', `30ft.`, true)
        tEmbed.addField('Duration:', `1 minute`, true)
        tEmbed.setFooter(`Source: PHB, pg. 256/Archived UA`)
        tEmbed.addField(`Description`, `A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.
        
        You can use your action to control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it.`)
        tEmbed.addField(`Description Continued:`, `The hand can't attack, activate magic items, or carry more than 10 pounds.`)
        tEmbed.addField(`Telekinetic:`, `You learn to move things with your mind. You gain the following benefits:

        Increase your Intelligence score by 1, to a maximum of 20.

        You learn the mage hand cantrip. You can cast it without verbal or somatic components, and you can make the spectral hand invisible.

        As a bonus action, you can try to shove one creature you can see within 5 feet of the spectral hand created by your mage hand spell. When you do so, the target must succeed on a Strength saving throw (DC 8 + your proficiency bonus + your Intelligence modifier) or be pushed 5 feet away from you.`)
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}minor illusion`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Minor Illusion')
        tEmbed.setColor(illusionColor)
        tEmbed.addField(`Level:`, `Cantrip`, true)
        tEmbed.addField('School:', `Illusion`, true)
        tEmbed.addField('Components:', `S, M(a bit of fleece)`, true)
        tEmbed.addField('Casting Time:', `1 action`, true)
        tEmbed.addField('Range/Area:', `30ft./5ft.`, true)
        tEmbed.addField('Duration:', `1 minute`, true)
        tEmbed.setFooter(`Source: PHB, pg. 260`)
        tEmbed.addField(`Description`, `You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again.
        
        If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a lion's roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends.`)
        tEmbed.addField(`Description continued`, `If you create an image of an object--such as a chair, muddy footprints, or a small chest--it must be no larger than a 5-foot cube. The image can't create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, because things can pass through it.
        
        If a creature uses its action to examine the sound or image, the creature can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the illusion becomes faint to the creature.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}mold earth`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Mold Earth')
        tEmbed.setColor(transmutationColor)
        tEmbed.addField(`Level:`, `Cantrip`, true)
        tEmbed.addField('School:', `Transmutation`, true)
        tEmbed.addField('Components:', `S`, true)
        tEmbed.addField('Casting Time:', `1 action`, true)
        tEmbed.addField('Range/Area:', `30ft./5ft.`, true)
        tEmbed.addField('Duration:', `Instantaneous`, true)
        tEmbed.setFooter(`Source: EE, pg. 162`)
        tEmbed.addField(`Description`, `You choose a portion of dirt or stone that you can see within range and that fits within a 5-foot cube. You manipulate it in one of the following ways:
        
        If you target an area of loose earth, you can instantaneously excavate it, move it along the ground, and deposit it up to 5 feet away. This movement doesn’t have enough force to cause damage.`)
        tEmbed.addField(`Description Continued:`, `You cause shapes, colors, or both to appear on the dirt or stone, spelling out words, creating images, or shaping patterns. The changes last for 1 hour.
        
        If the dirt or stone you target is on the ground, you cause it to become difficult terrain. Alternatively, you can cause the ground to become normal terrain if it is already difficult terrain. This change lasts for 1 hour.`)
        tEmbed.addField(`Description Continued:`, `If you cast this spell multiple times, you can have no more than two of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}shape water`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Shape Water')
        tEmbed.setColor(transmutationColor)
        tEmbed.addField(`Level:`, `Cantrip`, true)
        tEmbed.addField('School:', `Transmutation`, true)
        tEmbed.addField('Components:', `S`, true)
        tEmbed.addField('Casting Time:', `1 action`, true)
        tEmbed.addField('Range/Area:', `30ft./5ft.`, true)
        tEmbed.addField('Duration:', `Instantaneous`, true)
        tEmbed.setFooter(`Source: EE, pg. 164`)
        tEmbed.addField(`Description:`, `You choose an area of water that you can see within range and that fits within a 5-foot cube. You manipulate it in one of the following ways:
        
        You instantaneously move or otherwise change the flow of the water as you direct, up to 5 feet in any direction. This movement doesn’t have enough force to cause damage.`);
        tEmbed.addField(`Description Continued:`, `You cause the water to form into simple shapes and animate at your direction. This change lasts for 1 hour.
        
        You change the water’s color or opacity. The water must be changed in the same way throughout. This change lasts for 1 hour.`)
        tEmbed.addField(`Description Continued:`, `You freeze the water, provided that there are no creatures in it. The water unfreezes in 1 hour.
        
        If you cast this spell multiple times, you can have no more than two of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.`)
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}detect magic`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Detect Magic')
        tEmbed.setColor(divinationColor)
        tEmbed.addField(`Level:`, `1st`, true)
        tEmbed.addField('School:', `Divination`, true)
        tEmbed.addField('Components:', `V, S`, true)
        tEmbed.addField('Casting Time:', `1 action + 10 minutes`, true)
        tEmbed.addField('Range/Area:', `Self/30ft.`, true)
        tEmbed.addField('Duration:', `Concentration, up to 10 minutes`, true)
        tEmbed.setFooter(`Source: PHB, pg. 231`)
        tEmbed.addField(`Description:`, `For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any.
        
        The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}feather fall`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Feather Fall')
        tEmbed.setColor(transmutationColor)
        tEmbed.addField(`Level:`, `1st`, true)
        tEmbed.addField('School:', `Transmutation`, true)
        tEmbed.addField('Components:', `V, M(a small feather or piece of down)`, true)
        tEmbed.addField('Casting Time:', `1 reaction, which you take when you or a creature within 60 feet of you falls`, true)
        tEmbed.addField('Range/Area:', `60ft.`, true)
        tEmbed.addField('Duration:', `1 minute`, true)
        tEmbed.setFooter(`Source: PHB, pg. 239`)
        tEmbed.addField(`Description:`, `Choose up to five falling creatures within range. A falling creature's rate of descent slows to 60 feet per round until the spell ends. If the creature lands before the spell ends, it takes no falling damage and can land on its feet, and the spell ends for that creature.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}find familiar`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Find Familiar')
        tEmbed.setColor(conjurationColor)
        tEmbed.addField(`Level:`, `1st`, true)
        tEmbed.addField('School:', `Conjuration`, true)
        tEmbed.addField('Components:', `V, S, M(10 gp worth of charcoal, incense, and herbs that must be consumed by fire in a brass brazier)`, true)
        tEmbed.addField('Casting Time:', `1 hour + 10 minutes`, true)
        tEmbed.addField('Range/Area:', `10ft.`, true)
        tEmbed.addField('Duration:', `Instantaneous`, true)
        tEmbed.setFooter(`Source: PHB, pg. 240`)
        tEmbed.addField(`Description:`, `You gain the service of a familiar, a spirit that takes an animal form you choose: bat, cat, crab, frog (toad), hawk, lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, or weasel. Appearing in an unoccupied space within range, the familiar has the statistics of the chosen form, though it is a celestial, fey, or fiend (your choice) instead of a beast.
        
        Your familiar acts independently of you, but it always obeys your commands. In combat, it rolls its own initiative and acts on its own turn. A familiar can't attack, but it can take other actions as normal.`);
        tEmbed.addField(`Description Continued:`, `When the familiar drops to 0 hit points, it disappears, leaving behind no physical form. It reappears after you cast this spell again.
        
        While your familiar is within 100 feet of you, you can communicate with it telepathically. Additionally, as an action, you can see through your familiar's eyes and hear what it hears until the start of your next turn, gaining the benefits of any special senses that the familiar has. During this time, you are deaf and blind with regard to your own senses.`)
        tEmbed.addField(`Description Continued:`, `As an action, you can temporarily dismiss your familiar. It disappears into a pocket dimension where it awaits your summons. Alternatively, you can dismiss it forever. As an action while it is temporarily dismissed, you can cause it to reappear in any unoccupied space within 30 feet of you.
        
        You can't have more than one familiar at a time. If you cast this spell while you already have a familiar, you instead cause it to adopt a new form. Choose one of the forms from the above list. Your familiar transforms into the chosen creature.`)
        tEmbed.addField(`Description Continued:`, `Finally, when you cast a spell with a range of touch, your familiar can deliver the spell as if it had cast the spell. Your familiar must be within 100 feet of you, and it must use its reaction to deliver the spell when you cast it. If the spell requires an attack roll, you use your attack modifier for the roll.`)
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}fog cloud`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Fog Cloud')
        tEmbed.setColor(conjurationColor)
        tEmbed.addField(`Level:`, `1st`, true)
        tEmbed.addField('School:', `Conjuration`, true)
        tEmbed.addField('Components:', `V, S`, true)
        tEmbed.addField('Casting Time:', `1 action`, true)
        tEmbed.addField('Range/Area:', `120ft./20ft.`, true)
        tEmbed.addField('Duration:', `Concentration, up to 1 hour`, true)
        tEmbed.setFooter(`Source: PHB, pg. 243`)
        tEmbed.addField(`Description:`, `You create a 20-foot-radius sphere of fog centered on a point within range. The sphere spreads around corners, and its area is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.
        
        At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the radius of the fog increases by 20 feet for each slot level above 1st.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}grease`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Grease')
        tEmbed.setColor(conjurationColor)
        tEmbed.addField(`Level:`, `1st`, true)
        tEmbed.addField('School:', `Conjuration`, true)
        tEmbed.addField('Components:', `V, S, M(a bit of pork rind or butter)`, true)
        tEmbed.addField('Casting Time:', `1 action`, true)
        tEmbed.addField('Range/Area:', `60ft./10ft.`, true)
        tEmbed.addField('Duration:', `1 minute`, true)
        tEmbed.setFooter(`Source: PHB, pg. 246`)
        tEmbed.addField(`Description:`, `Slick grease covers the ground in a 10-foot square centered on a point within range and turns it into difficult terrain for the duration.
        
        When the grease appears, each creature standing in its area must succeed on a Dexterity saving throw or fall prone. A creature that enters the area or ends its turn there must also succeed on a Dexterity saving throw or fall prone.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}shield`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Shield')
        tEmbed.setColor(abjurationColor)
        tEmbed.addField(`Level:`, `1st`, true)
        tEmbed.addField('School:', `Abjuration`, true)
        tEmbed.addField('Components:', `V, S`, true)
        tEmbed.addField('Casting Time:', `1 reaction, which you take when you are hit by an attack or targeted by the magic missile spell`, true)
        tEmbed.addField('Range/Area:', `Self`, true)
        tEmbed.addField('Duration:', `1 round`, true)
        tEmbed.setFooter(`Source: PHB, pg. 275`)
        tEmbed.addField(`Description:`, `An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}hideous laughter`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Hideous Laughter')
        tEmbed.setColor(enchantmentColor)
        tEmbed.addField(`Level:`, `1st`, true)
        tEmbed.addField('School:', `Enchantment`, true)
        tEmbed.addField('Components:', `V, S, M(tiny tarts and a feather that is waved in the air)`, true)
        tEmbed.addField('Casting Time:', `1 action`, true)
        tEmbed.addField('Range/Area:', `30ft.`, true)
        tEmbed.addField('Duration:', `Concentration, up to 1 minute`, true)
        tEmbed.setFooter(`Source: PHB, pg. 280`)
        tEmbed.addField(`Description:`, `A creature of your choice that you can see within range perceives everything as hilariously funny and falls into fits of laughter if this spell affects it. The target must succeed on a Wisdom saving throw or fall prone, becoming incapacitated and unable to stand up for the duration. A creature with an Intelligence score of 4 or less isn’t affected.
        
        At the end of each of its turns, and each time it takes damage, the target can make another Wisdom saving throw. The target has advantage on the saving throw if it's triggered by damage. On a success, the spell ends.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}detect thoughts`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Detect Thoughts')
        tEmbed.setColor(divinationColor)
        tEmbed.addField(`Level:`, `2nd`, true)
        tEmbed.addField('School:', `Divination`, true)
        tEmbed.addField('Components:', `V, S, M(a copper piece)`, true)
        tEmbed.addField('Casting Time:', `1 action`, true)
        tEmbed.addField('Range/Area:', `Self`, true)
        tEmbed.addField('Duration:', `Concentration, up to 1 minute`, true)
        tEmbed.setFooter(`Source: PHB, pg. 231`)
        tEmbed.addField(`Description:`, `For the duration, you can read the thoughts of certain creatures. When you cast the spell and as your action on each turn until the spell ends, you can focus your mind on any one creature that you can see within 30 feet of you. If the creature you choose has an Intelligence of 3 or lower or doesn't speak any language, the creature is unaffected.
        
        You initially learn the surface thoughts of the creature--what is most on its mind in that moment. As an action, you can either shift your attention to another creature's thoughts or attempt to probe deeper into the same creature's mind. If you probe deeper, the target must make a Wisdom saving throw. If it fails, you gain insight into its reasoning (if any), its emotional state, and something that looms large in its mind (such as something it worries over, loves, or hates). If it succeeds, the spell ends. Either way, the target knows that you are probing into its mind, and unless you shift your attention to another creature's thoughts, the creature can use its action on its turn to make an Intelligence check contested by your Intelligence check; if it succeeds, the spell ends.`);
        tEmbed.addField(`Description Continued:`, `Questions verbally directed at the target creature naturally shape the course of its thoughts, so this spell is particularly effective as part of an interrogation.
        
        You can also use this spell to detect the presence of thinking creatures you can't see. When you cast the spell or as your action during the duration, you can search for thoughts within 30 feet of you. The spell can penetrate barriers, but 2 feet of rock, 2 inches of any metal other than lead, or a thin sheet of lead blocks you. You can't detect a creature with an Intelligence of 3 or lower or one that doesn't speak any language.`)
        tEmbed.addField(`Description Continued:`, `Once you detect the presence of a creature in this way, you can read its thoughts for the rest of the duration as described above, even if you can't see it, but it must still be within range.`)
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}invisibility`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Invisibility')
        tEmbed.setColor(illusionColor)
        tEmbed.addField(`Level:`, `2nd`, true)
        tEmbed.addField('School:', `Illusion`, true)
        tEmbed.addField('Components:', `V, S, M(an eyelash encased in gum arabic)`, true)
        tEmbed.addField('Casting Time:', `1 action`, true)
        tEmbed.addField('Range/Area:', `Touch`, true)
        tEmbed.addField('Duration:', `Concentration, up to 1 hour`, true)
        tEmbed.setFooter(`Source: PHB, pg. 254`)
        tEmbed.addField(`Description:`, `A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target's person. The spell ends for a target that attacks or casts a spell.
        
        At Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}levitate`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Levitate')
        tEmbed.setColor(transmutationColor)
        tEmbed.addField(`Level:`, `2nd`, true)
        tEmbed.addField('School:', `Transmutation`, true)
        tEmbed.addField('Components:', `V, S, M(either a small leather loop or a piece of golden wire bent into a cup shape with a long shank on one end)`, true)
        tEmbed.addField('Casting Time:', `1 action`, true)
        tEmbed.addField('Range/Area:', `60ft.`, true)
        tEmbed.addField('Duration:', `Concentration, up to 10 minutes`, true)
        tEmbed.setFooter(`Source: PHB, pg. 255`)
        tEmbed.addField(`Description:`, `One creature or loose object of your choice that you can see within range rises vertically, up to 20 feet, and remains suspended there for the duration. The spell can levitate a target that weighs up to 500 pounds. An unwilling creature that succeeds on a Constitution saving throw is unaffected.
        
        The target can move only by pushing or pulling against a fixed object or surface within reach (such as a wall or a ceiling), which allows it to move as if it were climbing. You can change the target's altitude by up to 20 feet in either direction on your turn. If you are the target, you can move up or down as part of your move. Otherwise, you can use your action to move the target, which must remain within the spell's range.`);
        tEmbed.addField(`Description Continued:`, `When the spell ends, the target floats gently to the ground if it is still aloft.`)
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}see invisibility`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('See Invisibility')
        tEmbed.setColor(divinationColor)
        tEmbed.addField(`Level:`, `2nd`, true)
        tEmbed.addField('School:', `Divination`, true)
        tEmbed.addField('Components:', `V, S, M(a pinch of talc and a small sprinkling of powdered silver)`, true)
        tEmbed.addField('Casting Time:', `1 action`, true)
        tEmbed.addField('Range/Area:', `Self`, true)
        tEmbed.addField('Duration:', `1 hour`, true)
        tEmbed.setFooter(`Source: PHB, pg. 274`)
        tEmbed.addField(`Description:`, `For the duration, you see invisible creatures and objects as if they were visible, and you can see into the Ethereal Plane. Ethereal creatures and objects appear ghostly and translucent.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}counterspell`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Counterspell')
        tEmbed.setColor(abjurationColor)
        tEmbed.addField(`Level:`, `3rd`, true)
        tEmbed.addField('School:', `Abjuration`, true)
        tEmbed.addField('Components:', `S`, true)
        tEmbed.addField('Casting Time:', `1 reaction, which you take when you see a creature within 60 feet of you casting a spell`, true)
        tEmbed.addField('Range/Area:', `60ft.`, true)
        tEmbed.addField('Duration:', `Instantaneous`, true)
        tEmbed.setFooter(`Source: PHB, pg. 228`)
        tEmbed.addField(`Description:`, `You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 3rd level or lower, its spell fails and has no effect. If it is casting a spell of 4th level or higher, make an ability check using your spellcasting ability. The DC equals 10 + the spell's level. On a success, the creature's spell fails and has no effect.
        
        At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the interrupted spell has no effect if its level is less than or equal to the level of the spell slot you used.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}dispel magic`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Dispel Magic')
        tEmbed.setColor(abjurationColor)
        tEmbed.addField(`Level:`, `3rd`, true)
        tEmbed.addField('School:', `Abjuration`, true)
        tEmbed.addField('Components:', `V, S`, true)
        tEmbed.addField('Casting Time:', `1 action`, true)
        tEmbed.addField('Range/Area:', `120ft.`, true)
        tEmbed.addField('Duration:', `Instantaneous`, true)
        tEmbed.setFooter(`Source: PHB, pg. 234`)
        tEmbed.addField(`Description:`, `Choose one creature, object, or magical effect within range. Any spell of 3rd level or lower on the target ends. For each spell of 4th level or higher on the target, make an ability check using your spellcasting ability. The DC equals 10 + the spell's level. On a successful check, the spell ends.
        
        At Higher Levels. When you cast this spell using a spell slot of 4th level or higher, you automatically end the effects of a spell on the target if the spell's level is equal to or less than the level of the spell slot you used.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}tiny hut`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Tiny Hut')
        tEmbed.setColor(evocationColor)
        tEmbed.addField(`Level:`, `3rd`, true)
        tEmbed.addField('School:', `Evocation`, true)
        tEmbed.addField('Components:', `V, S, M(a small crystal bead)`, true)
        tEmbed.addField('Casting Time:', `1 minute + 10 minutes`, true)
        tEmbed.addField('Range/Area:', `Self/10ft.`, true)
        tEmbed.addField('Duration:', `8 hours`, true)
        tEmbed.setFooter(`Source: PHB, pg. 255`)
        tEmbed.addField(`Description:`, `A 10-foot-radius immobile dome of force springs into existence around and above you and remains stationary for the duration. The spell ends if you leave its area.
        
        Nine creatures of Medium size or smaller can fit inside the dome with you. The spell fails if its area includes a larger creature or more than nine creatures. Creatures and objects within the dome when you cast this spell can move through it freely. All other creatures and objects are barred from passing through it. Spells and other magical effects can't extend through the dome or be cast through it. The atmosphere inside the space is comfortable and dry, regardless of the weather outside.`);
        tEmbed.addField(`Description Continued:`, `Until the spell ends, you can command the interior to become dimly lit or dark. The dome is opaque from the outside, of any color you choose, but it is transparent from the inside.`)
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}haste`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Haste')
        tEmbed.setColor(transmutationColor)
        tEmbed.addField(`Level:`, `3rd`, true)
        tEmbed.addField('School:', `Transmutation`, true)
        tEmbed.addField('Components:', `V, S, M(a shaving of licorice root)`, true)
        tEmbed.addField('Casting Time:', `1 action`, true)
        tEmbed.addField('Range/Area:', `30ft.`, true)
        tEmbed.addField('Duration:', `Concentration, up to 1 minute`, true)
        tEmbed.setFooter(`Source: PHB, pg. 250`)
        tEmbed.addField(`Description:`, `Choose a willing creature that you can see within range. Until the spell ends, the target's speed is doubled, it gains a +2 bonus to AC, it has advantage on Dexterity saving throws, and it gains an additional action on each of its turns. That action can be used only to take the Attack (one weapon attack only), Dash, Disengage, Hide, or Use an Object action.

        When the spell ends, the target can't move or take actions until after its next turn, as a wave of lethargy sweeps over it.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}waterbreathing`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Waterbreathing')
        tEmbed.setColor(transmutationColor)
        tEmbed.addField(`Level:`, `3rd`, true)
        tEmbed.addField('School:', `Transmutation`, true)
        tEmbed.addField('Components:', `V, S, M(a short reed or piece of straw)`, true)
        tEmbed.addField('Casting Time:', `1 action + 10 minutes`, true)
        tEmbed.addField('Range/Area:', `30ft.`, true)
        tEmbed.addField('Duration:', `24 hours`, true)
        tEmbed.setFooter(`Source: PHB, pg. 287`)
        tEmbed.addField(`Description:`, `This spell grants up to ten willing creatures you can see within range the ability to breathe underwater until the spell ends. Affected creatures also retain their normal mode of respiration.`);
        message.channel.send(tEmbed);
    }
//Aamon Commands
    if(message.content.startsWith(`${prefix}aamon`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Aamon')
        tEmbed.setColor(wizardColor)
        tEmbed.addField(`Level, Class:`, `6th level Wizard\n(War Magic)`, true)
        tEmbed.addField(`Race:`, `Variant Human\n(Werebear)`, true)
        tEmbed.addField(`Background:`, `Urchin`, true)
        tEmbed.addField(`Initiative:`, `+6\n(+1 DexMod +5 IntMod)`, true)
        tEmbed.addField(`Armor Class:`, `13\n(Studded Leather +1 DexMod)`, true)
        tEmbed.addField(`Defenses:`, `Immunity to Bludgeoning, Piercing, and Slashing from Nonmagical Attacks that aren't Silvered\n(Werebear)`, true)
        tEmbed.addField(`Passive Perception:`, `11`, true)
        tEmbed.addField(`Passive Investigation:`, `18`, true)
        tEmbed.addField(`Passive Insight:`, `11`, true)
        tEmbed.addField(`Armor Proficiencies:`, `Light Armor\n(Lightly Armored Feat at lvl 4)`, true)
        tEmbed.addField(`Weapon Proficienies:`,`Crossbow, Light, Dagger, Dart, Quarterstaff, Sling\n(Wizard)`, true)
        tEmbed.addField(`Tool Proficiencies:`, `Alchemist's Supplies, Smith Tools\n(Urchin Background)`, true)
        tEmbed.addField(`Languages:`, `Common, Undercommon\n(Racial Languages)`, true)
        tEmbed.addField(`Feats:`, `Telekinetic (lvl 1)\nLightly Armored (lvl 4)`, true)
        tEmbed.setThumbnail(`https://media.discordapp.net/attachments/674345298864242742/701189334929244270/Aamon_lvl_4.png`)
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}werebear`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Werebear Lycanthropy')
        tEmbed.setColor(evocationColor)

        tEmbed.addField(`Speeds:\nNonhumanoid Form:`, `40 ft., climb 30 ft. in bear or hybrid form`, true)
        tEmbed.addField(`Defenses:\nImmunities:`, `Bludgeoning, Piercing, and Slashing from Nonmagical Attacks that aren't Silvered`, true)
        tEmbed.addField(`Traits:\nKeen Smell:`, `The werebear has advantage on Wisdom (Perception) checks that rely on smell.`, true)
        tEmbed.addField(`Traits:\nShapechanger:`, `The werebear can use its action to polymorph into a Large bear-humanoid hybrid or into a Large bear, or back into its true form, which is humanoid. Its statistics, other than its size and AC, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies.`)
        tEmbed.addField(`Actions:\nMultiattack:`, `In bear form, the werebear makes two claw attacks. In hybrid form, it can attack like a bear or a humanoid.`, true)
        tEmbed.addField(`Actions:\nClaw (Bear or Hybrid Form Only):`, `Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 2d8 +(4) slashing damage.`, true)
        tEmbed.addField(`Actions:\nBite (Bear or Hybrid Form Only):`, `Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 2d10 +(4) piercing damage. If the target is a humanoid, it must succeed on a DC (15) Constitution saving throw or be cursed with werebear lycanthropy.`, true)
        tEmbed.addField(`Player Characters as Lycanthropes:`, `A character who becomes a lycanthrope retains his or her statistics except as specified by lycanthrope type. The character gains the lycanthrope’s speeds in nonhumanoid form, damage immunities, traits, and actions that don’t involve equipment. The character is proficient with the lycanthrope’s natural attacks, such as its bite or claws, which deal damage as shown in the lycanthrope’s statistics. The character can’t speak while in animal form.
        
        A non-lycanthrope humanoid hit by an attack that carries the curse of lycanthropy must succeed on a Constitution saving throw (DC 8 + the lycanthrope’s proficiency bonus + the lycanthrope’s Constitution modifier) or be cursed. If the character embraces the curse, his or her alignment becomes the one defined for the lycanthrope. The DM is free to decide that a change in alignment places the character under DM control until the curse of lycanthropy is removed.
        
        The following information applies to specific lycanthropes.`)
        tEmbed.addField(`Werebear:`, `The character gains a Strength of 19 if his or her score isn’t already higher, and a +1 bonus to AC while in bear or hybrid form (from natural armor). Attack and damage rolls for the natural weapons are based on Strength.`)
        //tEmbed.setThumbnail(`https://media.discordapp.net/attachments/675096546408136725/703455380897923133/340.png`)
        tEmbed.setThumbnail(`https://i.imgur.com/ZEQAwXK.jpg`)
        //tEmbed.setThumbnail(`https://render.fineartamerica.com/images/rendered/default/print/6/8/break/images/artworkimages/medium/1/fox-and-bear-couple-james-w-johnson.jpg`)
        //tEmbed.setThumbnail(`https://vignette.wikia.nocookie.net/hunterxhunter/images/9/95/Kon%27s_mother.jpg/revision/latest?cb=20120517110433`)
        //tEmbed.setImage(`https://cdn.discordapp.com/attachments/674310746443743252/704219672983371806/unknown.png`)
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}momo is upset`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setAuthor(`Momo is having an episode`, `https://media.discordapp.net/attachments/675096546408136725/704232941655687178/Z.png`)
        tEmbed.setTitle('WARNING!!  A FERAL FOX HAS BEEN SIGHTED!!  KEEP YOUR DISTANCE UNTIL SHE HAS CALMED DOWN!!')
        tEmbed.setColor(evocationColor)
        tEmbed.setThumbnail(`https://media.discordapp.net/attachments/675096546408136725/704233010299404328/9k.png`)
        tEmbed.setImage(`https://media.discordapp.net/attachments/675096546408136725/704232973213499442/9k.png`)
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}have you seen her`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setAuthor(`I am a (Dragonborn, Blue), looking for a (Kobold, Pink)`, `https://media.discordapp.net/attachments/673720867200565300/704234824604319784/1442298054.png?width=576&height=471`)
        tEmbed.setTitle('What is this poster you speak of, ugh, FINE, I will do it\nMISSING!\nPink Kobold\nIf seen, please tell the nearest blue kobold.\nThank you,\n~a blue kobold')
        tEmbed.setColor(enchantmentColor)
        tEmbed.setThumbnail(`https://media.discordapp.net/attachments/675096546408136725/704235905485111335/04427cd0c6cb94b0d57ff55c5d66a419.png?width=426&height=471`)
        tEmbed.setImage(`https://media.discordapp.net/attachments/606985106837733387/704236894946459739/bafd70bac0d1e511e02cd8736df34073.png?width=368&height=471`)
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}one of us`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setAuthor(`Momma Elise`, `https://images-ext-2.discordapp.net/external/h6qEulFiOPJoqNn-v1z4AdQvQG4_Q7WdBoe8Nmj_ZSQ/https/media-waterdeep.cursecdn.com/avatars/thumbnails/8773/668/150/200/637174217031720665.jpeg`)
        tEmbed.setTitle('Do you like taking orders?  Carrying children into battle?  Getting growled at when you misbehave?\nThen join Elise`s pack today!  Find the true power of freindship. . .sort of')
        tEmbed.addField(`Benefits:`, `Absolutely nothing!`)
        tEmbed.addField(`Risks:`, `You might die. . . maybe.`)
        tEmbed.setColor(necromancyColor)
        tEmbed.setThumbnail(`https://media.discordapp.net/attachments/675096546408136725/704244175192981584/tumblr_mzy2zs7JFD1s7sbgzo1_1280.png?width=678&height=471`)
        tEmbed.setImage(`https://media.discordapp.net/attachments/675096546408136725/704241692135391273/Uncle_Sam_style_Smokey_Bear_Only_You.png?width=333&height=471`)
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}urchin`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Urchin')
        tEmbed.setColor(wizardColor)
        tEmbed.addField(`Skills:`, `Sleight of Hand, Stealth`, true)
        tEmbed.addField(`Tools:`, `Disguise kit, thieves’ tools`, true)
        tEmbed.addField(`Background Feature:`, `City Secrets`, true)
        tEmbed.setFooter(`Source: PHB`)
        tEmbed.addField(`Description:`, `You know the secret patterns and flow to cities and can find passages through the urban sprawl that others would miss. When you are not in combat, you (and companions you lead) can travel between any two locations in the city twice as fast as your speed would normally allow.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}arcane recovery`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Arcane Recovery')
        tEmbed.setColor(wizardColor)
        tEmbed.addField(`Level:`, `2nd`, true)
        tEmbed.setFooter(`Source: PHB, pg. 115`)
        tEmbed.addField(`Description:`, `You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your wizard level (rounded up), and none of the slots can be 6th level or higher.

        For example, if you’re a 4th-level wizard, you can recover up to two levels worth of spell slots. You can recover either a 2nd-level spell slot or two 1st-level spell slots.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}arcane deflection`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Arcane Deflection')
        tEmbed.setColor(wizardColor)
        tEmbed.addField(`Level:`, `2nd`, true)
        tEmbed.addField('Arcane Tradition:', `War Magic`, true)
        tEmbed.addField('Casting Time:', `1 reaction, when you are hit by an attack or you fail a saving throw`, true)
        tEmbed.setFooter(`Source: XGtE, pg. 59`)
        tEmbed.addField(`Description:`, `At 2nd level, you have learned to weave your magic to fortify yourself against harm. When you are hit by an attack or you fail a saving throw, you can use your reaction to gain a +2 bonus to your AC against that attack or a +4 bonus to that saving throw.

        When you use this feature, you can’t cast spells other than cantrips until the end of your next turn.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}tactical wit`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Tactical Wit')
        tEmbed.setColor(wizardColor)
        tEmbed.addField(`Level:`, `2nd`, true)
        tEmbed.addField('Arcane Tradition:', `War Magic`, true)
        tEmbed.setFooter(`Source: XGtE, pg. 60`)
        tEmbed.addField(`Description:`, `Starting at 2nd level, your keen ability to assess tactical situations allows you to act quickly in battle. You can give yourself a bonus to your initiative rolls equal to your Intelligence modifier.`);
        message.channel.send(tEmbed);
    }
    if(message.content.startsWith(`${prefix}power surge`)){
        tEmbed = new Discord.RichEmbed()
        tEmbed.setTitle('Power Surge')
        tEmbed.setColor(wizardColor)
        tEmbed.addField(`Level:`, `6th`, true)
        tEmbed.addField('Arcane Tradition:', `War Magic`, true)
        tEmbed.setFooter(`Source: XGtE, pg. 60`)
        tEmbed.addField(`Description:`, `Starting at 6th level, you can store magical energy within yourself to later empower your damaging spells. In its stored form, this energy is called a power surge.

        You can store a maximum number of power surges equal to your Intelligence modifier (minimum of one). Whenever you finish a long rest, your number of power surges resets to one. Whenever you successfully end a spell with dispel magic or counterspell, you gain one power surge, as you steal magic from the spell you foiled. If you end a short rest with no power surges, you gain one power surge.`);
        tEmbed.addField(`Description Continued:`, `Once per turn when you deal damage to a creature or object with a wizard spell, you can spend one power surge to deal extra force damage to that target. The extra damage equals half your wizard level.`)
        message.channel.send(tEmbed);
    }
}

//FUNCTIONS
function readAccountVars(key){
    tLogin = undefined 
    tNickname = undefined
    tBalance = undefined
    tType = undefined
    tTransaction = undefined
    tRecipient = undefined
    tAccountExists = false
    tFileExists = false
    AccountArray.forEach((tAccount) => readAccountNickname(tAccount, key))
    AccountArray.forEach((tAccount) => readAccountBalance(tAccount, key))
    AccountArray.forEach((tAccount) => readAccountType(tAccount, key))
    AccountArray.forEach((tAccount) => readAccountTransaction(tAccount, key))
    AccountArray.forEach((tAccount) => readAccountRecipient(tAccount, key))
}
function writeAccount(key, nickname, balance, type, transaction, recipient){
    newAccount = new Account(key, nickname, balance, type, transaction, recipient)
    AccountArray.push(newAccount)
}
function checkFile(key){
    readAccountVars(key)
    
    if(!tAccountExists){
        try {
            var {nickname} = require(`./_${key}.json`);
            var {balance} = require(`./_${key}.json`);
            var {type} = require(`./_${key}.json`);
            var {transaction} = require(`./_${key}.json`);
            var {recipient} = require(`./_${key}.json`);
            tFileExists = true
            writeAccount(key, nickname, balance, type, transaction, recipient)
        }
        catch{
            message.channel.send(`I can't seem find that Account in our archives.  Let me make a new account real quick.`)
            const fs = require('fs') 
    
            // Data which will write in a file. 
            let data = `{
                "nickname" : "New User",
                "balance" : 0,
                "type" : "Gold pieces",
                "transaction" : 0,
                "recipient" : "undefined"
            }`
                  
            // Write data in '.txt' . 
            fs.writeFile(`_${key}.json`, data, (err) =>{})
            nickname = "New User"
            balance = 0
            type = "Gold pieces"
            transaction = 0
            recipient = undefined
            writeAccount(key, nickname, balance, type, transaction, recipient)
            message.channel.send(`The account has been created, and the balance is ${balance} ${type}.`)
    
        }
    }
}
function saveFile(key){
    checkFile(key)
    const fs = require('fs') 
    // Data which will write in a file. 
    let data = `{
        "nickname" : "${tNickname}",
        "balance" : ${tBalance},
        "type" : "${tType}",
        "transaction" : ${tTransaction},
        "recipient" : "${tRecipient}"
    }`
         
    // Write data in '.txt' . 
    fs.writeFile(`_${key}.json`, data, (err) =>{})
}

//these readAccount commands get looped for each object in AccountArray, assigning values to the tAttributes
function readAccountNickname(tAccount, key){
    tVar = tAccount.getAccountLogin
    if(tVar == key){
        tAccountExists = true
        tNickname = tAccount.getAccountNickname
    }
}
function readAccountBalance(tAccount, key){
    tVar = tAccount.getAccountLogin
    if(tVar == key){
        tAccountExists = true
        tBalance = tAccount.getAccountBalance
    }
}
function readAccountType(tAccount, key){
    tVar = tAccount.getAccountLogin
    if(tVar == key){
        tAccountExists = true
        tType = tAccount.getAccountType
    }
}
function readAccountTransaction(tAccount, key){
    tVar = tAccount.getAccountLogin
    if(tVar == key){
        tAccountExists = true
        tTransaction = tAccount.getAccountTransaction
    }
}
function readAccountRecipient(tAccount, key){
    tVar = tAccount.getAccountLogin
    if(tVar == key){
        tAccountExists = true
        tRecipient = tAccount.getAccountRecipient
    }
}
//these write commands get looped for each object in AccountArray, overriding values based on login and key
function updateNickname(tAccount, key, input){
    tVar = tAccount.getAccountLogin
    if(tVar == key){
        tAccountExists = true
        tAccount.setAccountNickname = input
    }
}
function updateBalance(tAccount, key, input){
    tVar = tAccount.getAccountLogin
    if(tVar == key){
        tAccountExists = true
        tAccount.setAccountBalance = input
    }
}
function updateType(tAccount, key, input){
    tVar = tAccount.getAccountLogin
    if(tVar == key){
        tAccountExists = true
        tAccount.setAccountType = input
    }
}
function updateTransaction(tAccount, key, input){
    tVar = tAccount.getAccountLogin
    if(tVar == key){
        tAccountExists = true
        tAccount.setAccountTransaction = input
    }
}
function updateRecipient(tAccount, key, input){
    tVar = tAccount.getAccountLogin
    if(tVar == key){
        tAccountExists = true
        tAccount.setAccountRecipient = input
    }
}
})
client.login(token);
//TO DO
//ensure recipient account is initiated upon transfer command
