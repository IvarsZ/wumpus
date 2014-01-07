class GamesController < ApplicationController
  
  def play
  end

  def create

    respond_to do |format|
      @game = Game.new(game_params)
      if @game.save
        format.json { render json: { id: @game.id, row: @game.player_row, column: @game.player_column, notifications: @game.get_notifications } }
      else
        format.json { render json: { errors: @game.errors.as_json }, status: :unprocessable_entity }
      end
    end
  end

  def make_move

    respond_to do |format|
      move = Move.new(move_params)
      move_service = MakeMove.new(move)
      if result = move_service.make_move
        format.json { render json: result.as_json }
      else
        format.json { render json: { errors: move_service.errors.as_json }, status: :unprocessable_entity }
      end
    end
  end

  def make_shot

    respond_to do |format|
      shot = Shot.new(shoot_params)
      shoot_service = Shoot.new(shot)
      if result = shoot_service.shoot
        puts shoot_service.game.cave
        puts shoot_service.game.number_of_arrows
        puts Game.last.cave
        puts Game.last.number_of_arrows 
        format.json { render json: result.as_json }
      else
        format.json { render json: { errors: shoot_service.errors.as_json }, status: :unprocessable_entity }
      end
    end
  end

  private
    
    def game_params
      params.require(:game).permit(
        :number_of_rows,
        :number_of_columns,
        :number_of_pits,
        :number_of_bats,
        :number_of_arrows
      )
    end

    def move_params
      params.require(:move).permit(:row, :column, :game_id)
    end

    def shoot_params
      params.require(:shot).permit(:row, :column, :game_id)
    end
end
