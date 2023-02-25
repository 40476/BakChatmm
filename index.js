const config=require('./sconfig.json'),version=require('./package.json').version;
let date_ob=new Date();let date=date_ob.getDate();let month=date_ob.getMonth();let year=date_ob.getFullYear();let hours=date_ob.getHours()+config.time.offset;let minutes=date_ob.getMinutes();let seconds=date_ob.getSeconds();
setInterval(function(){date_ob=new Date();date=date_ob.getUTCDate();month=date_ob.getUTCMonth();year=date_ob.getUTCFullYear();hours=(date_ob.getHours()+config.time.offset)%12;minutes=date_ob.getUTCMinutes();seconds=date_ob.getUTCSeconds();},750);
const fs=require('fs');fs.writeFileSync('./public/assets/version.txt',version)

const logger={
"trace":function(e,z){try{if(z!==1){fs.appendFileSync(`./assets/dev/log.html`,`<br><pre><b style="color:#00ee00;background-color:#000000;font-family:monospace;">`+"["+month+"-"+date+"-"+year+"*"+hours+"."+minutes+"."+seconds+"]"+`[trace]>>>`+e+`</pre></b>\n`)}}catch(e){};console.log('\x1b[32m'+e+'\x1b[0m');},
"debug":function(e,z){try{if(z!==1){fs.appendFileSync(`./assets/dev/log.html`,`<br><pre><b style="color:#0022ff;background-color:#000000;font-family:monospace;">`+"["+month+"-"+date+"-"+year+"*"+hours+"."+minutes+"."+seconds+"]"+`[debug]>>>`+e+`</pre></b>\n`)}}catch(e){};console.log('\x1b[36m'+e+'\x1b[0m');},
"info":function(e,z){try{if(z!==1){fs.appendFileSync(`./assets/dev/log.html`,`<br><pre><b style="color:#ffffff;background-color:#000000;font-family:monospace;">`+"["+month+"-"+date+"-"+year+"*"+hours+"."+minutes+"."+seconds+"]"+`[info]>>>`+e+`</pre></b>\n`)}}catch(e){};console.log('\x1b[97m'+e+'\x1b[0m');},
"WARN":function(e,z){try{if(z!==1){fs.appendFileSync(`./assets/dev/log.html`,`<br><pre><b style="color:#ff9900;background-color:#000000;font-family:monospace;">`+"["+month+"-"+date+"-"+year+"*"+hours+"."+minutes+"."+seconds+"]"+`[WARN]>>>`+e+`</pre></b>\n`)}}catch(e){};console.log('\x1b[33m'+e+'\x1b[0m');},
"ERROR":function(e,z){try{if(z!==1){fs.appendFileSync(`./assets/dev/log.html`,`<br><pre><b style="color:#ad6e00;background-color:#000000;font-family:monospace;">`+"["+month+"-"+date+"-"+year+"*"+hours+"."+minutes+"."+seconds+"]"+`[ERROR]>>>`+e+`</pre></b>\n`)}}catch(e){};console.log('\x1b[93m'+e+'\x1b[0m');},
"FATAL":function(e,z){try{if(z!==1){fs.appendFileSync(`./assets/dev/log.html`,`<br><pre><b style="color:#ff0000;background-color:#000000;font-family:monospace;">`+"["+month+"-"+date+"-"+year+"*"+hours+"."+minutes+"."+seconds+"]"+`[FATAL]>>>`+e+`</pre></b>\n`)}}catch(e){};console.log('\x1b[31m'+e+'\x1b[0m');}
}

