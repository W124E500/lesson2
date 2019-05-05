class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
    
        if (this.multiply >= 2 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }

}


class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        this.energy--;
        var vandakner = random(this.chooseCell(0));

        if (vandakner) {
            var newX = vandakner[0];
            var newY = vandakner[1];

            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }

    }
    eat() {


        var xoter = random(this.chooseCell(1));
       
        if (xoter) {
            this.energy += 3;
            
            var newX = xoter[0];
            var newY = xoter[1];

            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;

        }

    }
    mul() {
        var newCell = random(this.chooseCell(0));
       
        if (this.energy >= 12 && newCell) {
            var ge = new GrassEater(newCell[0], newCell[1], this.index);
            geArr.push(ge);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in geArr) {
                if (this.x == geArr[i].x && this.y == geArr[i].y) {
                    geArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}






class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        this.energy--;
        var vandakner = random(this.chooseCell(0));

        if (vandakner) {
            var newX = vandakner[0];
            var newY = vandakner[1];

            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }

    }
    eat() {


        var xotakerner = random(this.chooseCell(2));
       
        if (xotakerner) {
            this.energy += 3;
           
            var newX = xotakerner[0];
            var newY = xotakerner[1];

            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            for (var i in geArr) {
                if (newX == geArr[i].x && newY == geArr[i].y) {
                    geArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;

        }

    }
    mul() {
        var newCell = random(this.chooseCell(0));
       
        if (this.energy >= 5 && newCell) {
            var ge = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(ge);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 8;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}



class Xotaqayl {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {

        var mv = random(this.chooseCell(1));
       
        if (mv) {
            this.energy-=2 ;
           
            var newX = mv[0];
            var newY = mv[1];

            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 1;
           
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            
            this.x = newX;
            this.y = newY;

        }
      
    }


    eat() {
        var pred = random(this.chooseCell(3));
        if (pred) {
            this.energy += 3;
            var newX = pred[0];
            var newY = pred[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            this.x = newX;
            this.y = newY;
        }
    }
   mul() {
        var vandakner = random(this.chooseCell(0));
        if (vandakner && this.energy >= 14) {
            var newAnk = new Xotaqayl(vandakner[0], vandakner[1], this.index);
            xotaqaylArr.push(newAnk);
            matrix[vandakner[1]][vandakner[0]] = 4; 
            this.energy = 8;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in xotaqaylArr) {
                if (this.x == xotaqaylArr[i].x && this.y == xotaqaylArr[i].y) {
                    xotaqaylArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}




class XotaqaylEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x, this.y + 2],
            [this.x, this.y - 2],
            [this.x, this.y - 3],
            [this.x, this.y + 3],
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        this.energy--;
        var vandakner = random(this.chooseCell(0));
        if (vandakner) {
            var newX = vandakner[0];
            var newY = vandakner[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 5;

            this.x = newX;
            this.y = newY;
        }

    }
    eat() {
        var ank = random(this.chooseCell(4));
        var pred = random(this.chooseCell(3));
        var datarkArr = []
        datarkArr.push(ank);
        datarkArr.push(pred);
        var choose = random(datarkArr);
        if (choose) {
            this.energy += 3;
            var newX = choose[0];
            var newY = choose[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 5;

            if (choose == ank) {

                for (var i in xotaqaylArr) {
                    if (newX == xotaqaylArr[i].x && newY == xotaqaylArr[i].y) {
                        xotaqaylArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (choose == pred) {
                for (var i in predatorArr) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }




            this.x = newX;
            this.y = newY;
        }
       

    }





    mul() {
        var vandakner = random(this.chooseCell(0));
        if (vandakner && this.energy >= 12) {
            var newAnkeater = new XotaqaylEater(vandakner[0], vandakner[1], this.index);
            xotaqaylEaterArr.push(newAnkeater);
            matrix[vandakner[1]][vandakner[0]] = 5;
            this.energy = 8;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in xotaqaylEaterArr) {
                if (this.x == xotaqaylEaterArr[i].x && this.y == xotaqaylEaterArr[i].y) {
                    xotaqaylEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}