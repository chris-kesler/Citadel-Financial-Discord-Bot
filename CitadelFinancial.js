
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
