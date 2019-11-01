const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.9;
canvas.height = (window.innerHeight - $("#box_set").height()) * 0.9;
let width = canvas.width;
let height = canvas.height;
ctx.strokeStyle = "#000000"
ctx.strokeRect(0, 0 , width, height);

//1辺のサイズ(デフォルトは10)
let maxnum = 10;
//配列サイズ(デフォルトは21)
let arraySize = 2 * maxnum + 1;
//盤面のタイプ(四角：0　六角形：1)
let boardType;
//盤面とコピー用の盤面
let table = [];
let copy = [];

//初期盤面の表示
const settings = function(type) {
    boardType = type;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeRect(0, 0 , width, height);
    maxnum = parseInt(document.forms.id_fm1.id_maxnum_form.value);
    if(type == 1){
        arraySize = 2 * maxnum + 1;
        init();
        putHex(width/2,height/2);
    }
    else{
        arraySize = maxnum + 2;
        init();
        putSqu(width/2,height/2);
    }
}

//次の世代
const next = function(){
    ctx.clearRect(0, 0, width, height);
    ctx.strokeRect(0, 0 , width, height);
    update();

    if(boardType == 0)
        putSqu(width/2,height/2);
    else
        putHex(width/2,height/2);
}

//盤面の初期化
function init() {
    table = [];
    copy = [];
    for(let i = 0; i <= arraySize; i++) {
        let tableItem;
        let copyItem;
        
        if(boardType == 0){
            tableItem = new Array(maxnum+2).fill(0);
            copyItem = new Array(maxnum+2).fill(0);
        }else if(boardType == 1){
            if(i<=maxnum){
                tableItem = new Array(maxnum+i+1).fill(0);
                copyItem = new Array(maxnum+i+1).fill(0);
            }else{
                tableItem = new Array(3*maxnum-i+1).fill(0);
                copyItem = new Array(3*maxnum-i+1).fill(0);
            }
        }else
            continue;
        table.push(tableItem);
        copy.push(copyItem);
    }

    for(let i=1; i<arraySize; i++){
        for(let j=1; j<table[i].length-1; j++){
            if(Math.floor(Math.random() * 5)==0)
                table[i][j] = 1;
            else
                continue;
        }
    }
}

//コピーした盤面をもとの盤面に上書き
function swap() {
    for(let i=1; i<arraySize; i++){
        for(let j=1; j<table[i].length; j++){
            table[i][j] = copy[i][j];
        }
    }
}

//特定のセルの周囲の生存マスをカウント
function check(i,j) {
    let count = 0;

    if(table[i-1][j] == 1)
        count++;
    if(table[i][j-1] == 1)
        count++;
    if(table[i][j+1] == 1)
        count++;
    if(table[i+1][j] == 1)
        count++;
    if(table[i+1][j+1] == 1)
        count++;

    if(boardType == 0){
        if(table[i-1][j+1] == 1)
        count++;
    }
    else{
        if(table[i-1][j-1] == 1)
        count++;
    }

    return count;
}

//盤面の更新
function update() {
    let count;
    for(let i=1; i<arraySize; i++){
        for(let j=1; j<table[i].length; j++){
            count = check(i,j);
            if(count > 1 && count < 4)
                copy[i][j] = 1;
            else if(count == 4 && table[i][j] == 1)
                copy[i][j] = 1;
            else
                copy[i][j] = 0;   
        }        
    }
    swap();
}

//六角形の描画
function drawHex(x, y, size,color) {
    const vertex = 6;

    let startx, starty;
    let tempx, tempy;

    let angle;
    let rad;
    
    ctx.beginPath();
    for (let i=0; i<vertex; i++) {
        angle = 360 / vertex * i;
        rad = angle * Math.PI / 180;

        tempx = x + Math.sin(rad) * size;
        tempy = y + Math.cos(rad) * size;

        if (i == 0) {
            ctx.moveTo(tempx,tempy);
            startx = tempx;
            starty = tempy;
        } else {
            ctx.lineTo(tempx,tempy);
        }
    }
    ctx.lineTo(startx,starty);
    if(color != 0){
        ctx.fillStyle = "#32cd32";
        ctx.fill();
        ctx.stroke();
    }else
        ctx.stroke();
}

//四角に並べる
function putSqu(x, y) {
    let size = 10;
    
    const movex = Math.sin(5*Math.PI / 3) * size;    
    const movey = 3*Math.cos(5*Math.PI / 3) * size;

    let startx = x + movex * maxnum;
    let starty = y + ((-1)*movey * maxnum) / 2;

    let tempx, tempy;
    
    for(let i=1; i<arraySize-1; i++){
        for(let j=1; j<arraySize-1; j++){
            if(j ==1){
                if(i==1){
                    tempx = startx;
                    tempy = starty;
                }else{
                    tempy = starty + movey * (i-1);
                    if(i % 2 == 1){
                        tempx = startx;
                    }else{
                        tempx = startx + movex * (-1);
                    }
                }
            }
            
            if(table[i][j] == 1)
                drawHex(tempx, tempy, size, 1);
            else
                drawHex(tempx, tempy, size, 0);
            tempx += (-2)*movex;
        }
        tempy += movey;
    }
}

//六角形に並べる
function putHex(x, y) {
    let size = 10;
    
    const movex = Math.sin(5*Math.PI / 3) * size;    
    const movey = 3*Math.cos(5*Math.PI / 3) * size;

    let startx = x + movex * maxnum;
    let starty = y + (-1)*movey * maxnum;

    let tempx, tempy;
    
    for(let i=1; i<2*maxnum; i++){
        for(let j=1; j<maxnum + i; j++){
            if(j ==1){
                if(i==1){
                    tempx = startx;
                    tempy = starty;
                }else{
                    tempy = starty + movey * (i-1);
                    if(i<maxnum){
                        tempx = startx + movex * (i-1);
                    }else{
                        tempx = startx + movex * (2*maxnum-i-1);
                    }
                }
            }
            
            if(i > maxnum && j >= maxnum+(2*maxnum-i)){
                continue;
            }
            else{
                if(table[i][j] == 1)
                    drawHex(tempx, tempy, size, 1);
                else
                    drawHex(tempx, tempy, size, 0);
            }
            tempx += (-2)*movex;
        }
        tempy += movey;
    }
}
