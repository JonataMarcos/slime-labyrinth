def on_overlap_tile(sprite, location):
    global level_atual
    level_atual += 1
    avancar_level(level_atual)
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.collectible_blue_crystal,
    on_overlap_tile)

def on_overlap_tile2(sprite2, location2):
    game.game_over(True)
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.chest_closed,
    on_overlap_tile2)

def avancar_level(level_number: number):
    if level_number == 1:
        tiles.set_current_tilemap(tilemap("""
            level01
            """))
    elif level_number == 2:
        tiles.set_current_tilemap(tilemap("""
            level02
            """))
    elif level_number == 3:
        tiles.set_current_tilemap(tilemap("""
            level03
            """))
    tiles.place_on_random_tile(Jhow, sprites.dungeon.collectible_red_crystal)
level_atual = 0
Jhow: Sprite = None
Jhow = sprites.create(assets.image("""
    Jhow
    """), SpriteKind.player)
controller.move_sprite(Jhow)
scene.camera_follow_sprite(Jhow)
level_atual = 1
avancar_level(1)
music.play(music.create_song(assets.song("""
        musicao
        """)),
    music.PlaybackMode.LOOPING_IN_BACKGROUND)