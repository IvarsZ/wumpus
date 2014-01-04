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
end
