class GamesController < ApplicationController
  
  def play
  end

  def create
    
    @game = Game.new(game_params)
    if @game.save
      respond_to do |format|
        format.json { render json: { id: @game.id } }
      end
    else
      respond_to do |format|
        format.json { render json: { errors: @game.errors.as_json }, status: :unprocessable_entity }
      end
    end
  end

  def make_move

    move = Move.new(move_params)
    if move_service = MakeMove.new(move).make_move
      # TODO find surroundings.
       format.json { head :ok }
    else
      format.json { render json: { errors: move_service.errors.as_json }, status: :unprocessable_entity }
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
      params.require(:move).permit(:row, :column)
    end
end
