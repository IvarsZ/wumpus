require 'spec_helper'

describe MakeMove do

  let(:player) { { row: 1, column: 1 } }

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
      @game.player_row = player[:row]
      @game.player_column = player[:column]
    end
    @game.save

    @move_service = MakeMove.new(move)
  end

  subject { @move_service }

  moves = {
    up:    {row: 0, column: 1},
    down:  {row: 2, column: 1},
    left:  {row: 1, column: 0},
    right: {row: 1, column: 2}
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

  out_of_bounds_moves = {
    at_top:     {row: -1, column: 1, player_row: 0, player_column: 1, end_row: 3, end_column: 1},
    at_bottom:  {row: 4, column: 1, player_row: 3, player_column: 1, end_row: 0, end_column: 1},
    on_left:    {row: 1, column: -1, player_row: 1, player_column: 0, end_row: 1, end_column: 3},
    on_right:   {row: 1, column: 4, player_row: 1, player_column: 3, end_row: 1, end_column: 0},
  }

  out_of_bounds_moves.each do |type, params|
    
    context "when moving out of bounds #{type}" do

      let(:move) { Move.new(row: params[:row], column: params[:column], game_id: @game.id) }
      let(:player) { { row: params[:player_row], column: params[:player_column] } }

      it { should be_valid }
      it "moves player to other side of the cave" do
        @move_service.make_move
        @move_service.game.player_row.should eq params[:end_row]
        @move_service.game.player_column.should eq params[:end_column]
      end

      it "leaves the move itself unchanged" do
        @move_service.make_move
        @move_service.move.row.should eq params[:row]
        @move_service.move.column.should eq params[:column]
      end   
    end
  end
end
