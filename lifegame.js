var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 1400;
canvas.height = 1400;

//六角形の描画
function drawHex(x, y, size) {
    let vertex = 6;

    var startx, starty;
    var tempx, tempy;

    var angle;
    var rad;
    
    ctx.beginPath();
    for (var i=0; i<vertex; i++) {
        angle = (2 * 180) / vertex * i;
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
    ctx.stroke();
}

//六角形を並べる
function putHex(x, y, maxnum) {
    let size = 15;
    
    let movex = Math.sin(5*Math.PI / 3) * size;    
    let movey = 3*Math.cos(5*Math.PI / 3) * size;

    let startx = x + movex * maxnum;
    let starty = y + movey * maxnum;

    var tempx, tempy;
    
    for(var i=1; i<2*maxnum; i++){
        for(var j=0; j<maxnum + i - 1; j++){
            if(j ==0){
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
            
            if(i > maxnum && j >= maxnum+(2*maxnum-i-1)){
                continue;
            }
            else{
                drawHex(tempx, tempy, size);
            }
            tempx += (-2)*movex;
        }
        tempy += movey;
    }
}

putHex(700,100,10);