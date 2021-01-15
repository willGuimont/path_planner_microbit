let position_y = 0
let position_x = 0
let sprites: game.LedSprite[] = []
let pos_y: number = null
let pos_x: number = null
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
let distanceMatrix = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
let visited = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
let toVisit: number[] = [position_x, position_y]
while (toVisit.length > 0) {
    let next_pos: number[] = []
    pos_y = toVisit.pop()
    pos_x = toVisit.pop()
    visited[pos_y][pos_x] = 1
    cursor.setX(pos_x + 1)
    cursor.setY(pos_y)
    if (pos_x + 1 < 5 && !(isCollisionWithWorld(sprites, cursor)) && visited[pos_y][pos_x] == 0) {
        next_pos.push(pos_x + 1)
        next_pos.push(pos_y)
        distanceMatrix[pos_y][pos_x + 1] = distanceMatrix[pos_y][pos_x] + 1
    }
    cursor.setX(pos_x - 1)
    cursor.setY(pos_y)
    if (pos_x - 1 > 0 && !(isCollisionWithWorld(sprites, cursor)) && visited[pos_y][pos_x] == 0) {
        next_pos.push(pos_x - 1)
        next_pos.push(pos_y)
        distanceMatrix[pos_y][pos_x - 1] = distanceMatrix[pos_y][pos_x] + 1
    }
    cursor.setX(pos_x)
    cursor.setY(pos_y + 1)
    if (pos_y + 1 < 5 && !(isCollisionWithWorld(sprites, cursor)) && visited[pos_y][pos_x] == 0) {
        next_pos.push(pos_x)
        next_pos.push(pos_y + 1)
        distanceMatrix[pos_y + 1][pos_x] = distanceMatrix[pos_y][pos_x] + 1
    }
    cursor.setX(pos_x)
    cursor.setY(pos_y - 1)
    if (pos_y - 1 > 0 && !(isCollisionWithWorld(sprites, cursor)) && visited[pos_y][pos_x] == 0) {
        next_pos.push(pos_x)
        next_pos.push(pos_y - 1)
        distanceMatrix[pos_y - 1][pos_x] = distanceMatrix[pos_y][pos_x] + 1
    }
}
let player = game.createSprite(0, 0)
player.setBrightness(127)
while (!(position_x == target_x && position_y == target_y)) {
    let next_x = position_x
    let next_y = position_y
    let min_distance = 1000
    if (position_x + 1 < 5) {
        let dist = distanceMatrix[position_y]
    }
    basic.pause(500)
}
