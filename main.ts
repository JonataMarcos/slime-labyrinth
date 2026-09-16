namespace SpriteKind {
    export const Moedas = SpriteKind.create()
    export const inimigo = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Moedas, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    Moedas_Restantes += -1
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    sprites.destroy(otherSprite)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite2, location2) {
    music.stopAllSounds()
    game.gameOver(true)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleBlueCrystal, function (sprite, location) {
    if (Moedas_Restantes == 0) {
        level_atual += 1
        avancar_level(level_atual)
    } else {
        game.showLongText("PEGUE TODAS AS 5 MOEDAS", DialogLayout.Bottom)
    }
})
function avancar_level (level_number: number) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Moedas)
    if (level_number == 1) {
        tiles.setCurrentTilemap(tilemap`level01`)
    } else if (level_number == 2) {
        tiles.setCurrentTilemap(tilemap`level02`)
    } else if (level_number == 3) {
        tiles.setCurrentTilemap(tilemap`level03`)
    }
    tiles.placeOnRandomTile(Jhow, sprites.dungeon.collectibleRedCrystal)
    Moedas_Restantes = 5
    for (let value of tiles.getTilesByType(sprites.dungeon.stairLadder)) {
        mySprite = sprites.create(assets.image`Coin`, SpriteKind.Moedas)
        tiles.placeOnTile(mySprite, value)
    }
    INIMIGO1 = sprites.create(assets.image`Ghost`, SpriteKind.Enemy)
    tiles.placeOnRandomTile(INIMIGO1, sprites.builtin.oceanDepths9)
    INIMIGO1.follow(Jhow, 30)
    if (level_number >= 2) {
        INIMIGO02 = sprites.create(assets.image`Ghost02`, SpriteKind.Enemy)
        tiles.placeOnRandomTile(INIMIGO02, sprites.builtin.oceanDepths8)
        INIMIGO02.follow(Jhow, 35)
        if (level_number == 3) {
            INIMIGO03 = sprites.create(assets.image`Ghost03`, SpriteKind.Enemy)
            tiles.placeOnRandomTile(INIMIGO03, sprites.builtin.oceanDepths11)
            INIMIGO03.follow(Jhow, 45)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.stopAllSounds()
    game.gameOver(false)
})
let INIMIGO03: Sprite = null
let INIMIGO02: Sprite = null
let INIMIGO1: Sprite = null
let mySprite: Sprite = null
let Moedas_Restantes = 0
let level_atual = 0
let Jhow: Sprite = null
Jhow = sprites.create(assets.image`Jhow`, SpriteKind.Player)
controller.moveSprite(Jhow)
scene.cameraFollowSprite(Jhow)
level_atual = 1
avancar_level(1)
music.play(music.createSong(assets.song`musicao`), music.PlaybackMode.LoopingInBackground)
