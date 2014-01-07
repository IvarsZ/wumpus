require 'spec_helper'

describe Shoot do

  let(:player) { { row: 1, column: 1 } }

  before do
  
    @game = Game.new(
      number_of_rows: 4,
      number_of_columns: 4,
      number_of_pits: 0,
      number_of_bats: 0,
      number_of_arrows: 1
    )
    @game.stub(:generate_cave) do
      @game.cave = ".W.." \
                   "...." \
                   ".DP." \
                   "...."
      @game.player_row = player[:row]
      @game.player_column = player[:column]
    end
    @game.save

    @shoot_service = Shoot.new(shot)
  end

  subject { @shoot_service }

  shots = {
    up:    {row: 0, column: 1},
    down:  {row: 2, column: 1},
    left:  {row: 1, column: 0},
    right: {row: 1, column: 2}
  }

  shots.each do |type, move_params|

    context "when shooting #{type}" do
      
      let(:shot) { Shot.new(row: move_params[:row], column: move_params[:column], game_id: @game.id) }

      it { should be_valid }
    end
  end

  context "diagonally" do
    let(:shot) { Shot.new(row: 2, column: 2, game_id: @game.id) }

    it { should_not be_valid }
  end

  out_of_bounds_shots = {
    at_top:     {row: -1, column: 2, player_row: 0, player_column: 2},
    at_bottom:  {row: 4, column: 1, player_row: 3, player_column: 1},
    on_left:    {row: 1, column: -1, player_row: 1, player_column: 0},
    on_right:   {row: 1, column: 4, player_row: 1, player_column: 3},
  }

  out_of_bounds_shots.each do |type, params|
    
    context "when shooting out of bounds #{type}" do

      let(:shot) { Shot.new(row: params[:row], column: params[:column], game_id: @game.id) }
      let(:player) { { row: params[:player_row], column: params[:player_column] } }

      it { should be_valid }
    end
  end

  context "when player is on wumpus" do
    let(:player) { { row: 0, column: 1 } }
    let(:shot) { Shot.new(row: 1, column: 1, game_id: @game.id) }

    it { should_not be_valid }
  end

  context "when player is on pit" do
    let(:player) { { row: 2, column: 2 } }
    let(:shot) { Shot.new(row: 2, column: 1, game_id: @game.id) }

    it { should_not be_valid }
  end

  context "when player has found the treasure and is on the door" do
    let(:player) { { row: 2, column: 1 } }
    let(:shot) { Shot.new(row: 2, column: 2, game_id: @game.id) }

    before do
      @game.treasure_found = true
      @game.save
      @shoot_service.game.reload
    end

    it { should_not be_valid }
  end

  context "when player is out of arrows" do
    let(:shot) { Shot.new(row: 2, column: 1, game_id: @game.id) }

    before do
      @game.number_of_arrows = 0
      @game.save
      @shoot_service.game.reload
    end

    it { should_not be_valid }
  end
end
