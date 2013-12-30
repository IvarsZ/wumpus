class GamesController < ApplicationController
  
  def play
  end

  def create
    
    @game = Game.new(game_params)
    if @game.save
      respond_to do |format|
        format.json { render json: {ok: true, id: @game.id} }
      end
    else
      respond_to do |format|
          format.json { render json: {ok: false, error: "couldn't save"} }
      end
    end
  end

  private
    
    def game_params
      params.require(:game).permit(
        :number_of_rows,
        :number_of_columns
      )
    end
end
