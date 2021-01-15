let dist4 = 0
let dist3 = 0
let dist2 = 0
let dist = 0
let current = 0
let next_y = 0
let next_x = 0
let pos_x = 0
let pos_y = 0
let position_y = 0
let position_x = 0
let sprites: game.LedSprite[] = []
let count = 0
let world = [[0, 0, 0, 0, 0], [1, 1, 1, 1, 0], [0, 0, 0, 0, 0], [0, 1, 1, 1, 1], [0, 0, 0, 0, 0]]
for (let i = 0; i <= 4; i++) {
    for (let j = 0; j <= 4; j++) {
        if (world[i][j] == 1) {
            sprites.push(game.createSprite(j, i))
        }
    }
}
let target_x = 4
let target_y = 4
let cursor = game.createSprite(0, 0)
cursor.off()
function isCollisionWithWorld(sprites: game.LedSprite[], x: game.LedSprite): boolean {
    for (let k = 0; k < sprites.length; ++k) {
        if (x.isTouching(sprites[k])) {
            return true
        }
    }
    return false
}
let distanceMatrix = [[9999, 9999, 9999, 9999, 9999], [9999, 9999, 9999, 9999, 9999], [9999, 9999, 9999, 9999, 9999], [9999, 9999, 9999, 9999, 9999], [9999, 9999, 9999, 9999, 9999]]
distanceMatrix[0][0] = 0
let visited = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
let toVisit = [position_x, position_y]
while (toVisit.length > 0) {
        basic.showLeds(`
        # # # # #
        . # # # .
        . . # . .
        . # # # .
        # # # # #
        `)
    pos_y = toVisit.pop()
    pos_x = toVisit.pop()
    visited[pos_y][pos_x] = 1
    cursor.setX(pos_x + 1)
cursor.setY(pos_y)
if (pos_x + 1 < 5 && !(isCollisionWithWorld(sprites, cursor)) && visited[pos_y][pos_x + 1] == 0) {
        toVisit.push(pos_x + 1)
        toVisit.push(pos_y)
        distanceMatrix[pos_y][pos_x + 1] = Math.min(distanceMatrix[pos_y][pos_x + 1], distanceMatrix[pos_y][pos_x] + 1)
    }
    cursor.setX(pos_x - 1)
cursor.setY(pos_y)
if (pos_x - 1 >= 0 && !(isCollisionWithWorld(sprites, cursor)) && visited[pos_y][pos_x - 1] == 0) {
        toVisit.push(pos_x - 1)
        toVisit.push(pos_y)
        distanceMatrix[pos_y][pos_x - 1] = Math.min(distanceMatrix[pos_y][pos_x - 1], distanceMatrix[pos_y][pos_x] + 1)
    }
    cursor.setX(pos_x)
cursor.setY(pos_y + 1)
if (pos_y + 1 < 5 && !(isCollisionWithWorld(sprites, cursor)) && visited[pos_y + 1][pos_x] == 0) {
        toVisit.push(pos_x)
        toVisit.push(pos_y + 1)
        distanceMatrix[pos_y + 1][pos_x] = Math.min(distanceMatrix[pos_y + 1][pos_x], distanceMatrix[pos_y][pos_x] + 1)
    }
    cursor.setX(pos_x)
cursor.setY(pos_y - 1)
if (pos_y - 1 >= 0 && !(isCollisionWithWorld(sprites, cursor)) && visited[pos_y - 1][pos_x] == 0) {
        toVisit.push(pos_x)
        toVisit.push(pos_y - 1)
        distanceMatrix[pos_y - 1][pos_x] = Math.min(distanceMatrix[pos_y - 1][pos_x], distanceMatrix[pos_y][pos_x] + 1)
    }
}
let player = game.createSprite(0, 0)
player.setBrightness(127)
basic.showString("Finsihed")
basic.forever(function () {
    if (!(position_x == target_x && position_y == target_y)) {
        next_x = position_x
        next_y = position_y
        current = distanceMatrix[position_y][position_x]
        if (position_x + 1 < 5) {
            dist = distanceMatrix[position_y][position_x + 1]
            if (dist == current + 1) {
                next_x = position_x + 1
                next_y = position_y
            }
        }
        if (position_x - 1 >= 0) {
            dist2 = distanceMatrix[position_y][position_x - 1]
            if (dist2 == current + 1) {
                next_x = position_x - 1
                next_y = position_y
            }
        }
        if (position_y + 1 < 5) {
            dist3 = distanceMatrix[position_y + 1][position_x]
            if (dist3 == current + 1) {
                next_x = position_x
                next_y = position_y + 1
            }
        }
        if (position_y - 1 >= 0) {
            dist4 = distanceMatrix[position_y - 1][position_x]
            if (dist4 == current + 1) {
                next_x = position_x
                next_y = position_y - 1
            }
        }
        position_x = next_x
        position_y = next_y
        player.goTo(position_x, position_y)
basic.pause(500)
    } else {
        basic.showIcon(IconNames.Happy)
    }

    
})
