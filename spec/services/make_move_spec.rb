require 'spec_helper'

describe MakeMove do

  before do
  
    @game = Game.new(
      number_of_rows: 4,
      number_of_columns: 4,
      number_of_pits: 1,
      number_of_bats: 1,
      number_of_arrows: 1
    )
    @game.stub(:generate_cave) do
      @game.cave = "...." \
                   "...." \
                   "...." \
                   "...."
      @game.player_row = 1
      @game.player_column = 1
    end
    @game.save

    @move_service = MakeMove.new(move)
  end

  subject { @move_service }

  moves = {
            up:    {row: 0, column: 1},
            down:  {row: 2, column: 1},
            left:  {row: 1, column: 0},
            right: {row: 1, column: 2},
          }

  moves.each do |type, move_params|

    context "when moving #{type}" do
      
      let(:move) { Move.new(row: move_params[:row], column: move_params[:column], game_id: @game.id) }

      it { should be_valid }

      it "updates player's position" do
        @move_service.make_move
        @move_service.game.player_row.should eq @move_service.move.row
        @move_service.game.player_column.should eq @move_service.move.column
      end
    end
  end

  context "diagonally" do
    let(:move) { Move.new(row: 2, column: 2, game_id: @game.id) }

    it { should_not be_valid }
  end
end