//joe mama
try{
const initTime=Date.now();
const express=require('express');/*make it a website duh*/
const bodyParser=require('body-parser');
const app=express();
const https=require('https');/*send SRV messages*/
const http=require('http').Server(app);
const readline=require('readline').createInterface({input: process.stdin,output: process.stdout});
//TODO: configure to run with multiple ports --> https://stackoverflow.com/questions/19296797/running-node-js-http-server-on-multiple-ports
const io=require('socket.io').listen(http);
console.log(fs.readFileSync('./logo.txt','utf8'));
/*self made plugins*/
/* const logger = require('./plugins/,/logger.js');*/
/*internally installed plugins*/
const swearjar=require('./plugins/swearjar');
const cookieParser=require('./plugins/cookie-parser');
var device = require('express-device');


function SERV(){if(true){setTimeout(function(){
var versionInfo=`BakChat version `+version+` -- as PID:`+process.pid+` on `+process.platform+`\n\n`+fs.readFileSync('assets/credits.txt','utf8')+`\n-------------------`;
logger.trace(`server started, as PID:`+process.pid+` on `+process.platform)
console.log(versionInfo);
var recentHistory="",bar="",consoleLastRefresh,mtxsr;app.use(cookieParser());
app.set('trust proxy', true);
app.use(express.static('public'));
app.use(device.capture());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{if(req.device.type==='desktop'){res.sendFile(__dirname+'/public/desktop.html');}else{res.sendFile(__dirname+'/public/mobile.html');}});
app.get('/console.log',(req,res) =>{res.send(version+" - "+Date.now()+" -{"+(((Date.now()-consoleLastRefresh)-config.consoleRefreshRate)*-1)+' & '+Math.trunc((Date.now()-initTime)/1000)+"}["+config.server.name+"]++("+req.ip+")\n"+bar+recentHistory);});
/*app.post('/data.IN',(req,res)=>{if(req.query.psk===envAR.REMOTE){res.send(req);fs.writeFileSync('./'+req.query.path,req.data);}else{res.send('RiP el B0Z0')}});*/
app.post('/profile.IN',(req,res)=>{var user=require(`./users/${req.query.username}.json`);if(req.query.psk===user.psk){res.send(req);if(user.profile=undefined){user.profile={};}user.profile.desc=req.query.desc;user.profile.status=req.query.status;fs.writeFileSync(`./users/${req.query.username}.json`,JSON.stringify(user))}else{res.send('RiP el B0Z0')}});
app.get('/profile.OUT',(req,res)=>{try{eval(fs.readFileSync('./plugins/,/getUserData.js','utf8'));}catch(e){res.send(e);logger.ERROR(e)}});
app.get('/SRV.in',(req,res)=>{toRoom(req.query.room).emit('message',{room:req.query.room,name:'SRV:'+req.query.name,message:req.query.msg});res.send(req.query);});
app.get('/logs.OUT',(req,res)=>{if(req.query.psk===envAR.REMOTE){if(req.query.del==='true'){fs.writeFileSync('./chatlogs/'+req.query.logfile,'')}res.send(fs.readFileSync('./chatlogs/'+req.query.logfile,'utf8'));}else{res.send(/*JSON.stringify(envAR)+*/'RiP el B0Z0')}});
app.get('/data.OUT',(req,res)=>{if(req.query.psk===envAR.REMOTE){res.send(fs.readFileSync('./'+req.query.path,req.query.data));}else{res.send('RiP el B0Z0')}});
app.get('/cmd.IN',(req,res)=>{if(req.query.psk===envAR.REMOTE){eval(require('url').parse(req.url,true).query.cmd);res.send(true);}else{logger.WARN('remote input code is invalid');res.send(false);}});
app.get('/:room',(req,res)=>{if(req.device.type==='desktop'){res.sendFile(__dirname+'/public/desktop.html');}else{res.sendFile(__dirname+'/public/mobile.html');}});
app.get('*',(req,res) =>{res.sendFile(__dirname+'/public/404.html');});

http.listen(3000,()=>undefined);
io.engine.generateId=(req)=>{return randHex(6);};
/*load the functions*/eval(fs.readFileSync('./plugins/,/functions.js','utf8'));
/*fix directories if imported from github???*/eval(fs.readFileSync('./plugins/,/folders.js','utf8'));
/*define passcodes as based on whether they are in the secrest file or not*/eval(fs.readFileSync('./plugins/,/passcodes.js','utf8'));

if(config.rm_publicLogs_startup){makeFolder('./public/chatlogs');delFolder('./public/chatlogs');setTimeout(function(){makeFolder('./public/chatlogs')},50);setTimeout(function(){makeFolder('./public/chatlogs')},100);}
  setInterval(function(){console.clear();if((((Date.now()-consoleLastRefresh)-config.consoleRefreshRate)*-1)<0){mtxsr='\x1b[41m'}else{mtxsr='\x1b[42m'};bar="";for(let i=0;i<process.stdout.columns;i++){bar=bar+"-"};for (let i=0;i<linez(recentHistory);i++){if(linez(recentHistory)>(process.stdout.rows-3)){recentHistory=RemoveFirstLine(recentHistory)}}console.log(version+" - "+Date.now()+" -{"+mtxsr+(((Date.now()-consoleLastRefresh)-config.consoleRefreshRate)*-1)+"\x1b[0m & "+Math.trunc((Date.now()-initTime)/1000)+"}["+config.server.name+"]\n"+bar+recentHistory);consoleLastRefresh=Date.now();},config.consoleRefreshRate);

  io.on('connection',(socket) =>{
  socket.on('join',(data) =>{
    let room;
    defaults(socket);
    if(data&&data!=='/'){room=data.substr(1).replace(/\W/g,'');}else{room='main';}
    let allsockets=io.of('/').sockets;
    defaults(allsockets,true);
    if (!Object.keys(allsockets).includes(room)){
      socket.proto.room=room;
      socket.proto.name=socket.id;
      socket.proto.platform=socket.platform;
      socket.proto.loggedIn=false;
      socket.proto.id=socket.id;
      socket.proto.created=new Date();
      socket.proto.rank=0;
      socket.join(room);
      socket.emit('bounce',{
        type: 'join',
        status: true
      });
      toRoom(room).emit('message',{
        name: 'server',
        message: `${socket.proto.id} has joined`
      });recentHistory=recentHistory+"\n"+hours+":"+minutes+":"+seconds+" "+':  '+`${socket.proto.name} has joined ${socket.proto.room}`;
      Tolog(socket.proto.room,'<b style="color:#00FF00">server(S)@</b>'+hours+":"+minutes+":"+seconds+" "+month+"-"+date+"-"+year+''+':'+`<b style="color:${socket.proto.id}">${socket.proto.name}</b> has joined`);
      socket.emit('message',{
        platform:'nodeJS',
        name: 'server',
        message: 'Welcome to BakChat! The server you are currently on is '+config.server.name+'!<br> You are in room "'+socket.proto.room+'".<br>'+fs.readFileSync('assets/join_msg.html')+'<br>the owner of this server is <a target="_blank"href="/../$/profile.html?user='+function(o){if(config.server.owner==='getfromreplit'){o=process.env.REPL_OWNER}else{o=config.server.owner}return o}()+'"><b id="owner">'+function(o){if(config.server.owner==='getfromreplit'){o=process.env.REPL_OWNER}else{o=config.server.owner}return o}()+"</b></a>"
      });
      if(config.showAdvancedConnectionData){console.log(query({room:room}),socket.proto.room);}
      
    } else{
      socket.emit('message',{
        name: 'server',
        message: `Error: "${room}" is a user (go back to <a href="/">main</a>?)`
      });
      socket.disconnect();
    }
  });

  socket.on('message',(data) =>{
    defaults(socket);
    let message=data.message;
    let name=socket.proto.id;
    let platform=data.platform;/*logger.fatal(platform)*/
    let sockets=query({room:socket.proto.room});

    let allsockets=io.of('/').sockets;
    let room=socket.proto.room;
    defaults(sockets,true);
    

    if (message && !socket.proto.muted){
      if (message[0]===config.chat.commandprefix){
        let newname,selectedSocket,rooms;
        switch (message.split(' ')[0]){


          case config.chat.commandprefix+'login':try{eval(fs.readFileSync('./chatHANDLE/cmd/account/login.js','utf8'));}catch(e){logger.ERROR(e)};break;
          case config.chat.commandprefix+'newaccount':try{eval(fs.readFileSync('./chatHANDLE/cmd/account/new.js','utf8'));}catch(e){logger.ERROR(e)};break;
          case config.chat.commandprefix+'credits':socket.emit('message',{name:'server',message:`BakChat version `+version+'<br><pre>'+fs.readFileSync('assets/credits.txt')+'</pre>'});break;
          case config.chat.commandprefix+'ban':try{eval(fs.readFileSync('./chatHANDLE/cmd/moderate-tool/ban.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'unban':try{eval(fs.readFileSync('./chatHANDLE/cmd/moderate-tool/unban.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'whois':try{eval(fs.readFileSync('./chatHANDLE/cmd/infoGET/whois.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'kick':try{eval(fs.readFileSync('./chatHANDLE/cmd/required/kick.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'frz':try{eval(fs.readFileSync('./chatHANDLE/cmd/moderate-tool/freeze.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'restart':try{eval(fs.readFileSync('./chatHANDLE/cmd/owner/restart.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'post':try{eval(fs.readFileSync('./chatHANDLE/cmd/owner/post.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'op':try{eval(fs.readFileSync('./chatHANDLE/cmd/admin/give.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'deop':try{eval(fs.readFileSync('./chatHANDLE/cmd/admin/remove.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'giveMod':try{eval(fs.readFileSync('./chatHANDLE/cmd/MODr/give.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'deMod':try{eval(fs.readFileSync('./chatHANDLE/cmd/MODr/remove.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'unmute':try{eval(fs.readFileSync('./chatHANDLE/cmd/required/unmute.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'mute':try{eval(fs.readFileSync('./chatHANDLE/cmd/required/mute.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'update':if(true){/* TODO: fetch updates from https://raw.githubusercontent.com/40476/BakChat/main/ */logger.ERROR('not implemented');}else{}break;
          case config.chat.commandprefix+'msg':try{eval(fs.readFileSync('./chatHANDLE/onSendPrivate.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'troll':try{eval(fs.readFileSync('./chatHANDLE/cmd/misc/troll.js','utf8'));}catch(e){logger.ERROR(e);}break;
          case config.chat.commandprefix+'key':try{eval(fs.readFileSync('./chatHANDLE/cmd/required/key.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'name':try{eval(fs.readFileSync('./chatHANDLE/cmd/required/setName.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'?':try{eval(fs.readFileSync('./chatHANDLE/cmd/help.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'users':try{eval(fs.readFileSync('./chatHANDLE/cmd/infoGET/users.js','utf8'));}catch(e){logger.ERROR(e);};break;
          case config.chat.commandprefix+'logs':if(true){fs.readdir(require('path').resolve(__dirname,'./public/chatlogs/'),(err,files)=>{for(let file of files){urmom(file);}});socket.emit('message',{name:'server',message:'<a href="/../logs.html">logs</a>'});}break;
          case config.chat.commandprefix+'rooms':try{eval(fs.readFileSync('./chatHANDLE/cmd/infoGET/rooms.js','utf8'));}catch(e){logger.ERROR(e);};break;
          default:eval(fs.readFileSync('./chatHANDLE/cmd/unknown.js','utf8'));
        }
      }else{
        /*LOGGING CODE*/Tolog(socket.proto.room,socket.proto.id+'(<b style="color:#'+socket.proto.id+'">'+socket.proto.name+'</b>)@'+hours+":"+minutes+":"+seconds+" "+month+"-"+date+"-"+year+''+': '+message);
      if(socket.proto.rank!==config.ranks.owner.rank){try{message=swearjar.censor(message.replace(/</g, '&lt;').replace(/>/g, '&gt;'));}catch(e){logger.ERROR(e)}}
        if(socket.proto.loggedIn===false&&config.accounts.requireLogin){
          socket.emit('message',{
            name:'server',
            message:'please login or create an account to continue',
            platform:platform
          });
        }else{
          toRoom(socket.proto.room).emit('message',{
            name:socket.proto.name,
            message:message,//.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
            color:socket.proto.id,
            platform:platform
          });
          for(var i=0;i<config.SRV.length;i++){https.get(`https://${config.SRV[i][0]}/SRV.in?msg=${message}&name=${socket.proto.name}&room=${socket.proto.room}`,(resp)=>{logger.trace('SRV resp --> '+resp,1)});}
        }
      }
    }
    }
  );
  socket.on('disconnect',(data) =>{
    if (socket && socket.proto && socket.proto.room){
      toRoom(socket.proto.room).emit('message',{
        name: 'server',
        message: `${socket.proto.name}(${socket.proto.id}) has left`
      });
      try{
      var user=require('./users/'+fixname(socket.proto.name)+'.json');
        user.isLogin='offline'
      fs.writeFileSync('./users/'+fixname(socket.proto.name)+'.json',JSON.stringify(user));
      }catch(e){}
      recentHistory=recentHistory+"\n"+hours+":"+minutes+":"+seconds+" "+':  '+`${socket.proto.name}(${socket.proto.id}) has left ${socket.proto.room}`;
      Tolog(socket.proto.room,'<b style="color:#00FF00">server(S)@</b>'+hours+":"+minutes+":"+seconds+" "+month+"-"+date+"-"+year+''+':'+`${socket.proto.name} has left`);
      
    }
  });
});
},config.server.startUpDelay);
}}

var sha256=function r(o){function f(r,o){return r>>>o|r<<32-o}for(var t,n,a=Math.pow,c=a(2,32),e="length",i="",h=[],u=8*o[e],v=r.h=r.h||[],l=r.k=r.k||[],s=l[e],g={},k=2;s<64;k++)if(!g[k]){for(t=0;t<313;t+=k)g[t]=k;v[s]=a(k,.5)*c|0,l[s++]=a(k,1/3)*c|0}for(o+="";o[e]%64-56;)o+="\0";for(t=0;t<o[e];t++){if((n=o.charCodeAt(t))>>8)return;h[t>>2]|=n<<(3-t)%4*8}for(h[h[e]]=u/c|0,h[h[e]]=u,n=0;n<h[e];){var d=h.slice(n,n+=16),p=v;for(v=v.slice(0,8),t=0;t<64;t++){var w=d[t-15],A=d[t-2],C=v[0],M=v[4],A=v[7]+(f(M,6)^f(M,11)^f(M,25))+(M&v[5]^~M&v[6])+l[t]+(d[t]=t<16?d[t]:d[t-16]+(f(w,7)^f(w,18)^w>>>3)+d[t-7]+(f(A,17)^f(A,19)^A>>>10)|0);(v=[A+((f(C,2)^f(C,13)^f(C,22))+(C&v[1]^C&v[2]^v[1]&v[2]))|0].concat(v))[4]=v[4]+A|0}for(t=0;t<8;t++)v[t]=v[t]+p[t]|0}for(t=0;t<8;t++)for(n=3;n+1;n--){var S=v[t]>>8*n&255;i+=(S<16?0:"")+S.toString(16)}return i};
if(config.server.manAuthStartup===false||config.server.manAuthStartup==="false"){SERV();}else{logger.trace('!!!waiting for passcode!!!');readline.question('enter startup passcode: ', function (name) {config.server.authVerify=name;readline.close();});readline.on('close', function () {try{if((config.server.manAuthStartup!==false)&&(config.server.authVerify===config.server.manAuthStartup)){SERV();logger.trace('!!!passcode accepted!!!');}}catch(e){logger.FATAL(e)}});}

}catch(e){logger.FATAL(e)}